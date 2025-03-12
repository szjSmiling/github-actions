<script lang="ts" setup>
import { reactive, ref, onMounted, onUnmounted, nextTick, computed } from 'vue'
import { useRouter } from 'vue-router'
import { __debounce } from '@/utils/tool.ts'
import { getLogDataTop10 } from '@/api/panel.ts'
import { isExternal } from '@/utils/is.ts'

const props = defineProps({
  showHeader: {
    type: Boolean,
    default: true
  },
  filterColumns: {
    type: Array,
    default: () => ([])
  }
})

const router = useRouter()
const columns = [
  {
    title: '受访页面',
    dataIndex: 'accessingPageName',
    ellipsis: true
  },
  {
    title: '页面地址',
    dataIndex: 'accessingPage',
    ellipsis: true
  },
  {
    title: '浏览量',
    dataIndex: 'readCount',
    width: 80,
    // ellipsis: true
  },
  {
    title: '访客数',
    dataIndex: 'viewCount',
    width: 100,
    // ellipsis: true
  },
];
const tableLoading = ref(false)
const tableData = ref<any>([])
const tableWrapRef = ref()
const tableUpdateKey = ref(0)
const isTableScroll = ref(false)
const scroll = reactive({
  x: 319,
  y: 0
})
const columnsCalc = computed(() => {
  const filters = props.filterColumns
  let columnsNew = JSON.parse(JSON.stringify(columns))
  if (!Array.isArray(filters) || filters.length === 0) {
    return columnsNew
  }
  columnsNew = columnsNew.filter((e:any) => (filters.includes(e.title)));
  columnsNew.unshift({ title: '排名', dataIndex: 'serial', width: 60, align: 'left', customRender: ({index}:any) => (index + 1)})
  return columnsNew;
})

const getData = async () => {
  tableData.value = []
  tableLoading.value = true
  const questMethod = getLogDataTop10
  const { code, data }:any = await questMethod();
  tableLoading.value = false
  if (code === 200 && Array.isArray(data)) {
    if (data.length > 0) {
      tableData.value = data
    }
  }
}

const calcTableHeight = __debounce(() => {
  isTableScroll.value = false
  tableUpdateKey.value++
  nextTick(() => {
    if (tableWrapRef.value) {
      const height = tableWrapRef.value.clientHeight
      const tableBody = tableWrapRef.value.querySelector('.ant-table-tbody')
      const tableBodyHeight = tableBody ? tableBody.clientHeight : 0
      const tableContentHeight = height - 48
      isTableScroll.value = tableBodyHeight > tableContentHeight
      // console.log('...tableBody', tableBody, isTableScroll.value, height, tableBodyHeight);
      if (isTableScroll.value) {
        scroll.y = tableContentHeight
      }
    }
  })
}, 250)

onMounted(() => {
  window.addEventListener('resize', calcTableHeight)
  getData()
  calcTableHeight()
})
onUnmounted(() => {
  window.removeEventListener('resize', calcTableHeight)
})

const goVisitedList = () => {
  router.push('/dashboard/visited')
}
const formatPage = (page:string) => {
  if (isExternal(page)) {
    return page
  }
  return window.location.origin + page
}
</script>

<template>
  <div class="hs-visit">
    <div class="hs-visit-header" v-if="showHeader">
      <h3 class="hs-visit-title">受访页面分析</h3>
      <p class="hs-visit-view" @click="goVisitedList">导出</p>
    </div>
    <div class="hs-visit-table" ref="tableWrapRef">
      <a-table
        class="custom-table"
        table-layout="fixed"
        :key="tableUpdateKey"
        :loading="tableLoading"
        :scroll="isTableScroll ? scroll : {}"
        :bordered="false"
        :columns="columnsCalc"
        :data-source="tableData"
        :pagination="false"
        >
        <template #emptyText>
          <p>{{tableLoading ? '' : '暂无数据'}}</p>
        </template>
        <template #bodyCell="{ column, text, record }">
          <template v-if="column.dataIndex === 'accessingPageName'">
            <span class="custom-cell-text ellipsis" :title="text">{{ text }}</span>
            <a class="custom-cell-href ellipsis" :href="record.accessingPage" target="_blank" :title="record.accessingPage">{{ formatPage(record.accessingPage) }}</a>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<style lang='scss' scoped>
* {
  margin:0;
  padding:0;
  box-sizing: border-box;
}

.hs-visit{
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 24px;
  background: var(--h-white);
  &-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .hs-visit-title {
      font-weight: 600;
      font-size: 18px;
      color: var(--h-text);
      line-height: 18px;
    }
    .hs-visit-view{
      font-weight: 400;
      font-size: 14px;
      color: var(--h-text-lighter);
      line-height: 14px;
      cursor: pointer;
      &:hover {
        color: var(--c-text-accent);
      }
    }
  }
  &-table {
    flex: 1;
    overflow: hidden;
  }
}
.custom-table{
  height: 100%;
  .custom-cell-text{
    display: block;
    width: 100%;
    font-size: 14px;
    line-height: 22px;
  }
  .custom-cell-href{
    display: block;
    margin-top: 2px;
    width: 100%;
    font-size: 14px;
    color: var(--h-link-text);
    line-height: 22px;
  }
}
</style>
