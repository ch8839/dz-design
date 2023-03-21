declare global {
  function LXAnalytics(type: 'pageView', valLab: any, environment: any, cid: string): void
  function LXAnalytics(
    type: 'moduleClick' | 'moduleView',
    bid: string,
    valLab: any,
    options: any,
  ): void
}

export {}
