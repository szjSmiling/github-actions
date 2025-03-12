import { hsEval } from '@/utils/tool.ts'

export function hexColorToRGBA(hex:any, alpha = 100) {
  if (!hex || hex === 'transparent') {
    return 'transparent'
  }
  // 渐变颜色值
  if (Object.prototype.toString.call(hex) === '[object Object]' && hex.type) {
    if (Array.isArray(hex.colorStops) && hex.colorStops.length > 0) {
      hex.colorStops = hex.colorStops.map((e:any) => ({ ...e, color: hexColorToRGBA(e.color, alpha) }))
      return hex
    }
    return hex
  }
  // rgba颜色值
  if (typeof hex === 'string' && hex.includes('rgba')) {
    return hex
  }
  const rgb:any[] = [] // 定义rgb数组
  if (/^\#[0-9A-F]{3}$/i.test(hex)) { // 判断传入是否为#三位十六进制数
    let sixHex = '#'
    hex.replace(/[0-9A-F]/ig, function(kw:any) {
      sixHex += kw + kw // 把三位16进制数转化为六位
    })
    hex = sixHex // 保存回hex
  }
  if (/^#[0-9A-F]{6}$/i.test(hex)) { // 判断传入是否为#六位十六进制数
    hex.replace(/[0-9A-F]{2}/ig, function(kw:any) {
      rgb.push(hsEval('0x' + kw)) // 十六进制转化为十进制并存如数组
    })
    
    return `rgba(${rgb.join(',')},${alpha / 100})` // 输出RGB格式颜色
  } else {
    return 'rgb(0,0,0)'
  }
}
