<script lang='ts'>
export default {
  name: 'HsGrid'
}
</script>
<script lang='ts' setup>
import { computed } from 'vue'

const props = defineProps({
  rows: {
    type: Number,
    default: 1
  },
  columns: {
    type: Number,
    default: 1
  }
})
const style = computed(() => ({

}))
</script>

<template>
  <div class="hs-grid" :style="style">
    <slot></slot>
  </div>
</template>

<style lang='scss' scoped>
.hs-grid{
  display: grid;
}
</style>
