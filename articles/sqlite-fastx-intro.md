---
id: "3"
title: "sqlite-fastx: An Extension For Querying Genomic Sequence Files with SQL "
categories:
  - "Rust"
  - "Bioinformatics"
  - "SQLite"
description: "sqlite-fastx is a SQLite extension written in Rust that  FASTA and FASTQ files directly using SQL."
date: "2026-05-26"
tags:
  - Rust
  - Bioinformatics
  - SQLite
  - FASTA
  - FASTQ
  - Systems Programming
search: true
listed: true
draft: true
---

## Background 

### The FASTA/FASTQ Format

### SQLite

SQLite is the most deployed database in existence, [with over a trillion in active use](https://sqlite.org/mostdeployed.html). It has several advantages over many other database offerings. There is no configuration! It is a single file that manages your database (which itself is in a single file). With no database server overhead, it is easily deployed [on the edge](https://turso.tech/blog/why-sqlite-is-so-great-for-the-edge-ee00a3a9a55f), [in embedded systems](), and with proper tooling is [easily replicated](https://litestream.io/) and [distributed](https://github.com/superfly/litefs).

As SQLite databases are single files on disk, they can store more data memory available (over [200 TB!](https://sqlite.org/whentouse.html) Thats more than many filesystems allow by default). 

With proper extensions, they play well with OLAP databases. For example, the [SQLite extension for DuckDB](https://duckdb.org/docs/current/core_extensions/sqlite) or [reading directly in Polars](https://docs.pola.rs/api/python/stable/reference/api/polars.read_database.html) allows users to conduct massive analyitcal queries with minimal setup


### SQLite Extensions

SQLite has the [ability to load extensions](https://sqlite.org/loadext.html). These can be virtual tables, custom functions, or OS interfaces (VFS). 

### Virtual Tables

SQLite's [virtual table API](https://sqlite.org/vtab.html) exposes several methods that enable developers to create loadable SQLite extensions.

Virtual tables are objects that provide SQL syntax to abstractions. While they are queried with typical SQL syntax, they cannot be modified or indexed by the user.

An overview of a few relevant methods follows.

#### `xCreate`

`xCreate` is run during the creation of the virtual table. This method is responsible for creating the virutal table, including registering any required [shadow tables](https://sqlite.org/vtab.html#xshadowname).

This method exposes a pointer to the database connection, as well as arguments provided. For example:

```sql
CREATE VIRTUAL TABLE reads USING fastq('reads.fastq');
```

From the above SQL, we can obtain the following via the `argv` parameter:
1. the module
2. the database name
3. the table name
4. the file name


#### `xBestIndex`

This method is called when preparing a query. It is used by SQLite to determine the best way to access the underlying data in the virtual table. `sqlite3_index_info` is exposed as a parameter, which an arbitrary `idxStr` may be assigned and passed to `xFilter`.

#### `xFilter`

This method, if called, is called following `xBestIndex`. It is responsible for setting up a cursor to be called by SQLite. 

## Design

The goal of `sqlite-fastx` is to provide a SQLite extension that enables bioinformaticists, molecular biologists, and data engineers to efficiently query FASTA/FASTQ. 

It should
- maximize queries with pushdown filters
- use `.fai` when possible
- allow parsing gzipped fasta files
- expose useful functions

Rust is a systems programming language. [It a fast language](https://github.com/yugr/rust-slides/), and [its ownership model](https://doc.rust-lang.org/book/ch04-00-understanding-ownership.html) provides [memory safety](https://en.wikipedia.org/wiki/Memory_safety).


### Choosing a Framework For Creating Extensions

I chose `sqlite3_ext` for a few reasons. It provides loadable extensions out of the box, but the library also supports static linking (a user could compile SQLite with this library loaded). Its API closely mirrors the SQLite C API, and it exposes VFS bindings.

There are a few other notable options for creating extensions in rust.

- Manually, using `ffi` bindings. More time consuming on my end.
- Some crates, such as `rustqlite` or `sqlx`, support creating loadable extensions, but these seem to be geared more towards embedding SQLite, not creating loadable extensions.
- The `sqlite-loadable-rs` crate provides a very convenient framework for creating loadable extensions, but is more limited in scope.
TODO: Provide links

## The Code

This section serves as a broad overview of how this extension was implemented. 

### The reader/cursor

The FASTA and FASTQ cursors share very similar implementations. 

A sequence record trait

```rust
pub trait SequenceRecord: Clone {
    fn identifier_bytes(&self) -> &[u8];
    fn description_bytes(&self) -> Option<&[u8]>;
    fn sequence_bytes(&self) -> &[u8];
    fn quality_bytes(&self) -> Option<&[u8]>;
}
```

and reader

```rust
pub trait SequenceReader {
    type Record: SequenceRecord;
    fn next(&mut self) -> Option<Result<Self::Record>>;
    fn lookup_offset(_fai_path: &str, _id: &str) -> Option<u64> {
        None
    }
}
```

both define interfaces for iterating through fastx records. The `pub struct SequenceCursor<R: SequenceReader>` holds fields such as the `.fai` path, `table_name`, and other fields that are required during query excution. It takes any generic with the `SequenceReader` trait. This allows for custom logic when designing specific modules.

The `SequenceCursor` method `determine_strategy` determines if a corresponding `.fai` file exists and if any equality conditions exist on the sequence id field. If so, it will use it to seek the reader to the offset, avoiding scanning the entire file.

### The `fasta` module

For brevity, I will only overview the `fasta` module.  `fastq` shares many implementation details, though additional logic for sequence quality scores have also been implemented.

`sqlite3_ext` provides convenient virtual table traits that enable us to implement required methods for virtual table creation.

#### `create`

This is synonymous with `xCreate`. 

In the `fasta` module, we do two things here: define metadata (get filename, check if a `.fai` exists) and register the virtual table schema with SQLite.

```sql
CREATE TABLE x(
    id TEXT,
    description TEXT,
    sequence TEXT,
    length INTEGER,
    gc_content REAL,
    filename TEXT HIDDEN
)
```

#### `best_index`

This is synonymous with `xBestIndex`.

Best index is where the query plan is determined. `sqlite-fastx` iterates on each constraint in the query, and builds an `index_str`. 

```rust
if constraint.usable() {
    match Columns::try_from(constraint.column())
        .map_err(|_| Error::from("column index out of range"))?
    {
        Columns::ID => match constraint.op() {
            ConstraintOp::Like => usable.push((i, ("id", constraint.op()))),
            ConstraintOp::Eq => usable.push((i, ("id", constraint.op()))),
            _ => {}
        },
        #[allow(clippy::single_match)]
        Columns::Description => match constraint.op() {
            ConstraintOp::Like => usable.push((i, ("description", constraint.op()))),
            _ => {}
        },
        Columns::Sequence => {
            #[allow(clippy::single_match)]
            match constraint.op() {
                ConstraintOp::Like => usable.push((i, ("sequence", constraint.op()))),
                _ => {} //No op
            }
        }
        Columns::Length => match constraint.op() {
            ConstraintOp::GT
            | ConstraintOp::GE
            | ConstraintOp::LT
            | ConstraintOp::LE
            | ConstraintOp::Eq => {
                usable.push((i, ("length", constraint.op())));
            }
            _ => {}
        },
        Columns::GCContent => match constraint.op() {
            ConstraintOp::GT
            | ConstraintOp::GE
            | ConstraintOp::LT
            | ConstraintOp::LE
            | ConstraintOp::Eq => {
                usable.push((i, ("gc_content", constraint.op())));
            }
            _ => {}
        },
        _ => {}
    }
}
```

The column name and comparison operators (`>`, `=`, `LIKE`, etc.) are pushed to a `Vec`. After we have evaluated every usable constraint:

```rust
if !usable.is_empty() {
    let mut constraints: Vec<_> = index_info.constraints().collect();
    
    let descriptor = usable
        .iter()
        .enumerate()
        .map(|(i, c)| {
            constraints[c.0].set_argv_index(Some(i as u32));
            constraints[c.0].set_omit(true);
            let op_str = match c.1.1 {
                ConstraintOp::GT => CompareOp::Gt.as_str(),
                ConstraintOp::GE => CompareOp::Ge.as_str(),
                ConstraintOp::LT => CompareOp::Lt.as_str(),
                ConstraintOp::LE => CompareOp::Le.as_str(),
                ConstraintOp::Eq => CompareOp::Eq.as_str(),
                ConstraintOp::Like => "Like",
                _ => "Scan",
            };
            let col_str = c.1.0;
            [col_str, op_str].join(":")
        })
        .collect::<Vec<_>>()
        .join(",");
    index_info.set_index_str(Some(descriptor.as_str()))?;
}
```

a representation of our plan is built. 

The query 

```sql
SELECT id FROM sequences WHERE sequence LIKE 'ACGT%' AND length > 300;
```

will generate the following plan:

```rust
let descriptor = 'sequence:Like;length:Gt';
```

#### `filter`

This is synonymous with `xFilter`.

Here, we determine our reading strategy from creation/connecting to the virtual table. If we are provided a relevant offset via `.fai`, we can seek to this position (and save valuable time parsing potentially very large files). Otherwise, it is a full table scan.

### Optimizations

#### Sequence Contains using `memchr`

In local testing (M2 Macbook Pro) using `memchr` for raw substring search, I found a ~35x speed up on a 10k bp dataset. This translated to about a 5x speedup at query time (I/O, parsing costs lower some of the gains).

```rust
SequenceOp::Contains => memchr::memmem::find(&val, self.pattern.as_bytes()).is_some(),
```

`memchr` improves scanning by leveraging hardware to accelerate scans. One technique is SIMD (Single Instruction, Multiple Data), which allows multiple bytes (16, 32, 64, etc.) to be compared at once.

#### Pushdown Filters
