<script lang='ts' setup>
import { ref, reactive, onMounted } from 'vue'
import ParentLayout from '@vuepress/theme-default/lib/client/layouts/Layout.vue'
import { useRouter } from "vue-router";
import fullLoading from '@/components/Async/loading.ts'
import { delayTimeout } from '@/utils/tool.ts';
import { readRecordReadTime } from '@/api/log.ts'
import { storageDelAll, storageGet } from '@/utils/storage.ts'
import { isAuthenticated } from '@/utils/cookie.ts'

const LogOutSvg ='/svg/logout.svg'
const LogOutSvgActive ='/svg/logout_active.svg'
const DashboardSvg ='/svg/dashboard.svg'
const DashboardSvgActive ='/svg/dashboard_active.svg'

const router = useRouter()
const navbarImage:any = [
  {
    'logout': LogOutSvg,
    'dashboard': DashboardSvg,
  },
  {
    'logout': LogOutSvgActive,
    'dashboard': DashboardSvgActive,
  }
]

const isLogin = ref(false)
const isAdmin = ref(false)
const currentRoute = reactive(router.currentRoute.value)
const imageInfo:any = reactive({
  logout: LogOutSvg,
  dashboard: DashboardSvg,
})

onMounted(() => {
  isLogin.value = isAuthenticated()
  if (isLogin.value) {
    isAdmin.value = !!storageGet("_HR_ISADMIN")
    if (currentRoute && currentRoute.path.indexOf('/dashboard') > -1) {
      imageInfo.dashboard = navbarImage[1]['dashboard']
    }
  }
})

const mouseleave = (type:string) => {
  if (type === 'dashboard' && currentRoute && currentRoute.path.indexOf('/dashboard') > -1) return
  imageInfo[type] = navbarImage[0][type]
}
const mouseenter = (type:string) => {
  imageInfo[type] = navbarImage[1][type]
}
const logout = async () => {
  const loading = fullLoading()
  storageDelAll()
  await delayTimeout(500)
  loading.destroy()
  router.push('/login')
}
const goDashboard = () => {
  router.push('/dashboard')
}
</script>
<template>
  <ParentLayout v-if="isLogin">
    <template #navbar-before>
      <!-- <div class="my-footer">navbar</div> -->
    </template>
    <template #navbar-after>
      <ClientOnly>
        <div v-if="isAdmin" class="custom-navbar my-dashboard" title="数据面板"
          @mouseleave="mouseleave('dashboard')" @mouseenter="mouseenter('dashboard')" @click="goDashboard">
          <img :src="imageInfo.dashboard" />
        </div>
      </ClientOnly>
      <div class="custom-navbar my-logout" title="退出登录"
        @mouseleave="mouseleave('logout')" @mouseenter="mouseenter('logout')" @click="logout">
        <img :src="imageInfo.logout" />
      </div>
    </template>
    <template #sidebar >
      <slot name="sidebar"></slot>
    </template>
    <template #page >
      <slot name="page"></slot>
    </template>
    <!-- <template #page-bottom>
      <div class="my-footer">footer</div>
    </template> -->
    <!-- <template #page-bottom>
      <div class="my-footer">footer</div>
    </template> -->
  </ParentLayout>
</template>
<style lang='scss' scoped>
.custom-navbar{
  margin-left: 1.5rem;
  line-height: var(--navbar-line-height);
  cursor: pointer;
  img {
    vertical-align: middle;
  }
}
</style>
