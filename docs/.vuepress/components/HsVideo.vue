<template>
  <div class="hs-video" :style="wrapperStyle" >
    <video
      :controls="controls"
      :controlslist="controlslist"
      :autoPlay="autoPlay"
      crossorigin="anonymous"
      disablePictureInPicture
      :muted="muted"
      :style="videoStyle"
    >
      <source :src="url" type="video/webm" />
      <source :src="url" type="video/mp4" />
      <source :src="url" type="video/ogg" />
      抱歉，你的浏览器不支持内嵌视频，不过不用担心，你可以
      <a :href="url" download>下载 WEBM</a>
      <a :href="url" download>下载 MP4</a>
      <a :href="url" download>下载 ogg</a>
      并用你喜欢的播放器观看！
    </video>
  </div>
</template>
<script lang='ts' setup>
import { computed, onMounted } from 'vue'
import { withBase } from '@vuepress/client'
const props = defineProps({
  url: {
    type: String,
    default: withBase('/images/video.mp4')
  },
  wrapperStyle: {
    type: Object,
    default: ({
      textAlign: 'center'
    })
  },
  videoStyle: {
    type: Object,
    default: ({
      height: '300px'
    })
  },
  controls: {
    type: Boolean,
    default: true
  },
  useControls: {
    type: Boolean,
    default: false
  },
  controlslist: {
    type: String,
    default: ''
  },
  autoPlay: {
    type: Boolean,
    default: false
  },
  muted: {
    type: Boolean,
    default: false
  },
  noFullScreen: {
    type: Boolean,
    default: true
  },
  nodownload: {
    type: Boolean,
    default: true
  },
  noremoteplayback: {
    type: Boolean,
    default: true
  },
  noplaybackrate: {
    type: Boolean,
    default: true
  }
})
// nofullscreen nodownload noremoteplayback noplaybackrate foobar
const controlslist:any = computed(() => {
  if (props.useControls) {
    return props.controlslist
  }
  const list:any = []
  const fullScreen = props.noFullScreen ? 'nofullscreen' : ''
  list.push(fullScreen)
  const download = props.nodownload ? 'nodownload' : ''
  list.push(download)
  const remoteplayback = props.noremoteplayback ? 'noremoteplayback' : ''
  list.push(remoteplayback)
  const playbackrate = props.noplaybackrate ? 'noplaybackrate' : ''
  list.push(playbackrate)
  console.log('....list', list.join(' '));
  return list.join(' ')
})

onMounted(() => {

})
</script>
<style lang='scss' scoped>
.hs-video{
  width: 100%;
  height: 300px;
  background: #111111;
}
</style>
