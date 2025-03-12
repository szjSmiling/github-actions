import axios, { AxiosInstance, AxiosPromise, AxiosResponse, Canceler, RawAxiosRequestHeaders } from 'axios'
import type { IResponseData, ICodeMessage, IAxiosRequestConfig } from 'types/request.d.ts'
import qs from 'qs'
import { isFunction } from '@/utils/is.ts'
import { cookieDelToken, cookieGetToken } from '@/utils/cookie.ts'

const antMessage = {
  warning: (msg:string) => {
    console.log('warning: ', msg);
  },
  error: (msg:string) => {
    console.log('error: ', msg);
  },
}

/**
 * @description: 自定义状态码配置
 */
const enum ResultCodeEnum {
  FAILED = 0,
  SUCCESS = 200,
  LOGIN_INVALID = 401,
}

/**
 * @description: 常用的contentTyp类型
 */
const enum ContentTypeEnum {
  JSON = 'application/json',
  TEXT = 'text/plain',
  FORM_URLENCODED = 'application/x-www-form-urlencoded',
  FORM_DATA = 'multipart/form-data',
}

/* ================ 自定义请求消除器 相关 S ======================= */
/**
 * @description: 声明一个 Map 用于存储每个请求的标识 和 取消函数
 */
let requestPendingMap = new Map<string, Canceler>()

/**
 * @description: 序列化配置参数，生成唯一请求标识url
 * @param config 请求配置参数
 * @returns string
 */
export const getRequestPendingUrl = (config: IAxiosRequestConfig) =>
  [config.method, config.url, qs.stringify(config.params)].join('&')

/**
 * @description: 自定义请求消除器类
 */
export class RequestCanceler {
  /**
   * @description: 添加请求
   * @param config 请求配置参数
   * @returns void
   */
  addPending(config: IAxiosRequestConfig) {
    // 在请求开始前，对之前的请求做检查取消操作
    this.removePending(config)
    const url = getRequestPendingUrl(config)
    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken(cancel => {
        if (!requestPendingMap.has(url)) {
          // 如果 pending 中不存在当前请求，则添加进去
          requestPendingMap.set(url, cancel)
        }
      })
  }

  /**
   * @description: 移除请求
   * @param config 请求配置参数
   * @returns void
   */
  removePending(config: IAxiosRequestConfig) {
    const url = getRequestPendingUrl(config)
    if (requestPendingMap.has(url)) {
      // 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
      const cancel = requestPendingMap.get(url)
      cancel && cancel()
      requestPendingMap.delete(url)
    }
  }

  /**
   * @description: 清空所有pending
   * @returns void
   */
  removeAllPending() {
    requestPendingMap.forEach(cancel => {
      cancel && isFunction(cancel) && cancel()
    })
    requestPendingMap.clear()
  }

  /**
   * @description: 重置
   * @returns void
   */
  reset(): void {
    requestPendingMap = new Map<string, Canceler>()
  }
}

/**
 * @description: 生成请求消除器
 */
export const requestCanceler = new RequestCanceler()

/* ================ 自定义请求类 相关 S ======================= */
/**
 * @description: 自定义状态码对应内容信息
 */
const customCodeMessage: ICodeMessage = {
  [ResultCodeEnum.LOGIN_INVALID]: '当前用户登入信息已失效，请重新登入再操作',
}

/**
 * @description: 定义服务端状态码对应内容信息
 */
const serverCodeMessage: ICodeMessage = {
  200: 'OK',
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  500: '服务器发生错误，请检查服务器(Internal Server Error)',
  502: '网关错误(Bad Gateway)',
  503: '服务不可用，服务器暂时过载或维护(Service Unavailable)',
  504: '网关超时(Gateway Timeout)',
}

// 日志api不需要错误捕捉提示
const logApiList = [
  '/api/v5/loginRecord',
  '/api/v5/readRecord',
  '/api/v5/readRecordReadTime',
]

/**
 * @description: 异常处理程序
 * @returns Promise
 */
