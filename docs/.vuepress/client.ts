import { defineClientConfig } from '@vuepress/client'
// import HsVideo from './components/HsVideo.vue'

export default defineClientConfig({
  layouts: {},
  enhance({ app, router, siteData }) {
    // 注册全局组件, 是静态引入
    // app.component('HsVideo', HsVideo)
  },
  setup() {
    
  },
  rootComponents: [],
})
