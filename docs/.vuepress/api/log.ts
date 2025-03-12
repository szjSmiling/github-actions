import request from '@/utils/request.ts'

export const noLogRouteList = [
  '/',
  '/404.html',
  '/login',
  '/zh/',
  '/en/',
  '/zh/twin/',
  '/zh/sim/',
  '/dashboard',
  '/dashboard/visitor',
  '/dashboard/visited',
]

/**
 * @param {*} data = { "id": "", "accessingPage": "", "accessingPageName": "", "accountLoginId": "", "tokenStr": "", "readTime": "" }
 * @param {*} id
 * @param {*} accessingPage
 * @param {*} accessingPageName
 * @param {*} accountLoginId
 * @param {*} tokenStr
 * @param {*} readTime
 * @return {*}
 * @Author: Hisun
 * @Date: 2024-02-05 10:55:24
 * @Description: 用户查看时候调用
 */
export const readRecord = (data = {}) => {
  return request({
    url: '/api/v5/readRecord',
    method: 'post',
    data
  })
}

/**
 * @param {*} data = { "id": "", "accessingPage": "", "accessingPageName": "", "accountLoginId": "", "tokenStr": "", "readTime": "" }
 * @param {*} id
 * @param {*} accessingPage
 * @param {*} accessingPageName
 * @param {*} accountLoginId
 * @param {*} tokenStr
 * @param {*} readTime
 * @return {*}
 * @Author: Hisun
 * @Date: 2024-02-05 10:55:24
 * @Description: 用户查看时候调用统计时间
 */
export const readRecordReadTime = (data = {}) => {
  return request({
    url: '/api/v5/readRecordReadTime',
    method: 'post',
    data
  })
}
