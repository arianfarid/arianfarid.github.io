import { createContentLoader } from "vitepress"

export default createContentLoader(
  'articles/*.md',
  {
    excerpt: true,
    transform(raw) {
      return raw
        .sort((a, b) => b.date.time - a.date.time)
        .filter((a) => a.frontmatter.listed)
    }
  }
)
