interface SSOModel {
  login: (redirect: boolean) => void
  logout: (redirect: boolean) => void
}

interface SSOConfig {
  clientId: string
  env: 'prod' | 'dev'
  callbackUrl: string
}

const ssoProdHost = 'https://ssosv.sankuai.com/sson'
const ssoDevHost = 'http://ssosv.it.test.sankuai.com/sson'

export class SSO implements SSOModel {
  private clientId: string
  private ssoHost: string
  private callbackUrl: string

  constructor(configs: SSOConfig) {
    const { clientId, env, callbackUrl } = configs
    this.clientId = clientId
    this.ssoHost = env === 'prod' ? ssoProdHost : ssoDevHost
    this.callbackUrl = callbackUrl
  }

  login(redirect = true) {
    const { href } = window.location
    const redirectUri = encodeURIComponent(
      `${this.callbackUrl}?original-url=${encodeURIComponent(href)}`,
    )
    const targetUrl = `${this.ssoHost}/login?client_id=${this.clientId}&redirect_uri=${redirectUri}`
    window.open(targetUrl, redirect ? '_self' : 'blank')
  }

  logout(redirect = true) {
    const { origin, href } = window.location
    const currentPath = href.replace(new RegExp(`^${origin}`), '')
    const redirectUri = encodeURIComponent(
      `${this.callbackUrl}?original-url=${encodeURIComponent(currentPath)}`,
    )
    const targetUrl = `${this.ssoHost}/logout?client_id=${this.clientId}&redirect_uri=${redirectUri}`
    window.open(targetUrl, redirect ? '_self' : 'blank')
  }
}
