import { defineClientConfig } from '@vuepress/client'
import HsLayout from './layout/index.vue'
import HsVideo from './components/HsVideo.vue'

export default defineClientConfig({
  layouts: {
    HsLayout
  },
  enhance({ app, router, siteData }) {
    // 这里的组件注册, 是静态引入
    // app.component('HsVideo', HsVideo)
  },
  setup() {
    
  },
  rootComponents: [],
})
