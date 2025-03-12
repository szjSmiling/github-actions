<template>
  <div></div>
</template>

<script lang='ts'>
export default {
  name: 'HsRedirection'
}
</script>
<script lang='ts' setup>
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
if (route.path.includes('/zh/sim/')) {
  router.replace('/zh/sim/guide/')
} else {
  router.replace('/zh/twin/guide/')
}
</script>

<style lang='scss' scoped></style>
