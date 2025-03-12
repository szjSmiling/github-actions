import { defineUserConfig, AppConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { getDirname, path } from '@vuepress/utils'
// import { docsearchPlugin } from '@vuepress/plugin-docsearch'
import { customTheme } from './config/config-theme.ts'
// import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics'
// import { registerComponentsPlugin } from '@vuepress/plugin-register-components'

const __dirname = getDirname(import.meta.url)
const VITE_BASE_URL = process.env.VITE_BASE_URL as AppConfig['base']
const VITE_BASE_API = process.env.VITE_BASE_API as string
const VITE_BASE_API_URL = process.env.VITE_BASE_API_URL
export default defineUserConfig({
  // 基本配置项
  base: VITE_BASE_URL,
  lang: 'zh-CN',
  title: "Hisun's Blob Docs",
  description: '学习搭建个人博客文档',
  // head: [
  //   [
  //     'link',
  //     { rel: 'icon', type: 'shortcut icon', href: `${VITE_BASE_URL}icon/favicon.ico` }
  //   ]
  // ],
  pagePatterns: ['**/*.md', '!**/README.md', '!.vuepress', '!node_modules'],
  // dev 配置项
  host: '0.0.0.0',
  port: 8080,
  open: false,
  // build 配置项
  shouldPreload: true,
  shouldPrefetch: true,
  dest: 'dist',
  templateDev: path.resolve(__dirname, './config/dev.html'),
  templateBuild: path.resolve(__dirname, './config/build.html'),
  // 构建工具配置
  bundler: viteBundler({
    viteOptions: {
      resolve: {
        // extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json'],
        alias: {
          '@': path.resolve(__dirname, 'docs/.vuepress'),
          // '@utils': path.resolve(__dirname, './utils'),
          // '@components': path.resolve(__dirname, './components'),
        }
      },
      // 代理
      server: {
        proxy: {
          [VITE_BASE_API]: {
            target: VITE_BASE_API_URL, // 目标服务器地址
            changeOrigin: true, // 改变源头为目标服务器地址
            // rewrite: (path) => path.replace(/^\/api/, '')
          }
        }
      },
      build: {
        rollupOptions: {
          // external: ['vuepress'],
          output: {
            // manualChunks (id) {
            //   if (id.includes('node_modules')) {
            //     const arr = id.toString().split('node_modules/')[1].split('/')
            //     console.log('....arr', arr);
                
            //     switch (arr[0]) {
            //       case '@ant-design-vue':
            //         return `__${arr[0].toString()}`
            //       default:
            //         return '__vendor'
            //     }
            //     return id.toString().split('node_modules/')[1].split('/').toString()
            //   }
            // }
          }
        }
      },
      plugins: []
    }
  }),
  // markdown 配置项
  markdown: {},
  // 主题配置项
  ...customTheme(),
  plugins: [
    // docsearchPlugin({
    //   appId: '34YFD9IUQ2',
    //   apiKey: '9a9058b8655746634e01071411c366b8',
    //   indexName: 'vuepress',
    //   searchParameters: {
    //     facetFilters: ['tags:v2'],
    //   },
    //   locales: {
    //     '/': {
    //       placeholder: '搜索文档',
    //       translations: {
    //         button: {
    //           buttonText: '搜索文档',
    //           buttonAriaLabel: '搜索文档',
    //         },
    //         modal: {
    //           searchBox: {
    //             resetButtonTitle: '清除查询条件',
    //             resetButtonAriaLabel: '清除查询条件',
    //             cancelButtonText: '取消',
    //             cancelButtonAriaLabel: '取消',
    //           },
    //           startScreen: {
    //             recentSearchesTitle: '搜索历史',
    //             noRecentSearchesText: '没有搜索历史',
    //             saveRecentSearchButtonTitle: '保存至搜索历史',
    //             removeRecentSearchButtonTitle: '从搜索历史中移除',
    //             favoriteSearchesTitle: '收藏',
    //             removeFavoriteSearchButtonTitle: '从收藏中移除',
    //           },
    //           errorScreen: {
    //             titleText: '无法获取结果',
    //             helpText: '你可能需要检查你的网络连接',
    //           },
    //           footer: {
    //             selectText: '选择',
    //             navigateText: '切换',
    //             closeText: '关闭',
    //             searchByText: '搜索提供者',
    //           },
    //           noResultsScreen: {
    //             noResultsText: '无法找到相关结果',
    //             suggestedQueryText: '你可以尝试查询',
    //             reportMissingResultsText: '你认为该查询应该有结果？',
    //             reportMissingResultsLinkText: '点击反馈',
    //           },
    //         },
    //       },
    //     }
    //   }
    // }),
    // googleAnalyticsPlugin({
    //   id: 'G-XXXXXXXXXX'
    // }),
    // registerComponentsPlugin({
    //   // 动态导入
    //   components: {
    //     HsVideo: path.resolve(__dirname, './components/HsVideo.vue')
    //   }
    // })
  ]
})
