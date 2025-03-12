import Cookies from 'js-cookie'
import { isJsonStr, isValidValue } from '@/utils/is.ts'
import { storageSet, storageGet } from '@/utils/storage.ts'


const TOKEN = 'HR_Admin_Token'
const roleMap:any = {
  1: '普通用户',
  2: 'SIM用户',
  3: 'UUC用户'
}

export const isAuthenticated = () => {
  try {
    const token = cookieGetToken() || ''
    // console.log('...isAuthenticated', token ? '已登录' : '未登录', token);
    return !!token
  } catch (error) {
    return false
  }
}

export function cookieSetToken ({ type, token: value }: any, btoa: boolean = false): any {
  storageSet('_HR_LOGINTYPE', type)
  if (isValidValue(value)) {
    value = btoa ? window.btoa(value) : value
    // 存储一天后过期
    const now = new Date().getTime() + 60 * 60 * 1000 * 24
    Cookies.set(TOKEN, value, { expires: new Date(now) })
    // 登录日志
    const isAdmin = storageGet('_HR_ISADMIN')
    // console.log('....roleMap', typeof type, type, roleMap[type], isAdmin)
    const userRole = Number(type) === 1 && isAdmin ? '系统管理员' : roleMap[type]
  }
}

export function cookieGetToken (atob: boolean = false): any {
  const value = Cookies.get(TOKEN) || ''
  const tokenStr = atob && value ? window.atob(value) : value
  if (isJsonStr(tokenStr)) {
    return JSON.parse(tokenStr)
  }
  return tokenStr
}

export function cookieDelToken () {
  return Cookies.remove(TOKEN)
}

export function cookieSet (name: string, value: any, btoa: boolean) {
  value = btoa ? window.btoa(value) : value
  const now = new Date().getTime() + 60 * 60 * 1000
  Cookies.set(name, value, { expires: new Date(now) })
}

export function cookieGet (name: string, atob: boolean = false) {
  const cvalue = Cookies.get(name) || ''
  const value = window.atob(cvalue)
  return atob ? window.atob(value) : value
}
