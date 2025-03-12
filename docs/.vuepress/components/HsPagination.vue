<template>
  <div v-if="visible" class="pagination-container">
    <a-pagination
      v-model:current="pagination.current"
      v-model:page-size="pagination.pageSize"
      :page-size-options="pageSizeOptions"
      :show-less-items="true"
      :show-quick-jumper="false"
      :show-size-changer="true"
      :total="pagination.total"
      :hide-on-single-page="false"
      :show-total="(total:number) => {
        return `共 ${total} 条`
      }"
      @change="changeHandle">
      <template #buildOptionText="props">
        <span class="page-option-text">{{ props.value }}条/页</span>
      </template>
    </a-pagination>
  </div>
</template>

<script lang="ts" setup>
const emits = defineEmits(['change'])
const props = defineProps({
  visible: {
    type: Boolean,
    default: true
  },
  pageSizeOptions: {
    type: Array,
    default: ['10', '15', '20', '25', '30', '50']
  },
  pagination: {
    type: Object,
    default: () => ({
      current: 1,
      pageSize: 15,
      total: 0
    })
  }
})


const changeHandle = (page:number, pageSize:number) => {
  emits('change', page, pageSize)
}
</script>

<style lang='scss' scoped>
.pagination-container{
  position: relative;
  margin: 8px 0;
  height: 32px;
  background: var(--h-white);
  :deep(.ant-pagination) {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .ant-select-single:hover .ant-select-selector{
      border-color: var(--h-btn-bg);
    }
    .ant-select-selector{
      border-radius: 2px;
      color: var(--h-text-lighter);
    }
    .ant-pagination-item,
    .ant-pagination-next {
      min-width: 26px;
      height: 26px;
      line-height: 24px;
      border-radius: 2px;
      a {
        color: var(--h-text-lighter);
      }
      &:hover .ant-pagination-item-link {
        border-radius: 2px;
      }
    }
    .ant-pagination-item-active {
      background: var(--h-btn-bg);
      a {
        color: var(--h-btn-text);
      }
    }
  }
}
</style>
