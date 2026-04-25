---
layout: page
---

<script setup>
import { data } from '/articles/latest.data.js'

function formatDate(date) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-UK', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<div class="home">
  <section class="hero">
    <h1 class="hero-name">Arian Farid</h1>
    <p class="hero-role">Senior Software Developer · PhD Biologist</p>
    <p class="hero-bio">
      Writing about software systems, algorithms, and the occasional intersection with biology.
      Over a decade building production software with a systems-oriented mindset.
    </p>
    <nav class="hero-links">
      <a href="/about">About</a>
      <span class="sep">·</span>
      <a href="https://www.linkedin.com/in/arian-farid/" target="_blank" rel="noopener">LinkedIn</a>
      <span class="sep">·</span>
      <a href="https://github.com/arianfarid" target="_blank" rel="noopener">GitHub</a>
      <span class="sep">·</span>
      <a href="https://codeberg.org/arianfarid" target="_blank" rel="noopener">Codeberg</a>
    </nav>
  </section>

  <section class="posts">
    <h2 class="posts-label">Writing</h2>
    <div class="post-list">
      <a v-for="post in data" :key="post.url" :href="post.url" class="post-card">
        <span class="post-date">{{ formatDate(post.frontmatter.date) }}</span>
        <h3 class="post-title">{{ post.frontmatter.title }}</h3>
        <p class="post-desc">{{ post.frontmatter.description }}</p>
        <div class="post-tags" v-if="post.frontmatter.tags?.length">
          <span v-for="tag in post.frontmatter.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
      </a>
    </div>
  </section>
</div>

<style scoped>
.home {
  max-width: 780px;
  margin: 0 auto;
  padding: 4rem 2rem 6rem;
}

.hero {
  padding-bottom: 3rem;
  border-bottom: 1px solid var(--vp-c-divider);
  margin-bottom: 3rem;
}

.hero-name {
  font-family: 'Lora', Georgia, serif;
  font-size: clamp(2.5rem, 6vw, 3.75rem);
  font-weight: 700;
  line-height: 1.1;
  margin: 0 0 0.6rem;
  color: var(--vp-c-text-1);
  letter-spacing: -0.02em;
}

.hero-role {
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
  margin: 0 0 1.25rem;
  letter-spacing: 0.02em;
}

.hero-bio {
  font-size: 1.05rem;
  line-height: 1.8;
  color: var(--vp-c-text-1);
  max-width: 560px;
  margin: 0 0 1.5rem;
}

.hero-links {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.hero-links a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
}

.hero-links a:hover {
  text-decoration: underline;
}

.sep {
  color: var(--vp-c-text-3);
  user-select: none;
}

.posts-label {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--vp-c-brand-1);
  margin: 0 0 1.25rem;
}

.post-list {
  display: flex;
  flex-direction: column;
}

.post-card {
  display: block;
  padding: 1.5rem 0;
  border-bottom: 1px solid var(--vp-c-divider);
  text-decoration: none;
  color: inherit;
  transition: opacity 0.15s ease;
}

.post-card:first-child {
  border-top: 1px solid var(--vp-c-divider);
}

.post-card:hover {
  opacity: 0.65;
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
  color: var(--vp-c-text-1);
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
  font-size: 0.7rem;
  padding: 0.15rem 0.55rem;
  border-radius: 999px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-weight: 500;
}
</style>
