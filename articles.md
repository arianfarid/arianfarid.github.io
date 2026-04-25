---
title: "Articles by Arian Farid"
description: "Articles and essays by Arian Farid on software engineering, systems design, and developer tooling."
layout: page
---

<script setup>
import { data } from '/articles/index.data.js'

function formatDate(date) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-UK', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<div class="articles-page">
  <section class="articles-hero">
    <h1>Articles</h1>
  </section>

  <div class="post-list">
    <div v-for="post in data" :key="post.url" class="post-card">
      <span class="post-date">{{ formatDate(post.frontmatter.date) }}</span>
      <h2 class="post-title"><a :href="post.url">{{ post.frontmatter.title }}</a></h2>
      <p class="post-desc">{{ post.frontmatter.description }}</p>
      <div class="post-tags" v-if="post.frontmatter.tags?.length">
        <span v-for="tag in post.frontmatter.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>
    </div>
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

.post-list {
  display: flex;
  flex-direction: column;
}

.post-card {
  padding: 1.5rem 0;
  border-bottom: 1px solid var(--vp-c-divider);
}

.post-date {
  display: block;
  font-size: 0.775rem;
  color: var(--vp-c-text-3);
  font-weight: 500;
  letter-spacing: 0.03em;
  margin-bottom: 0.4rem;
}

.post-title {
  font-family: 'Lora', Georgia, serif;
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 1.35;
  margin: 0 0 0.45rem;
}

.post-title a {
  color: var(--vp-c-text-1);
  text-decoration: none;
}

.post-title a:hover {
  color: var(--vp-c-brand-1);
}

.post-desc {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.65;
  margin: 0 0 0.8rem;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.tag {
  font-size: 0.65rem;
  padding: 0.2rem 0.6rem;
  border-radius: 3px;
  background: transparent;
  border: 1px solid var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  cursor: default;
}
</style>
