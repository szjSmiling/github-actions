<script lang="ts" setup>
import { reactive, ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { LeftOutlined } from '@ant-design/icons-vue'
import HsPagination from '@/components/HsPagination.vue'
import { getLogDataAllVisitors } from '@/api/panel.ts'
import { __debounce } from '@/utils/tool.ts'
import dayjs, { timeHHMMSSFormat } from '@/utils/timer.ts'
import { exportXlsx } from '@/utils/export.ts'
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
  scrollX: {
    type: Number,
    default: 920
  }
})

const columns = [
  {
    title: '访客账号',
    dataIndex: 'username',
  },
  // {
  //   title: '访客名称',
  //   dataIndex: 'nickName',
  // },
  {
    title: '访问次数',
    dataIndex: 'loginCount',
    width: 100
  },
  {
    title: '停留时长',
    dataIndex: 'waitTime',
    // customRender: ({ text }:any) => {
    //   const timer = timeHHMMSSFormat(text)
    //   return timer
    // }
  },
  {
    title: '访问时间',
    dataIndex: 'loginTime',
    width: 180,
    // customRender: ({ text }:any) => {
    //   const dateFn = new Date(Number(text))
    //   const timer = dayjs(dateFn).format('YYYY-MM-DD HH:mm:ss')
    //   return timer
    // }
  },
  {
    title: '访客IP',
    dataIndex: 'loginIp',
  },
  {
    title: '访问地点',
    dataIndex: 'loginRegion',
    ellipsis: true,
  },
  {
    title: '访客类型',
    dataIndex: 'userRole',
    ellipsis: true
  },
];
const isMobile = ref(false)
const tableLoading = ref(false)
const tableData = ref<any>([])
const tableWrapRef = ref()
const tableUpdateKey = ref(0)
const isTableScroll = ref(false)
const scroll = reactive({
  x: props.scrollX,
  y: 0
})
const pagination = reactive({
  current: 1,
  total: 0,
  pageSize: 15,
})

watch(() => props.scrollX, (val:any) => {
  scroll.x = val
})

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

const getData = async () => {
  let dataRecords:any[] = []
  tableLoading.value = true
  const { code, data }:any = await getLogDataAllVisitors({
    current: pagination.current,
    size: pagination.pageSize
  })
  tableLoading.value = false
  if (code === 200 && data && Array.isArray(data.records)) {
    pagination.total = data.total
    if (data.records.length > 0) {
      data.records.forEach((e:any) => {
        Object.keys(e).forEach((key:string) => {
          const value = e[key]
          if (key === 'waitTime') {
            e[key] = timeHHMMSSFormat(value)
          }
          if (key === 'loginTime') {
            const dateFn = new Date(Number(value))
            e[key] = dayjs(dateFn).format('YYYY-MM-DD HH:mm:ss')
          }
        })
      })
      dataRecords = data.records
    }
  }
  tableData.value = dataRecords
  calcTableHeight()
}
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
    delete e.tokenStr
    delete e.userId
    return e
  })
  exportXlsx(data, '访客列表')
}
const goBack = () => {
  window.history.go(-1)
}
</script>

<template>
  <div class="hs-visit">
    <div class="hs-visit-header" v-if="showHeader">
      <h3 class="hs-visit-title">
        <LeftOutlined class="ant-icon-left" :style="{ fontSize: '16px' }" @click="goBack" />
        <span>访客列表</span>
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
        :columns="columns"
        :data-source="tableData"
        :pagination="false">
          <template #emptyText>
            <p>{{tableLoading ? '' : '暂无数据'}}</p>
          </template>
        <!-- <template #bodyCell="{ column, text }">
          <template v-if="column.dataIndex === 'userType'">
            <p>{{ text }}</p>
          </template>
        </template> -->
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
}

</style>
