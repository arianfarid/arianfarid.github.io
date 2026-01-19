import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Arian Farid",
  cleanUrls: true,
  description: "Arian Farid's personal website and blog covering software development and complex systems.",
  head: [
    ['link', { rel: 'canonical', href: 'https://arianfarid.me/' }],
    ['link', { rel: 'icon', href: '/images/avatar.jpeg' }],
    ['meta', { name: 'author', content: 'Arian Farid' }],
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
          'https://orcid.org/0000-0002-9829-1306'
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
      message: 'Built with VitePress',
      copyright: 'Copyright © 2026 Arian Farid'
    }
  }
})
