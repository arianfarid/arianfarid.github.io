import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Arian Farid",
  description: "Arian Farid's personal website and blog.",
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
          'https://www.linkedin.com/in/arian-farid/',
        ],
        jobTitle: 'Senior Software Developer',
        description:
          'Senior Software Developer with over 10 years of experience and a PhD in Biology.',
      }),
    ],
    ['script', { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-M00KH2W2YM' }],
    ['script', {}, `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-M00KH2W2YM');
    `]
  ],  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'About', link: '/about' },
      { text: 'Articles', link: '/articles' },
    ],

    // sidebar: [
      // {
      //   text: 'Examples',
      //   items: [
      //     { text: 'Markdown Examples', link: '/markdown-examples' },
      //     { text: 'Runtime API Examples', link: '/api-examples' }
      //   ]
      // }
    // ],
    search: {
      provider: 'local',
    },
    socialLinks: [
      { icon: "linkedin", link: "https://www.linkedin.com/in/arian-farid/" },
      { icon: 'github', link: 'https://github.com/arianfarid' },
      { icon: "codeberg", link: "https://codeberg.org/arianfarid"},     
    ]
  }
})
