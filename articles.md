---
title: "Latest Articles"
description: "The archive."
hideFrontMeta: true
sidebar: false
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

<div style="list-style-type: none;">
  <li v-for="post in data" :key="post.link">
    <a :href="post.url"><h2>{{ post.frontmatter.title }}</h2></a>
    <div style="margin-bottom: 16px; font-size: 0.95em;">{{ post.frontmatter.description }}</div>
    <div style="margin-bottom: 16px; font-size: 0.875em; color: #6b7280; font-weight: 600;">
      {{ formatDate(post.frontmatter.date) }}
    </div>
    <div class="tags" style="font-size: 0.875em; color: #6b7280; font-weight: 600;">
      Tags:
    <span class="tags-item" v-for="tag in post.frontmatter.tags">
      <Badge>{{tag}}</Badge>
    </span>
    </div>
  </li>
</div>


<style scoped>
.meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    font-size: 0.875rem;
    color: #6b7280;
    margin-bottom: 1.5rem;
    font-weight: 600;
    gap: 1rem;
}
.meta-item {
    display: flex;
    gap: 0.25rem;
}


.meta-item svg {
    width: 1rem;
    height: 1rem;
}

.tags {
    /* display: flex;
    justify-content: flex-start;
    flex-wrap: wrap; */
    font-size: 0.875rem;
    color: #6b7280;
    margin-bottom: 1.5rem;
    font-weight: 600;
    gap: 1rem;
    line-height: 32px;
}

.tags-item {
    /* display: flex; */
    /* align-items: center; */
    gap: 0.25rem;
    text-align: center;
}

.tags-item svg {
    width: 1rem;
    height: 1rem;
}
:root {
  --vp-home-hero-name-color: orange;
}
</style>
