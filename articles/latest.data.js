import { createContentLoader } from "vitepress"

export default createContentLoader(
  'articles/*.md',
  {
    excerpt: true,
    transform(raw) {
      return raw
        .sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date))
        .filter((a) => a.frontmatter.listed)
    }
  }
)
