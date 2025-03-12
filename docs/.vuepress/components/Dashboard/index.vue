<script lang='ts' setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Layout from '@/layouts/Layout.vue'
import Visitor from './Visitor.vue'
import VisitedTop10 from './VisitedTop10.vue'

const router = useRouter()
const route = useRoute()
const isMobile = ref(false)

onMounted(() => {
  if (document.body.clientWidth <= 719) {
    isMobile.value = true
  }
})

const goVisitorList = () => {
  router.push('/dashboard/visitor')
}
const goVisitedList = () => {
  router.push('/dashboard/visited')
}

</script>

<template>
  <Layout>
    <template #sidebar>
      <div v-show="false"></div>
    </template>
    <template #page>
      <div class="hs-wrapper">
        <div v-if="route.path === '/dashboard'" class="hs-container">
          <div class="hs-content hs-content-left">
            <div class="hs-content-header">
              <h3 class="hs-content-title">访客列表</h3>
              <p class="hs-content-view" @click="goVisitorList">查看更多</p>
            </div>
            <Visitor class="hs-visit-index" :showHeader="false" :showPagination="isMobile" />
          </div>
          <div class="hs-content hs-content-right">
            <div class="hs-content-header">
              <h3 class="hs-content-title">受访页面TOP10</h3>
              <p class="hs-content-view" @click="goVisitedList">查看更多</p>
            </div>
            <VisitedTop10 class="hs-visit-index"
              :showHeader="false"
              :showTop10="true"
              :filterColumns="['排名', '受访页面', '浏览量']" />
          </div>
        </div>
        <div v-else class="hs-container">
          <div class="hs-content">
            <router-view #="{ Component }">
              <transition name="fade">
                <component :is="Component" />
              </transition>
            </router-view>
          </div>
        </div>
      </div>
    </template>
  </Layout>
</template>

<style lang='scss' scoped>
* {
  margin:0;
  padding:0;
  box-sizing: border-box;
}
.hs-wrapper{
  width: 100vw;
  height: 100vh;
  padding: 82px 32px 32px;
  overflow: hidden;
  background: var(--h-gray);
  .hs-container {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
.hs-content {
  padding: 24px;
  height: 100%;
  overflow: hidden;
  background: var(--h-white);
  border-radius: 4px;
  box-shadow: 5px 8px 15px 0px rgba(141,145,153,0.33);
  &.hs-content-left{
    // min-width: 920px;
    width: 64%;
  }
  &.hs-content-right{
    min-width: 300px;
    width: 34%;
  }
  &-header{
    margin-bottom: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .hs-content-title {
      font-weight: 600;
      font-size: 18px;
      color: var(--h-text);
      line-height: 18px;
    }
    .hs-content-view{
      padding-right: 16px;
      font-weight: 400;
      font-size: 14px;
      color: var(--h-text-lighter);
      line-height: 14px;
      cursor: pointer;
      position: relative;
      &::before,
      &::after {
        display: inline-block;
        content: "";
        width: 10px;
        height: 1px;
        border-radius: 2px;
        background: var(--h-text-lighter);
        position: absolute;
        right: 0;
      }
      &::before {
        top: 4px;
        transform: rotate(35deg);
      }
      &::after {
        top: 9px;
        transform: rotate(-35deg);
      }
      &:hover {
        color: var(--c-text-accent);
        &::before,
        &::after {
          background: var(--c-text-accent);
        }
      }
    }
  }
  // 子页面
  .hs-visit-index {
    height: calc(100% - 18px - 24px);
  }
}
:deep(.ant-spin-nested-loading) {
  height: 100%;
}
:deep(.ant-table) {
  --c-bg-light: var(--h-white);
  &,
  .ant-table-container,
  .ant-table-header,
  thead>tr:first-child >*:last-child,
  thead>tr:first-child >*:first-child{
    border-start-end-radius: 0 !important;
    border-start-start-radius: 0 !important;
  }
  table {
    display: table;
    margin: 0 0;
    border-radius: 0 !important;
  }
  th, tr, td{
    border: 0 !important;
  }
  .ant-table-cell{
    padding: 13px 16px;
  }
  .ant-table-thead .ant-table-cell{
    background: var(--h-table-thead-bg);
  }
  tr:nth-child(2n) {
    background: var(--h-table-tr-bg);
  }
  td.ant-table-cell-row-hover {
    background: var(--h-table-tr-hover-bg) !important;
  }
  thead tr {
    color: var(--h-text);
  }
  tbody tr {
    color: var(--h-text-lighter);
  }
}
</style>
<style lang="scss" scoped>
@media (max-width: 719px) {
  .hs-wrapper {
    padding: var(--navbar-height) 0 0;
    background: var(--h-white);
    .hs-container {
      padding: 0 0 1rem;
      flex-direction: column;
    }
    .hs-content{
      width: 100%;
      padding: 1rem 1.5rem 0;
      box-shadow: unset;
    }
    .hs-content-right{
      border-top: 1rem solid var(--h-table-tr-bg);
    }
  }
}
</style>
