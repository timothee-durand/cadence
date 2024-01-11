import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Cadence",
  description: "Cadence is a music ts library",
  base: "/cadence/",
  lastUpdated: true,
  ignoreDeadLinks: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    search: {
      provider: 'local'
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Getting Started', link: '/getting-started' },
      { text: 'Playground', link: 'https://timothee-durand.github.io/cadence/playground', target: '_blank' },
    ],

    sidebar: [
      {
        text: 'Getting started',
        items: [
          { text: 'Getting started', link: '/getting-started' },
        ]
      },
      {
        text: 'API',
        items: [
          { text: 'Cadence', link: '/api-documentation/' },
          { text: 'Loop and Song', link: '/api-documentation/loop' },
          { text: 'Effects (not implemented yet)', link: '/api-documentation/effects' },
      ]
      },
      {
        text: 'Contributing',
        items: [
          { text: 'Contributing', link: '/contribute' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/timothee-durand/cadence' }
    ],
    editLink: {
      pattern: 'https://github.com/timothee-durand/cadence/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    }
  }
})
