import request from '@/utils/request.ts'

/**
 * @param {*} params
 * @return {*}
 * @Author: Hisun
 * @Date: 2024-02-28 16:07:33
 * @Description: 查询页面数据Top10
 */
export const getLogDataTop10 = (params = {}) => {
  return request({
    url: `/api/v1/queryTopLogDetailsData`,
    method: 'get',
    params
  })
}

/**
 * @param {*} params = {}
 * @param {*}
 * @return {*}
 * @Author: Hisun
 * @Date: 2024-02-04 17:22:09
 * @Description: 查询所有访客访问页面数据
 */
export const getLogDataAllVisited = (params = {}) => {
  return request({
    url: '/api/v1/queryAllLogDetailsData',
    method: 'get',
    params
  })
}


/**
 * @param {*} params = { }
 * @return {*}
 * @Author: Hisun
 * @Date: 2024-02-05 10:55:24
 * @Description: 查询所有访客列表数据
 */
export const getLogDataAllVisitors = (params = {}) => {
  return request({
    url: '/api/v1/queryAllLogData',
    method: 'get',
    params
  })
}
