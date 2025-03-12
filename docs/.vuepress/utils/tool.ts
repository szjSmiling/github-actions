export function getImgHref(fileName = '', path = '', ext = 'webp') {
  if (path) {
    const img = new URL(`../public/${path}/${fileName}.${ext}`, import.meta.url).href
    return img
  }
  const img = new URL(`../public/${path}/${fileName}.${ext}`, import.meta.url).href
  return img
}


interface _TDOptions {
  leading?: boolean
}
interface _Throttle {
  fn: () => void
  delay: string
  options?: _TDOptions
}

// 节流函数
// 定义：在一段时间内最多触发一次事件。当事件持续触发时，每n秒只执行一次函数。如果在n秒内事件被重复触发，那么只有第一次触发的事件会生效，一段时间过后才能再次触发。
// 场景：主要用于一些高频的事件，比如鼠标的scroll事件或者mousemove事件等。如果没有节流，事件会频繁触发，进而影响性能。此外，还常用于处理如浏览器播放事件、window的resize等场景
// 场景: 表单提交
export function __throttle<_Throttle> (fn: any, delay: number, options?: _TDOptions): any {
  let timer: any = null as any
  let leading = false
  if (options?.leading) {
    leading = options?.leading
  }
  return function (this: any) {
    if (timer !== null) {
      return
    }
    // 先执行,然后进行节流
    if (leading) {
      fn.apply(this, arguments)
      timer = setTimeout(() => {
        timer = null as any
      }, delay)
    } else {
      timer = setTimeout(() => {
        fn.apply(this, arguments)
        timer = null as any
      }, delay)
    }
  }
}

// 防抖函数
// 定义：在一段时间内，只要有事件触发，就重新计算时间，直到这段时间内没有事件触发，才真正执行事件函数。如果在等待执行函数的过程中又触发了新的事件，那么将取消之前的计时并重新开始计时，直到等待的时间结束且没有新的事件触发时，才执行事件函数。1234
// 场景：适用于一些用户输入的事件，比如搜索框输入时触发请求。如果用户连续输入字符，防抖可以确保在用户停止输入后才发起请求，避免短时间内的频繁请求，提高性能。此外，还常用于短信验证、文本编辑器实时保存等场景。
// 场景: 搜索、窗口滚动、窗口resize
export function __debounce<_Throttle> (fn: any, delay: number, options?: _TDOptions): any {
  let timer: any = null as any
  return function (this: any) {
    if (timer !== null) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments)
      timer = null as any
    }, delay)
  }
}

// 避免使用 eval, 打包会有警告
export function hsEval (fn:any) {
  let tmpFn = Function
  return new tmpFn(`return ${fn}`)()
}

// 下载json数据
export const saveAsJson = (jsonData = '', fileName = '文件') => {
  const jsonDataStr = JSON.stringify(jsonData)
  const blob = new Blob([jsonDataStr], { type: 'application/json;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  let link = document.createElement('a')
  link.style.display = 'none'
  link.download = fileName
  link.href = url
  link.click()
  link = null!
  URL.revokeObjectURL(url)
}
// 手动延时
export const delayTimeout = (delay = 1000) => {
  return new Promise((resolve,reject) => {
    const timer = setTimeout(() => {
      clearTimeout(timer)
      resolve(true)
    }, delay)
  })
}