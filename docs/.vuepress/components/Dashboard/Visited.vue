<script lang="ts" setup>
import { reactive, ref, onMounted, onUnmounted, nextTick, computed } from 'vue'
import { LeftOutlined } from '@ant-design/icons-vue'
import HsPagination from '@/components/HsPagination.vue'
import { getLogDataAllVisited } from '@/api/panel.ts'
import { __debounce } from '@/utils/tool.ts'
import { timeHHMMSSFormat } from '@/utils/timer.ts'
import { exportXlsx } from '@/utils/export.ts'
import { isExternal } from '@/utils/is.ts'
import ExportSvg from '@/public/svgs/export.svg'

const props = defineProps({
  showHeader: {
    type: Boolean,
    default: true
  },
  showPagination: {
    type: Boolean,
    default: true
  },
  showTop10: {
    type: Boolean,
    default: false
  },
  filterColumns: {
    type: Array,
    default: () => ([])
  }
})

const columns = [
  {
    title: '受访页面',
    dataIndex: 'accessingPageName',
  },
  {
    title: '页面地址',
    dataIndex: 'accessingPage',
    ellipsis: true
  },
  {
    title: '浏览量',
    dataIndex: 'readCount',
    width: 150,
    align: 'center',
  },
  {
    title: '访客数',
    dataIndex: 'viewCount',
    width: 150,
    align: 'center',
  },
  {
    title: '访问时长',
    dataIndex: 'readTime',
    width: 150,
    align: 'center',
  }
]
const isMobile = ref(false)
const tableLoading = ref(false)
const tableData = ref<any>([])
const tableWrapRef = ref()
const tableUpdateKey = ref(0)
const isTableScroll = ref(false)
const scroll = reactive({
  x: 1200,
  y: 0
})
const pagination = reactive({
  current: 1,
  total: 0,
  pageSize: 15,
})

const columnsCalc = computed(() => {
  const filters = props.filterColumns
  let columnsNew = JSON.parse(JSON.stringify(columns))
  if (!Array.isArray(filters) || filters.length === 0) {
    columnsNew.unshift({ title: '排名', dataIndex: 'serial', width: 100, align: 'left', customRender: ({index}:any) => (index + 1)})
    return columnsNew
  }
  columnsNew = columnsNew.filter((e:any) => (filters.includes(e.title)));
  columnsNew.unshift({ title: '排名', dataIndex: 'serial', width: 100, align: 'left', customRender: ({index}:any) => (index + 1)})
  return columnsNew;
})

const getData = async () => {
  let dataRecords:any[] = []
  tableLoading.value = true
  const { code, data }:any = await getLogDataAllVisited({
    current: pagination.current,
    size: pagination.pageSize
  })
  tableLoading.value = false
  pagination.total = data.total
  if (code === 200 && data && Array.isArray(data.records)) {
    if (data.records.length > 0) {
      data.records.forEach((e:any) => {
        Object.keys(e).forEach((key:string) => {
          const value = e[key]
          if (key === 'readTime') {
            e[key] = timeHHMMSSFormat(value)
          }
        })
      })
      dataRecords = data.records
    }
  }
  tableData.value = dataRecords
  calcTableHeight()
}

const calcTableHeight = __debounce(() => {
  isTableScroll.value = false
  tableUpdateKey.value++
  nextTick(() => {
    if (tableWrapRef.value) {
      const height = tableWrapRef.value.clientHeight
      const tableBody = tableWrapRef.value.querySelector('.ant-table-tbody')
      const tableBodyHeight = tableBody ? tableBody.clientHeight : 0
      const tableContentHeight = height - 48 - 48
      isTableScroll.value = tableBodyHeight > tableContentHeight
      // console.log('...tableBody', tableBody, isTableScroll.value, height, tableBodyHeight);
      if (isTableScroll.value) {
        scroll.y = tableContentHeight
      }
    }
  })
}, 250)

const updateTableData = (page:number, pageSize:number) => {
  pagination.current = page
  pagination.pageSize = pageSize
  getData()
}

onMounted(() => {
  window.addEventListener('resize', calcTableHeight)
  if (document.body.clientWidth <= 719) {
    isMobile.value = true
    scroll.x = 719
  }
  getData()
})
onUnmounted(() => {
  window.removeEventListener('resize', calcTableHeight)
})

const exportData = () => {
  let data = JSON.parse(JSON.stringify(tableData.value))
  data = data.map((e:any) => {
    delete e.id
    return e
  })
  exportXlsx(data, '受访页面分析')
}
const goBack = () => {
  window.history.go(-1)
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
      <h3 class="hs-visit-title">
        <LeftOutlined class="ant-icon-left" :style="{ fontSize: '18px' }" @click="goBack" />
        <span>受访页面分析</span>
      </h3>
      <div class="hs-visit-view hs-btn-export" @click="exportData">
        <img :src="ExportSvg" alt="">
        <span>导出</span>
      </div>
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
          <template v-if="column.dataIndex === 'accessingPage'">
            <a class="custom-cell-href ellipsis" :href="record.accessingPage" target="_blank" :title="record.accessingPage">{{ formatPage(record.accessingPage) }}</a>
          </template>
        </template>
      </a-table>
      <HsPagination
        :visible="showPagination"
        :pagination="pagination"
        @change="updateTableData"
        />
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
  background: var(--h-white);
  &-header{
    margin-bottom: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .hs-visit-title {
      font-weight: 600;
      font-size: 18px;
      color: var(--h-text);
      line-height: 18px;
    }
    .ant-icon-left{
      cursor: pointer;
      margin-right: 8px;
      &:hover {
        color: var(--h-btn-hover-bg);
      }
    }
  }
  &-table {
    flex: 1;
    overflow: hidden;
  }
}
.custom-table{
  height: calc(100% - 48px);
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
