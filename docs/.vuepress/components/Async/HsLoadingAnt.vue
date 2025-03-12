<script>
export default {
  name: 'HsLoading'
}
</script>
<script setup>
import { NSpin } from 'naive-ui'
const props = defineProps({
  tip: {
    type: String,
    default: '加载中---'
  },
  size: {
    type: String,
    default: 'large'
  },
  delay: {
    type: Number,
    default: 0
  },
  spinning: {
    type: Boolean,
    default: true
  },
  showMask: {
    type: Boolean,
    default: false
  },
  maskStyle: {
    type: Object,
    default: () => ({
      background: 'rgba(0, 0, 0, 0.5)'
    })
  },
  wrapperClass: {
    type: String,
    default: ''
  },
})

</script>

<template>
  <div class="hr-loading" :class="[wrapperClass]">
    <div v-show="showMask" class="hr-loading-mask" :style="maskStyle"></div>
    <!-- <Spin :wrapperClassName="'test'" :tip="tip" :size="size" :spinnin="spinning" :delay="delay">
    </Spin> -->
  </div>
</template>

<style lang='scss' scoped>
.hr-loading{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  .hr-loading-mask{
    width: 100%;
    height: 100%;
    position: absolute;
  }
}
:deep(.ant-spin) {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
