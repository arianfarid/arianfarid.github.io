---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Arian Farid"
  tagline: Senior Software Developer
---

<script setup>
import { data } from '/articles/latest.data.js'
const members = [
  {
    avatar: '/assets/avatar.jpeg',
    name: 'Arian Farid',
    title: 'Software Developer',
    links: [
    ]
  },
]
</script>
<!-- <VPTeamMembers size="small" :members /> -->
# Arian Farid

I’m Arian Farid, a senior software developer with over a decade of experience building production software. Formerly a PhD-trained biologist, I bring a systems-oriented mindset and a deep interest in complex systems to software engineering.
This blog is a creative outlet for projects, technical or otherwise, that I find interesting. You can find me on [Linkedin](https://www.linkedin.com/in/arian-farid/), [GitHub](https://github.com/arianfarid), and [Codeberg](https://codeberg.org/arianfarid).

# Latest posts
<div style="list-style-type: none;">
  <li v-for="post in data" :key="post.link">
    <a :href="post.url"><h2>{{ post.frontmatter.title }}</h2></a>
    <div style="font-size: 0.95em; margin-bottom: 16px;">{{ post.frontmatter.description }}</div>
    <div class="meta meta-item" style="font-size: 0.875em; color: #666; margin-bottom: 16px;">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
      </svg>
      {{ post.frontmatter.date }}
    </div>
    <div class="tags">
      Tags: 
      <span  class="tags-item" v-for="tag in post.frontmatter.tags">
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
