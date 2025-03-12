import { NForm, NFormItem, NButton, NInput, NTable, NPagination, NSpin, NIcon } from 'naive-ui'

import HsRedirection from '@/components/HsRedirection.vue'
import HsVideo from '@/components/HsVideo.vue'
import HsGrid from '@/components/HsGrid.vue'
import HsGridItem from '@/components/HsGridItem.vue'
import HsLogin from '@/components/HsLogin.vue'

// layouts
import Layout from '@/layouts/Layout.vue'
import LayoutHome from '@/layouts/LayoutHome.vue'


function useAntDesignVue (app:any) {
  app.component('n-form', NForm)
  app.component('n-form-item', NFormItem)
  app.component('n-button', NButton)
  app.component('n-input', NInput)
  app.component('n-table', NTable)
  app.component('n-pagination', NPagination)
  app.component('n-spin', NSpin)
  app.component('n-icon', NIcon)
}

export const registerComponents = (app:any) => {
  useAntDesignVue(app)
  app.component('HsRedirection', HsRedirection)
  app.component('HsLogin', HsLogin)
  app.component('HsGrid', HsGrid)
  app.component('HsGridItem', HsGridItem)
  app.component('HsVideo', HsVideo)
}

export const registerLayouts = () => {
  return {
    Layout,
    LayoutHome,
    HsLogin
  }
}
