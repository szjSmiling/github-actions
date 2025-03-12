<template>
  <div class="hs-video" :style="wrapperStyle" >
    <video
      :controls="controls"
      :controlslist="controlslistData"
      :auto-play="autoplay"
      crossorigin="anonymous"
      disablePictureInPicture
      :muted="muted"
      :style="videoStyle"
    >
      <source :src="videoUrl" type="video/webm" />
      <source :src="videoUrl" type="video/mp4" />
      <source :src="videoUrl" type="video/ogg" />
      抱歉，你的浏览器不支持内嵌视频，不过不用担心，你可以
      <a :href="videoUrl" download>下载 WEBM</a>
      <a :href="videoUrl" download>下载 MP4</a>
      <a :href="videoUrl" download>下载 ogg</a>
      并用你喜欢的播放器观看！
    </video>
  </div>
</template>
<script lang='ts' setup>
import { ref, computed, onMounted } from 'vue'
import { withBase } from 'vuepress/client'


const props = defineProps({
  url: {
    type: String,
    default: ''
  },
  isOnline: {
    type: Boolean,
    default: true
  },
  wrapperStyle: {
    type: Object,
    default: ({
      margin: '15px 0 0',
      textAlign: 'center'
    })
  },
  videoStyle: {
    type: Object,
    default: ({
      width: '100%',
      // height: '300px'
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
  autoplay: {
    type: [Number , Boolean],
    default: false
  },
  muted: {
    type: Boolean,
    default: false
  },
  noFullScreen: {
    type: Boolean,
    default: false
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
const static_url = import.meta.env.VITE_STATIC_URL
const prefix = ref(static_url)
const videoUrl = computed(() => {
  if (props.isOnline) {
    return `${prefix.value}${props.url}`
  }
  return props.url
})
// nofullscreen nodownload noremoteplayback noplaybackrate foobar
const controlslistData:any = computed(() => {
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
  // console.log('....list', list.join(' '));
  return list.join(' ')
})


</script>
<style lang='scss' scoped>
.hs-video{
  width: 100%;
}
</style>
