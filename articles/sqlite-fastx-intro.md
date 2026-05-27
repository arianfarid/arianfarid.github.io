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
- use `.fai` when possible
- allow parsing gzipped fasta files
- expose useful functions

Rust is a systems programming language. [It a fast language](https://github.com/yugr/rust-slides/), and [its ownership model](https://doc.rust-lang.org/book/ch04-00-understanding-ownership.html) provides [memory safety](https://en.wikipedia.org/wiki/Memory_safety).


### Choosing a Framework For Creating Extensions

I chose `sqlite3_ext` for a few reasons. It provides loadable extensions out of the box, but the library also supports static linking (a user could compile SQLite with this library loaded). Its API closely mirrors the SQLite C API, and it exposes VFS bindings.

There are a few other notable options for creating extensions in rust.

- Manually, using `ffi` bindings. More time consuming on my end.
- Some crates, such as `rustqlite`, support creating loadable extensions, but these seem to be geared more towards embedding SQLite, not creating loadable extensions.
- The `sqlite-loadable-rs` crate provides a very convenient framework for creating loadable extensions, but is more limited in scope.
TODO: Provide links
