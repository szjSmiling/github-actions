<script>
export default {
  name: "HsLoading",
};
</script>
<script setup>
const props = defineProps({
  tip: {
    type: String,
    default: "加载中",
  },
  showMask: {
    type: Boolean,
    default: false
  },
  maskStyle: {
    type: Object,
    default: () => ({
      background: 'rgba(0, 0, 0, 0.5)'
    }),
  },
  wrapperClass: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div class="hs-loading" :class="[wrapperClass]" >
    <div v-show="showMask" class="hs-loading-mask" :style="maskStyle"></div>
    <div class="hiui-loading">
      <span role="img" class="hiui-loading-dot">
        <svg
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="true"
          focusable="false"
          class="bwdicon-spin">
          <use xlink:href="#icon-loading"></use>
        </svg>
      </span>
      <div class="hiui-internal-loading-text">{{ tip }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.hs-loading{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  .hs-loading-mask{
    width: 100%;
    height: 100%;
    position: absolute;
  }
}
.hiui-loading {
  position: absolute !important;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: #2681ff;
  text-align: center;
}
.hiui-loading-dot {
  position: relative;
  display: inline-block;
  width: 1em;
  height: 1em;
  font-size: 32px;
  color: inherit;
}
@keyframes circle-turn {
  100% {
    transform: rotate(1turn);
  }
}
svg.bwdicon-spin {
  animation: circle-turn 0.8s linear infinite;
}
</style>
