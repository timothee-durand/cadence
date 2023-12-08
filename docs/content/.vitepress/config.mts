import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "CadenceJs",
  description: "Cadence is a music js library",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
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
          { text: 'Api documentation', link: '/api-documentation' },
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
