import { defineClientConfig } from 'vuepress/client'
import { useNotification, useMessage } from 'naive-ui'
import { onBeforeMount, onMounted, provide } from 'vue'
import { registerComponents, registerLayouts } from '@/components/registerComponents'
import { registerRoutes } from '@/components/registerRoutes'
import { isAuthenticated, cookieGetToken, cookieSetToken } from '@/utils/cookie.ts'
import { storageSet, storageGet } from '@/utils/storage.ts'
import vuePkg from "vue/package.json"
import vuepressPkg from "vuepress/package.json"

function nextHandler (next:any, path?:string|boolean) {
  if (path) {
    return next(path)
  }
  return next()
}
function showBadge(name, version, nameStyle, versionStyle) {
  console.log(
    "%c ".concat(name, " %c ").concat(version, " "),
    "padding: 0 4px; line-height: 20px; border-radius: 3px 0 0 3px; color: #fff; background: ".concat(nameStyle, ";"),
    "padding: 0 4px; line-height: 20px; border-radius: 0 3px 3px 0; color: #fff; background: ".concat(versionStyle, ";"),
  );
}
showBadge("vue", vuePkg.version, "#606060", "RGB(20,117,178)");
showBadge("vuepress", vuepressPkg.version, "#606060", "RGB(20,117,178)");

let _HR_router:any

export default defineClientConfig({
  rootComponents: [], // 放置全局UI组件之类, 如: 全局弹窗/全局loading
  layouts: { ...registerLayouts() },
  enhance({ app, router, siteData }) {
    _HR_router = router
    // registerRoutes(router)
    if (!import.meta.env.SSR) {
      registerComponents(app)
      router.beforeEach(async (to:any, from, next) => {
        const isLogin = isAuthenticated()
        // console.log(isLogin, to.path);
        if (!isLogin && to.path !== '/login') {
          return nextHandler(next, '/login')
        }
        nextHandler(next)
      })
      // router.afterEach(async (to, from, failure) => {
      //   console.log('....afterEach');
      // })
      // router.onError((err:Error) => {
      //   console.error('....router error: ', err.message);
      // })
    }
  },
  setup() {
    onBeforeMount(() => {
      console.log(`欢迎访问~~`)
      window._HR_router = _HR_router
    })
  },
})
