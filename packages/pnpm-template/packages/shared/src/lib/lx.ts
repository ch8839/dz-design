/**
 * 上报pv
 * @param cid 事件标识
 */
export const reportPV = (cid: string, config: Record<string, any> = {}) => {
  const env = {} as Record<string, any>
  if (config.uid) env.uid = config.uid
  window.LXAnalytics(
    'pageView',
    {
      custom: config,
    },
    env,
    cid,
  )
}

/**
 * HOC：上报模块事件
 * @param event 事件名
 * @returns 该事件对应的模块上报函数
 */
const reportModuleEvent =
  (event: 'moduleClick' | 'moduleView') =>
  (bid: string, cid: string, config = {}) => {
    const custom = config
    window.LXAnalytics(event, bid, { custom }, { cid })
  }

/**
 * 上报模块点击事件
 * @param bid 事件标识
 * @param cid 页面标识
 * @param config 自定义配置
 */
export const reportMC = reportModuleEvent('moduleClick')

/**
 * 上报模块可见事件
 * @param bid 事件标识
 * @param cid 页面标识
 * @param config 自定义配置
 */
export const reportMV = reportModuleEvent('moduleView')
