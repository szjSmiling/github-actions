import { defineAsyncComponent, render, createVNode, VNodeTypes } from 'vue'
/*
  resolveDirective
  如果在当前应用实例中可用,则允许通过其名称解析一个directive。
  返回一个Directive,如果没有找到,则返回undefined
  只能在render或setup函数中使用。
*/
/*
  withDirectives
  允许将指令应用于VNode,返回一个包含应用指令的VNode。
  withDirectives只能在render或setup函数中使用。
*/

export default function (options = {} as any) {
  const { isAnt = false }  = options
  const container = document.createElement('div')
  container.className = 'hs-loading-container'
  const destroy = () => {
    render(null, container)
    if (document.body.contains(container)) {
      document.body.removeChild(container)
    }
    // console.log('HsLoading销毁了');
  }
  let ModalComponent = null as ReturnType<any>
  if (isAnt) {
    ModalComponent = defineAsyncComponent(() => import(`./HsLoadingAnt.vue`))
  } else {
    ModalComponent = defineAsyncComponent(() => import(`./HsLoading.vue`))
  }
  const app = createVNode(ModalComponent, {
    onDestroy: destroy,
    ...options
  })
  
  render(app, container)
  document.body.appendChild(container)
  return {
    destroy
  }
}
