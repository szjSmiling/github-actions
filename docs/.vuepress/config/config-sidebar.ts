import type { SidebarConfig } from 'vuepress'

interface Sidebar {
  '': SidebarConfig,
  'zh': SidebarConfig,
  'en': SidebarConfig,
}
// 侧边栏数据
export const sidebar:Sidebar = {
  '': {
    '/': [
      {
        text: '首页'
      }
    ]
  },
  'zh': {
    '/zh/': [
      {
        text: '指南',
        collapsible: true,
        children: [
          '/zh/指南/README.md',
          '/zh/指南/getting-started.md',
          '/zh/指南/getting-started-vue.md',
        ]
      }
    ]
  },
  'en': {
    '/en/': [
      {
        text: 'guide',
        collapsible: true,
        children: [
          '/en/guide/README.md',
          '/en/guide/getting-started.md',
          '/en/guide/getting-started-vue.md',
        ]
      }
    ]
  }
}
