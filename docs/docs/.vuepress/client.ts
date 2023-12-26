import { defineClientConfig } from '@vuepress/client'
import HsLayout from './layout/index.vue'
import HsVideo from './components/HsVideo.vue'

export default defineClientConfig({
  layouts: {
    HsLayout
  },
  enhance({ app, router, siteData }) {
    app.component('HsVideo', HsVideo)
  },
  setup() {
    
  },
  rootComponents: [],
})
