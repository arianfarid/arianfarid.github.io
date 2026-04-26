---
layout: page
---

<script setup>
import { data } from '/articles/latest.data.js'
</script>

<div class="home">
  <section class="hero">
    <h1 class="hero-name">Arian Farid</h1>
    <p class="hero-role">Senior Software Developer · PhD</p>
    <p class="hero-bio">
      Writing about programming and the occasional tangent into biology. Based in Tampa.
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
    <PostList :posts="data" />
  </section>
</div>

<style scoped>
.home {
  max-width: 780px;
  margin: 0 auto;
  padding: 4rem 2rem 6rem;
}

.hero {
  padding-bottom: 2rem;
  margin-bottom: 2rem;
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
  font-family: 'Lora', Georgia, serif;
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 1.25rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

</style>
