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
    <span style="font-size: 0.875em; color: #6b7280; font-weight: 600;">Tags:</span><template v-for="tag in post.frontmatter.tags">
      <Badge>{{tag}}</Badge>
    </template>
  </li>
</div>
