import { cookieDelToken } from '@/utils/cookie.ts'
import { isJsonStr, isValidValue } from '@/utils/is.ts'

declare interface Window {
  _HS_TOOLS: any
  _HS_STORAGE: string
  _HS_HTTP_ERROR: string
  // _HS_throttle: (fn, delay, options?) => any
  // _HS_debounce: (fn, delay, options?) => any
  // _HS_deepCopy: (data: any) => any
  // _HS_deepCopyVueData: (data: any) => any
  // _HS_saveAsJson: (jsonData, fileName?) => any
}


export function storageSet (key: string, value: string | any, btoa: boolean = false): any {
  const storageApi = window.localStorage
  if (isValidValue(value)) {
    value = btoa ? window.btoa(value) : value
    storageApi.setItem(key, value)
  }
}

export function storageGet (key: string, atob: boolean = false): any {
  const storageApi = window.localStorage
  if (storageApi[key]) {
    let value = storageApi.getItem(key) as any
    if (isValidValue(value)) {
      value = isJsonStr(value) ? JSON.parse(value) : value
      return atob ? window.atob(value) : value
    }
    return value
  }
}

export function storageDel (key: string): any {
  const storageApi = window.localStorage
  if (storageApi[key]) {
    storageApi.removeItem(key)
  }
}

export function storageDelAll (isRedirectLogin = true): any {
  const _STORAGE = ['_HR_ISADMIN', '_HR_USERINFO', '_HR_READRECORD', '_HR_IPREGION']
  for (let i = 0, len = _STORAGE.length; i < len; i++) {
    const key = _STORAGE[i]
    storageDel(key)
  }
  cookieDelToken()
  if (isRedirectLogin) {
    
  }
}

export default {
  get: storageGet,
  set: storageSet,
  del: storageDel,
  clear: storageDelAll
}
