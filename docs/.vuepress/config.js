module.exports = {
  title: 'Owlie - Models documentation',
  description: 'Models documentation',
  plugins: [
    [
      'vuepress-plugin-clean-urls',
      {
        normalSuffix: '/',
        indexSuffix: '/',
        notFoundPath: '/404.html',
      },
    ],
  ],
  themeConfig: {
    sidebar: [
      {
        title: 'Getting started',
        collapsable: false,
        sidebarDepth: 1,
        children: [
          '/1.x.x/getting-started/introduction',
          '/1.x.x/getting-started/quick-start',
          '/1.x.x/getting-started/with-monorepo-config'
        ]
      },
      {
        title: 'Types',
        collapsable: false,
        sidebarDepth: 1,
        children: [
          '/1.x.x/types/types'
        ]
      },
      {
        title: 'Tests',
        collapsable: false,
        sidebarDepth: 1,
        children: [
          '/1.x.x/tests/tests'
        ]
      },
      {
        title: 'Technical',
        collapsable: false,
        sidebarDepth: 1,
        children: [
          '/1.x.x/technical/overview'
        ]
      }
    ],
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Github', link: 'https://github.com/owliehq/models' }
    ]
  }
}
