import type { NavbarConfig } from 'vuepress'

interface Navbar {
  '/': NavbarConfig,
  'zh': NavbarConfig,
  'en': NavbarConfig,
}
// 侧边栏数据
export const navbar:Navbar = {
  '/': [
    { text: '指南', link: '/zh/guide/' },
  ],
  'zh': [
    { text: '指南', link: '/zh/guide/' },
    // {
    //   text: '项目开发者',
    //   children: [
    //     { text: '小明 - gitee', link: 'https://gitee.com/teamworkr' },
    //     { text: '小明 - csdn', link: 'https://blog.csdn.net/szjSmiling' },
    //   ]
    // }
  ],
  'en': [
    { text: 'Guide', link: '/en/guide/' },
    // {
    //   text: 'Contributors',
    //   children: [
    //     { text: 'Hisun - gitee', link: 'https://gitee.com/teamworkr' },
    //     { text: 'Hisun - csdn', link: 'https://blog.csdn.net/szjSmiling' },
    //   ]
    // }
  ],
}
