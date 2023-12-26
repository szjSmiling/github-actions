import type { SidebarConfig } from 'vuepress'

interface Sidebar {
  'zh': SidebarConfig,
  'en': SidebarConfig,
}
// 侧边栏数据
export const sidebar:Sidebar = {
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
      },
      {
        text: '我的项目',
        collapsible: true,
        children: [
          '/zh/我的项目/README.md',
          '/zh/我的项目/仿真执行.md',
        ]
      },
      {
        text: '草稿箱',
        collapsible: true,
        children: [
          '/zh/草稿箱/产线仿真/README.md',
          // {
          //   text: '产线仿真',
          //   collapsible: false,
          //   children: [
          //     '/zh/草稿箱/产线仿真/场景编辑器.md',
          //     '/zh/草稿箱/产线仿真/工序编辑器.md',
          //   ]
          // },
          {
            text: '物流仿真',
            collapsible: false,
            children: [
              '/zh/草稿箱/物流仿真/场景编辑器.md',
            ]
          },
          {
            text: 'IOT仿真',
            collapsible: false,
            children: [
              '/zh/草稿箱/IOT仿真/工序编辑器.md',
            ]
          },
        ]
      },
      {
        text: '应用场景',
        collapsible: true,
        children: [
          '/zh/应用场景/README.md'
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
