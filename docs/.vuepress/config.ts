import { defineUserConfig } from 'vuepress'
import { docsearchPlugin } from '@vuepress/plugin-docsearch'
import { customTheme } from './config/config-theme'
import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { resolve } from 'path'

export default defineUserConfig({
  base: '/github-actions/',
  lang: 'zh-CN',
  title: 'Hisun',
  description: '项目帮助文档',
  head: [
    [
      'link',
      { rel: 'icon', type: 'image/svg+xml', href: '/images/vite.svg' }
    ]
  ],
  // dev 配置项
  host: '0.0.0.0',
  port: 8080,
  open: false,
  // build 配置项
  shouldPreload: true,
  shouldPrefetch: true,
  // markdown 配置项
  markdown: {},
  // 主题配置项
  ...customTheme(),
  plugins: [
    docsearchPlugin({
      appId: '34YFD9IUQ2',
      apiKey: '9a9058b8655746634e01071411c366b8',
      indexName: 'vuepress',
      searchParameters: {
        facetFilters: ['tags:v2'],
      },
      locales: {
        '/': {
          placeholder: '搜索文档',
          translations: {
            button: {
              buttonText: '搜索文档',
              buttonAriaLabel: '搜索文档',
            },
            modal: {
              searchBox: {
                resetButtonTitle: '清除查询条件',
                resetButtonAriaLabel: '清除查询条件',
                cancelButtonText: '取消',
                cancelButtonAriaLabel: '取消',
              },
              startScreen: {
                recentSearchesTitle: '搜索历史',
                noRecentSearchesText: '没有搜索历史',
                saveRecentSearchButtonTitle: '保存至搜索历史',
                removeRecentSearchButtonTitle: '从搜索历史中移除',
                favoriteSearchesTitle: '收藏',
                removeFavoriteSearchButtonTitle: '从收藏中移除',
              },
              errorScreen: {
                titleText: '无法获取结果',
                helpText: '你可能需要检查你的网络连接',
              },
              footer: {
                selectText: '选择',
                navigateText: '切换',
                closeText: '关闭',
                searchByText: '搜索提供者',
              },
              noResultsScreen: {
                noResultsText: '无法找到相关结果',
                suggestedQueryText: '你可以尝试查询',
                reportMissingResultsText: '你认为该查询应该有结果？',
                reportMissingResultsLinkText: '点击反馈',
              },
            },
          },
        }
      }
    }),
    googleAnalyticsPlugin({
      id: 'G-XXXXXXXXXX'
    }),
    registerComponentsPlugin({
      // 动态导入
      components: {
        HsVideo: resolve(__dirname, './components/HsVideo.vue')
      }
    })
  ]
})
