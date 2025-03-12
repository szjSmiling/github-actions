import { sidebar } from './config-sidebar.ts'
import { navbar } from './config-navbar.ts'
// 语言配置
export const locales = {
  '/zh/': {
    lang: 'zh-CN',
    // title: '网站左上角标题 - 默认使用 config 下的全局 title',
    description: 'Vue 驱动的静态网站生成器'
  },
  // '/en/': {
  //   lang: 'en-US',
  //   // title: '网站左上角标题 - 默认使用 config 下的全局 title',
  //   description: 'Vue-powered Static Site Generator'
  // }
}
// 主题 locales 通用配置
export const themeLocalesCommon = {
  docsDir: 'docs',
  docsBranch: 'main',
  logo: '/icon/favicon.ico',
  editLink: false,
  repo: 'https://github.com/szjSmiling/github-actions/',
  // repoLabel: 'GitHub',
  // sidebarDepth: 3
}
// 主题 locales 配置
export const themeLocales = {
  '/': {
    selectLanguageText: '选择语言',
    navbar: navbar.zh, // 导航栏
  },
  '/zh/': {
    selectLanguageName: '简体中文',
    selectLanguageText: '选择语言',
    selectLanguageAriaLabel: '选择语言',
    navbar: navbar.zh, // 导航栏
    sidebar: sidebar.zh, // 侧边栏
    // 自定义容器
    tip: '提示',
    warning: '注意',
    danger: '警告',
    backToHome: '返回首页',
    notFound: [
      '这里什么都没有',
      '我们怎么到这来了？',
      '这是一个 404 页面',
      '看起来我们进入了错误的链接',
    ],
    // 仓库相关
    // docsRepo: '',
    contributors: true,
    editLinkText: '在 GitHub 上编辑此页',
    contributorsText: '贡献者',
    lastUpdatedText: '上次更新',
    // 其他设置
    openInNewWindow: '在新窗口打开',
    toggleColorMode: '切换颜色模式',
    toggleSidebar: '切换侧边栏',
  },
  '/en/': {
    selectLanguageName: '英语',
    selectLanguageText: 'Languages',
    navbar: navbar.en, // 导航栏
    sidebar: sidebar.en, // 侧边栏
  }
}

