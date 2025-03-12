import request from '@/utils/request.ts'
import { storageSet } from '@/utils/storage.ts'

/**
 * @param {*} data = { username: '', password: '', loginType: '' }
 * @param {*} loginType 用户类型: 0: 死用户; 1: 普通用户; 2: Sim用户; 3: UUC登录
 * @return {*}
 * @Author: Hisun
 * @Date: 2024-02-04 17:22:09
 * @Description: 通用登录
 */
export const commonLogin = (data = { username: '', password: '', loginType: '' }) => {
  return request({
    url: '/api/v4/base-login',
    method: 'post',
    data
  })
}


const redirect_uri = import.meta.env.VITE_UUC_REDIRECT_URL
export const uucLogin = (data = { code: '' }) => {
  return request({
    url: `/api/v4/uuc/oauth2/login?code=${data.code}&redirectUri=${redirect_uri}`,
    method: 'get'
  })
}

/**
 * @param {*} data = { "userRole": "", "loginIp": "", "loginRegion": "", "tokenStr": "" }
 * @return {*}
 * @Author: Hisun
 * @Date: 2024-02-05 10:55:24
 * @Description: 登陆时调用, 记录登录日志
 */
export const loginRecord = async (data = {} as any) => {
  const response = await getUserRegion()
  const { ip = '', region = '' } = response
  // console.log('....getUserIp', ip, region);
  if (ip) {
    storageSet('_HR_IPREGION', JSON.stringify(response))
    data['loginIp'] = ip
  }
  if (region) {
    data['loginRegion'] = region
  }
  return request({
    url: '/api/v5/loginRecord',
    method: 'post',
    data
  })
}
// 获取当前 ip
export const getUserIp = () => {
  return fetch('https://api.ipify.org?format=json')
  .then(response => response.json())
  .catch(err => (err))
}
// 获取当前 区域
// https://www.czhuihao.cn/ip/ 获取当前ip对应城市
export const getUserRegion = () => {
  return fetch('https://ipapi.co/json/')
  .then(response => response.json())
  .catch(err => (err))
}
