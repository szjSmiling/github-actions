<script lang='ts'>
export default {
  name: 'HsGridItem'
}
</script>
<script lang='ts' setup>
import { computed } from 'vue'

const props = defineProps({

})
const style = computed(() => ({
  
}))
</script>

<template>
  <div class="hs-grid-item" :style="style">
    <slot></slot>
  </div>
</template>

<style lang='scss' scoped>
.hs-grid-item{

}
</style>
