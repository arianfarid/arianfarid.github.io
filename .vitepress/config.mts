import { createContentLoader, defineConfig } from 'vitepress'
import { Feed } from 'feed'
import { writeFileSync } from 'fs'
import { resolve } from 'path'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Arian Farid",
  cleanUrls: true,
  description: "Arian Farid's personal website and blog covering software development and complex systems.",
  sitemap: {
    hostname: 'https://arianfarid.me',
    transformItems(items) {
      return items.map(item => ({ ...item, lastmod: new Date().toISOString() }))
    },
  },
  buildEnd: async (config) => {
    const feed = new Feed({
      title: 'Arian Farid',
      description: "Arian Farid's blog covering software development and complex systems.",
      id: 'https://arianfarid.me/',
      link: 'https://arianfarid.me/',
      language: 'en',
      image: 'https://arianfarid.me/images/avatar.jpeg',
      favicon: 'https://arianfarid.me/images/avatar.jpeg',
      copyright: `Copyright © ${new Date().getFullYear()} Arian Farid`,
      author: { name: 'Arian Farid', link: 'https://arianfarid.me' },
    })

    const posts = await createContentLoader('articles/*.md', { excerpt: true }).load()

    posts
      .filter(p => p.frontmatter.listed && !p.frontmatter.draft)
      .sort((a, b) => +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date))
      .forEach(post => {
        const url = `https://arianfarid.me${post.url}`
        feed.addItem({
          title: post.frontmatter.title,
          id: url,
          link: url,
          description: post.frontmatter.description,
          content: post.excerpt,
          date: new Date(post.frontmatter.date),
          author: [{ name: 'Arian Farid', link: 'https://arianfarid.me' }],
          category: post.frontmatter.tags?.map((t: string) => ({ name: t })),
        })
      })

    writeFileSync(resolve(config.outDir, 'feed.xml'), feed.rss2())
  },
  transformPageData(pageData) {
    const path = pageData.relativePath
      .replace(/index\.md$/, '')
      .replace(/\.md$/, '')
    const canonicalUrl = path ? `https://arianfarid.me/${path}` : 'https://arianfarid.me/'
    const title = pageData.frontmatter.title || 'Arian Farid'
    const description = pageData.frontmatter.description || "Arian Farid's personal website and blog covering software development and complex systems."
    const isArticle = pageData.relativePath.startsWith('articles/')
    const ogType = isArticle ? 'article' : 'website'
    const ogImage = 'https://arianfarid.me/images/avatar.jpeg'

    pageData.frontmatter.head ??= []
    pageData.frontmatter.head.push(
      ['link', { rel: 'canonical', href: canonicalUrl }],
      ['meta', { property: 'og:site_name', content: 'Arian Farid' }],
      ['meta', { property: 'og:url', content: canonicalUrl }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { property: 'og:type', content: ogType }],
      ['meta', { property: 'og:image', content: ogImage }],
      ['meta', { property: 'og:image:width', content: '560' }],
      ['meta', { property: 'og:image:height', content: '560' }],
      ['meta', { name: 'twitter:card', content: 'summary' }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: description }],
      ['meta', { name: 'twitter:image', content: ogImage }],
      ['meta', { name: 'twitter:image:alt', content: title }],
      ['meta', { property: 'og:locale', content: 'en_US' }],
    )

    if (isArticle && pageData.frontmatter.title) {
      pageData.frontmatter.head.push([
        'script',
        { type: 'application/ld+json' },
        JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: pageData.frontmatter.title,
          description: pageData.frontmatter.description || description,
          url: canonicalUrl,
          image: ogImage,
          datePublished: pageData.frontmatter.date,
          dateModified: pageData.frontmatter.date,
          author: {
            '@type': 'Person',
            name: 'Arian Farid',
            url: 'https://arianfarid.me',
          },
          keywords: pageData.frontmatter.tags?.join(', '),
        }),
      ])
    }
  },
  markdown: {
    theme: {
      light: 'github-light',
      dark: 'one-dark-pro',
    },
    codeTransformers: [
      {
        span(node) {
          const style = node.properties?.style
          if (typeof style !== 'string') return
          // github-light comments (#6a737d) → higher contrast
          // catppuccin-mocha comments (#6c7086) → lighter
          node.properties.style = style
            .replace(/#6a737d/gi, '#4a5260')
            .replace(/#7f848e/gi, '#a0a6b4')
        }
      }
    ]
  },
  head: [
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;0,700;1,400&display=swap' }],
    ['link', { rel: 'icon', href: '/images/avatar.jpeg' }],
    ['link', { rel: 'alternate', type: 'application/rss+xml', title: 'Arian Farid', href: 'https://arianfarid.me/feed.xml' }],
    ['meta', { name: 'author', content: 'Arian Farid' }],
    ['meta', { name: 'theme-color', content: '#A33020' }],
    [
      'script',
      { type: 'application/ld+json' },
      JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Arian Farid',
        url: 'https://arianfarid.me',
        image: 'https://arianfarid.me/images/avatar.jpeg',
        sameAs: [
          'https://github.com/arianfarid',
          'https://codeberg.org/arianfarid',
          'https://www.linkedin.com/in/arian-farid/',
          'https://orcid.org/0000-0002-9829-1306',
          'https://bsky.app/profile/arianfarid.bsky.social'
        ],
        jobTitle: 'Senior Software Developer',
        alumniOf:[ 
          {
            '@type': 'EducationalOrganization',
            'name': 'University of South Florida'
          }
        ],
        description:
          'Senior Software Developer with over 10 years of experience and a PhD in Biology, specializing in Javascript, PHP, Rust, Golang, and complex systems.',
      }),
    ],
    ['script', { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-M00KH2W2YM' }],
    ['script', {}, `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-M00KH2W2YM');
    `]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'About', link: '/about' },
      { text: 'Articles', link: '/articles' },
    ],

    search: {
      provider: 'local',
    },

    socialLinks: [
      { icon: "linkedin", link: "https://www.linkedin.com/in/arian-farid/" },
      { icon: 'github', link: 'https://github.com/arianfarid' },
      { icon: "codeberg", link: "https://codeberg.org/arianfarid"},
    ],

    footer: {
      copyright: 'Copyright © 2026 Arian Farid'
    }
  }
})
