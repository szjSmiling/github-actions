import { isValidValue } from '@/utils/is.ts'
import dayjs from 'dayjs'


export const addZero = (value:any) => {
  if(!isValidValue(value)) {
    return value
  }
  value = Number(value)
  return value > 9 ? value : `0${value}`
}

// {value}: 毫米
export const lenFormat = (value:any) => {
  if(!isValidValue(value)) {
    return value
  }
  value = Number(value)
  const mm = parseInt((value % 1000) as any)
  const m = parseInt((value / 1000) as any)
  const mmUnit = mm > 0 ? `${mm}` : ''
  const mUnit = m > 0 ? `${m}` : ''
  return `${mUnit}.${mmUnit}m`
}
// {value}: 毫秒
export const timeHHMMSSFormat = (value:any, unit = '', joinSymbol = ':') => {
  if(!isValidValue(value)) {
    return value
  }
  const miao = parseInt((value / 1000) as any)
  const h = parseInt((miao / 3600) as any)
  const hrest = parseInt((miao % 3600) as any)
  const m = parseInt((hrest / 60) as any)
  const s = parseInt((hrest % 60) as any)
  // const msUnit = ms > 0 ? `${ms}ms` : ''
  const sUnit = s > 0 ? `${addZero(s)}${unit}` : '00'
  const mUnit = m > 0 ? `${addZero(m)}${unit}` : '00'
  const hUnit = h > 0 ? `${addZero(h)}${unit}` : '00'
  return `${hUnit}:${mUnit}:${sUnit}`
}

export default dayjs