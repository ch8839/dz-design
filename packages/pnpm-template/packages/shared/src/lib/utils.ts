/**
 * 通过url下载文件
 * @param url 文件下载链接
 * @param filename 文件名
 */
export const download = (url: string, filename: string) => {
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
}

/**
 * 获取路由参数
 * @param target 通过Route获取的query值
 */
export const getRouteQueryValue = (target: string | (string | null)[]) => {
  return Array.isArray(target) ? target[0] : target
}

/**
 * 获取每个数组中重复出现的值
 * @param arrs
 */
export const intersectionOfArrays = (arrs: string[][]): string[] => {
  const count = new Map<string, number>()
  // 记录每个数的出现次数（每个数组最多纪录一次）
  arrs.forEach((arr, idx) => {
    arr.forEach(item => {
      const n = Math.min(count.get(item) || 0, +idx)
      count.set(item, n + 1)
    })
  })
  const result: string[] = []
  for (const x of count.keys()) {
    // 某个数出现次数等于数组个数，代表它在所有数组中都出现过
    count.get(x) == arrs.length && result.push(x)
  }
  return result
}
