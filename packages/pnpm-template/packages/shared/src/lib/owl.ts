import { AxiosRequestConfig } from 'axios'
/**
 * 设置UnionId
 * @param unionId 用户标识
 */
export const setOwlUnionId = (unionId: string | number) => {
  if (!unionId || !window.Owl) return
  window.Owl?.setDimension({
    unionId,
  })
}

/**
 * 上报业务接口异常
 * @param config 接口配置
 * @param res 接口返回值
 */
export const reportOwlApiError = (
  config: AxiosRequestConfig,
  res: {
    code: string | number
    msg: string
    data?: any
  },
) => {
  if (!config || !res || !window.Owl) return
  const { url = 'url获取失败', method, data, params } = config
  const { code, msg } = res

  window.Owl?.addError(url, {
    category: 'customError',
    level: 'error',
    tags: { type: 'API_ERROR', method, data, params, code, msg },
  })
}
