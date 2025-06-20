---
id: "2"
title: "SIMD WIP"
categories:
  - "Rust"
  - "Data Compression"
  - "Systems Programming"
description: "How I used Rust to compress DNA sequences with 4-bit encodings, enabling fast bitwise rotation-based DNA complimentary base pairs."
date: "2025-06-12"
tags:
  - Rust
  - Systems Programming
  - Algorithms
  - DNA
  - Compression
  - Bitwise
  - Bioinformatics 
search: false   
listed: false

---

## Design

Several improvements will be made to increase the speed of calculations.

- Increase speed of generating compliments (SIMD)
- Increase speed of compressing DNA (SIMD)

(?) Also, several improvements will be made to increase the flexibility of our program

- (?) Specify `NucWord` size
- (?) Read/Write FASTA directly

## Optimizing Compliment Step with SIMD

To recap, the code previously looped through each `NucWord`, and, within the `NucWord`, it performed 2 bitwise rotations on each nucleotide encoding to generate the compliment.

```rust
    pub fn compliment_each(&mut self) {
        for i in 0..4 {
            self.compliment(i);
        }
    }
    /// generate mask, shift nucleotide, rotate, shift back to position
    pub fn compliment(&mut self, i: usize) {
        let shift = i * 4;
        let mask = 0b1111 << shift;
        let to_mask = (self.0 & mask) >> shift;
        let complement = (to_mask << 2 | to_mask >> 2) & 0b1111;
        self.0 = (self.0 & !mask) | (complement << shift);
    }
```

This works well for smaller DNA sequences, like [Sanger sequences (approx 1k base pairs)](https://en.wikipedia.org/wiki/Sanger_sequencing), but starts to slow down when working with long read sequencing, such as [PacBio, which can average reads 15-20k base pairs](https://www.pacb.com/products-and-services/applications/whole-genome-sequencing/).

### SIMD

todo!

### Enabling Nightly in Rust

todo!

### Create `compliment_sequence_simd` Method

We send each nucleotide in NucWord into a an array `bases`. This is converted to a SIMD Vector, and finally we are performing our bitwise rotation.

```rust
    pub fn compliment_sequence_simd(&mut self) {
        for nuc_word in self.0.iter_mut() {
            let bases = [
                nuc_word.0 & 0b1111,
                (nuc_word.0 >> 4) & 0b1111,
                (nuc_word.0 >> 8) & 0b1111,
                (nuc_word.0 >> 12) & 0b1111,
            ];
            let simd_chunk = u16x4::from_array(bases);
            ((simd_chunk << 2) | (simd_chunk >> 2)) & u16x4::splat(0b1111);
        }
    }
```