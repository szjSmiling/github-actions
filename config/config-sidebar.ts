import type { SidebarOptions } from '@vuepress/theme-default'

interface Sidebar {
  'zh': SidebarOptions,
  'en': SidebarOptions,
}
// 侧边栏数据
export const sidebar:Sidebar = {
  'zh': [
    {
      text: '功能模块1',
      prefix: 'module1/',
      collapsible: true,
      children: [
        '页面1',
        '页面2',
        '页面3',
      ]
    },
    {
      text: '功能模块2',
      // prefix: '/zh/',
      collapsible: true,
      children: [
        'module2/页面1',
        'module2/页面2',
        'module2/页面3',
      ]
    }
  ],
  'en': {

  }
}
