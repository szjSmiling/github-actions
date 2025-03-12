import { AxiosRequestConfig } from 'axios'

/**
 * @description: 自定义状态码配置
 */
export enum ResultCodeEnum {
  FAILED = 0,
  SUCCESS = 1,
  LOGIN_INVALID = 401,
}

/**
 * @description: 常用的contentTyp类型
 */
export enum ContentTypeEnum {
  JSON = 'application/json;charset=UTF-8',
  TEXT = 'text/plain;charset=UTF-8',
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  FORM_DATA = 'multipart/form-data;charset=UTF-8',
}

/**
 * @description: ajax 配置参数类型
 */
export interface IAxiosRequestConfig extends AxiosRequestConfig {
  contentType?: ContentTypeEnum
}

/**
 * @description: 请求返回数据类型
 */
export interface IResponseData<T = any> {
  code?: number
  data?: T
  msg?: string
  list?: T
  caseId?: string
}

/**
 * @description: 状态码对应内容信息
 */
export interface ICodeMessage {
  [key: number]: string
}
