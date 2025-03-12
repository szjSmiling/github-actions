import { cookieSetToken } from "@/utils/cookie.ts";
import { uucLogin, commonLogin } from '@/api/login.ts'
import { storageSet } from "./storage.ts";

const loginErrorMessage = '登陆失败，请稍后重试！'


export function clearLoadingCache () {
  const app = document.getElementById('app')
  const loading = document.getElementsByClassName('hiui-loading')[0]
  if (app && loading) {
    app?.removeChild(loading)
  }
}

export function parseUrlParams(url:string = '') {
  let params = null as any
  if (url.indexOf("?") > -1) {
    const queryString = url.substring(url.indexOf("?") + 1);
    const paramPairs = queryString.split("&");
    params = {}
    for (let pair of paramPairs) {
      const [key, value] = pair.split("=");
      params[key] = window.decodeURI(value);
    }
  }
  return params
}

// 普通用户/sim用户登录
export async function getLoginSimCommon(params:object|null|any) {
  const { code, data }:any = await commonLogin(params);
  if (code === 200) {
    const { token } = data;
    try {
      storageSet('_HR_ISADMIN', data.username === 'admin')
      storageSet('_HR_USERINFO', encodeURIComponent(JSON.stringify(data)), true)
      cookieSetToken({ type: params.loginType, token });
      return true
    } catch (error) {
      console.log(error);      
      return true
    }
  } else {
    return false
  }
}

// sim token 登录, 从sim产品内部跳过来
export async function getLoginSimToken(params:object|null|any) {
  cookieSetToken({ type: 2, token: params?.token ?? '' });
  return true
}

// uuc 登录
export async function getLoginUucToken(params:object|null|any) {
  const response = await uucLogin(params)
  .then((res:any) => {
    if (res.code === 200) {
      const data = res.data
      try {
        storageSet('_HR_ISADMIN', data.username === 'admin')
        storageSet('_HR_USERINFO', encodeURIComponent(JSON.stringify(data)), true)
        cookieSetToken({ type: 3, token: data?.token ?? '' });
        return true
      } catch (error) {
        console.log(error);      
        return true
      }
    }
    return false
  })
  .catch(() => {
    return false
  })
  return response
}