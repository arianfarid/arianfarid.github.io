---
title: "Articles by Arian Farid"
description: "Articles and essays by Arian Farid on software engineering, systems design, and developer tooling."
layout: page
---

<script setup>
import { data } from '/articles/index.data.js'
</script>

<div class="articles-page">
  <section class="articles-hero">
    <h1>Articles</h1>
  </section>

  <div class="post-list">
    <PostList :posts="data" />
  </div>
</div>

<style scoped>
.articles-page {
  max-width: 780px;
  margin: 0 auto;
  padding: 4rem 2rem 6rem;
}

.articles-hero {
  padding-bottom: 3rem;
  border-bottom: 1px solid var(--vp-c-divider);
  margin-bottom: 3rem;
}

.articles-hero h1 {
  font-family: 'Lora', Georgia, serif;
  font-size: clamp(2.5rem, 6vw, 3.75rem);
  font-weight: 700;
  line-height: 1.1;
  margin: 0;
  letter-spacing: -0.02em;
}

</style>
