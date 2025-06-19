---
title: "Articles"
description: "The archive."
---

<script setup>
import { data } from '/articles/index.data.js'
</script>

## Latest Posts

Welcome to the archive.

<div style="list-style-type: none;">
  <li v-for="post in data" :key="post.link">
    <a :href="post.url"><h2>{{ post.frontmatter.title }}</h2></a>
    <div style="font-size: 0.95em;">{{ post.frontmatter.description }}</div>
    <br />
    <div style="font-size: 0.875em; color: #666;">{{ post.frontmatter.date }}</div>
    <br />
    <template v-for="tag in post.frontmatter.tags">
      <Badge>{{tag}}</Badge>
    </template>
  </li>
</div>
