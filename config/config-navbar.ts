import type { NavbarOptions } from '@vuepress/theme-default'

interface Navbar {
  'zh': NavbarOptions,
  'en': NavbarOptions,
}
// 导航栏数据
export const navbar:Navbar = {
  'zh': [
    { text: '网站入口', link: 'http://1.94.142.104:8088/' },
    // {
    //   text: '项目开发者',
    //   children: [
    //     { text: '小明 - gitee', link: 'https://gitee.com/teamworkr' },
    //     { text: '小明 - csdn', link: 'https://blog.csdn.net/szjSmiling' },
    //   ]
    // }
  ],
  'en': [
    { text: 'Website', link: 'http://1.94.142.104:8088/' },
    // {
    //   text: 'Contributors',
    //   children: [
    //     { text: 'Hisun - gitee', link: 'https://gitee.com/teamworkr' },
    //     { text: 'Hisun - csdn', link: 'https://blog.csdn.net/szjSmiling' },
    //   ]
    // }
  ],
}