const errorHandler = async (error: any, config: any) => {
  const { response, message } = error
  if (!logApiList.includes(config.url)) {
    if (message === 'CustomError') {
      // 自定义错误
      const { data } = response
      const { code, msg, message: msg2 } = data
      if (+code === ResultCodeEnum.LOGIN_INVALID) {
        antMessage.warning(customCodeMessage[code] || msg || 'Error')
        const redirect = window.encodeURIComponent(window.location.href)
        // router.push(`/login?redirect=${redirect}`)
        // 清除token
        // store.dispatch('app/clearToken')
        location.reload()
      } else {
        const errorText = msg || msg2 || serverCodeMessage[code] || 'Error'
        antMessage.warning(`请求错误: ${errorText}`)
      }
    } else if (message === 'canceled') {
      console.log('canceled', error)
    } else if (response && response.status) {
      const errorText = serverCodeMessage[response.status] || response.statusText
      const { status, request } = response
      if (status === 401 || status === 403) {
        // antMessage.warning(`请求错误 ${status}: ${request.responseURL}\n${errorText}`)
        // const redirect = encodeURIComponent(window.location.href)
        // window._HR_router.push(`/login?redirect=${redirect}`)
        antMessage.warning(`用户登录信息已失效, 请重新登录!`)
        cookieDelToken()
        window._HR_router.push(`/login`)
        return Promise.reject(error)
      } else {
        // antMessage.warning(`请求错误 ${status}: ${request.responseURL}\n${errorText}`)
        antMessage.warning(`请求错误, 请检查后重试!`)
      }
    } else if (!response) {
      if (config.url === '/api/permission/getMenuPermissions') {
        // const redirect = window.encodeURIComponent(window.location.href)
        // router.push(`/login?redirect=${redirect}`)
        // 清除token
        // store.dispatch('app/clearToken')
        location.reload()
      } else {
        antMessage.warning('网络异常：您的网络发生异常，无法连接服务器')
      }
    }
  } else {
    // 日志api 未登录报错时需要重新登陆
    const { status, request } = response
    if (status === 401 || status === 403) {
      antMessage.warning(`用户登录信息已失效, 请重新登录!`)
      cookieDelToken()
      window._HR_router.push(`/login`)
    } else {
      return Promise.resolve()
    }
  }
  
  return Promise.reject(error)
}

/**
 * @description: 自定义请求类
 */
export class Request {
  ajax: AxiosInstance
  public constructor(config: IAxiosRequestConfig) {
    // 初始化传参，所以目前 headers 是 RawAxiosRequestHeaders | undefined 类型。
    const { contentType, headers = {}, ...otherConfig } = config || {}

    // 实例化axios，配置请求时的默认参数
    this.ajax = axios.create({
      ...otherConfig,
      headers: {
        ...(headers as RawAxiosRequestHeaders),
        'content-type': contentType || ContentTypeEnum.JSON,
      },
    })

    /**
     * @description: 请求前, 请求拦截器
     */
    this.ajax.interceptors.request.use(axiosConfig => {
      // 将当前请求添加到请求消除器 pending 中
      requestCanceler.addPending(axiosConfig)

      // 自定义添加token header
      const authorization = cookieGetToken()
      if (authorization) {
        // axios 已经运行起来了，所以 headers 现在已经是 AxiosHeaders 类型了，所以不能当做json类型
        if (typeof axiosConfig.headers?.set === 'function') {
          axiosConfig.headers?.set('Authorization', authorization)
        }
      }

      return axiosConfig
    })

    /**
     * @description: 请求后, 响应拦截器
     */
    this.ajax.interceptors.response.use(
      (response: AxiosResponse<IResponseData>) => {
        // 在请求结束后，移除本次请求
        requestCanceler.removePending(response.config)
        const res = response.data
        const { code } = res

        if (code !== ResultCodeEnum.SUCCESS) {
          return Promise.reject({
            response,
            message: 'CustomError',
          })
        }

        return response
      }
      /* , error => {} */ // 已在 export default catch
    )
  }

  /**
   * @description: 请求方法
   * @param config 请求参数
   * @returns AxiosPromise
   */
  all<T = any, R = AxiosResponse<T>>(config: IAxiosRequestConfig): AxiosPromise<R> {
    const { contentType, headers = {}, ...otherConfig } = config || {}

    return this.ajax({
      ...otherConfig,
      headers: {
        ...(headers as RawAxiosRequestHeaders),
        'content-type': contentType || 'application/json',
      },
    })
      .then((response: AxiosResponse) => response.data)
      .catch((error: any) => errorHandler(error, config))
  }
}

/**
 * @description: 生成统一公共请求
 */
const ask = new Request({
  withCredentials: true, // 当跨域请求时发送cookie
  timeout: 0, // 请求超时时间,5000(单位毫秒) / 0 不做限制
})

/**
 * @description: 导出 request 方法
 * @param config IAxiosRequestConfig 请求参数
 * @returns AxiosPromise
 */
export default function request<T = any>(config: IAxiosRequestConfig): AxiosPromise<AxiosResponse<T>> {
  return ask.all<T>(config)
}
