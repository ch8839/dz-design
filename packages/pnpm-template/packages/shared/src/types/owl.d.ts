declare global {
  interface Window {
    Owl: {
      addError: (
        err: string | object,
        opts?: {
          category?: 'jsError' | 'ajaxError' | 'resourceError' | 'customError'
          level?: 'error' | 'warn' | 'info'
          tags?: Record<string, any>
          combo?: boolean
        },
      ) => void
      setDimension: (config: { unionId: string | number }) => void
    }
  }
}

export {}
