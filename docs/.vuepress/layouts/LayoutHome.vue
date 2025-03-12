<script setup>
import { ref, onMounted } from 'vue'
import ParentLayout from '@vuepress/theme-default/lib/client/layouts/Layout.vue'
// import RightAnchor from '../components/RightAnchor/index.vue'
import { isAuthenticated } from '@/utils/cookie.ts'

const isLogin = ref(false)
onMounted(() => {
  isLogin.value = isAuthenticated()
})
</script>
<template>
  <ParentLayout v-if="isLogin" class="home-layout custom-layout">
    <template #navbar>
      <div class="my-navbar"></div>
    </template>
    <template #page>
      <slot name="page"></slot>
    </template>
    <template #page-bottom>
      <!-- <div class="my-footer">footer</div> -->
    </template>
  </ParentLayout>
</template>
<style lang="scss">

.home-layout {
  main.home {
    max-width: 80%;
    .hero img {
      margin-top: -30px;
      width: auto;
      max-height: 130px;
    }
  }
}
</style>
<style lang='scss' scoped>

</style>
