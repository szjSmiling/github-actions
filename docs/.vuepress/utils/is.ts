/**
 * @description: 判断值是否未某个类型
 */
export function is(val: unknown, type: string) {
  return Object.prototype.toString.call(val) === `[object ${type}]`
}

/**
 * @description:  是否为函数
 */
export function isFunction<T = Function>(val: unknown): val is T {
  return is(val, 'Function')
}

/**
 * @description: 是否已定义
 */
export const isDef = <T = unknown>(val?: T): val is T => {
  return typeof val !== 'undefined'
}

export const isUnDef = <T = unknown>(val?: T): val is T => {
  return !isDef(val)
}

/**
 * @description: 是否为对象
 */
export const isObject = (val: any): val is Record<any, any> => {
  return val !== null && is(val, 'Object')
}

/**
 * @description:  是否为时间
 */
export function isDate(val: unknown): val is Date {
  return is(val, 'Date')
}

/**
 * @description:  是否为数值
 */
export function isNumber(val: unknown): val is number {
  return is(val, 'Number')
}

/**
 * @description:  是否为AsyncFunction
 */
export function isAsyncFunction<T = any>(val: unknown): val is Promise<T> {
  return is(val, 'AsyncFunction')
}

/**
 * @description:  是否为promise
 */
export function isPromise<T = any>(val: unknown): val is Promise<T> {
  return is(val, 'Promise') && isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

/**
 * @description:  是否为字符串
 */
export function isString(val: unknown): val is string {
  return is(val, 'String')
}

/**
 * @description:  是否为boolean类型
 */
export function isBoolean(val: unknown): val is boolean {
  return is(val, 'Boolean')
}

/**
 * @description:  是否为数组
 */
export function isArray(val: any): val is Array<any> {
  return val && Array.isArray(val)
}

/**
 * @description:  是否为null
 */
export function isNull(val: unknown): val is null {
  return val === null
}

export function isJsonStr(val: string): boolean {
  try {
    JSON.parse(val)
    return true
  } catch (error) {
    return false
  }
}

/**
 * @param {string} value
 * @return {*}
 */
export function isValidValue (value: string | undefined | null) {
  if (typeof value === 'undefined' || value === null || value === '' || Number.isNaN(value)) {
    return false; // 无效值
  } else {
    return true; // 有效值
  }
}

/**
 * @description: 判断是否是外链
 * @param {string} path
 * @returns {Boolean}
 */
export const isExternal = (path: string): boolean => /^(https?:|mailto:|tel:)/.test(path)
