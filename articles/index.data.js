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
  //   transform(raw) {
  //     return raw
  //       .map(({ url, frontmatter, excerpt }) => ({
  //         title: frontmatter.title,
  //         url,
  //         excerpt,
  //         // date: formatDate(frontmatter.date)
  //       }))
  //       .sort((a, b) => b.date.time - a.date.time)
  //   }
  }
)
