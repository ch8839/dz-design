import { SSO } from 'shared/src/lib/sso'
import { isProd } from '@/lib/utils'

const SSOClient = new SSO({
  clientId: isProd ? '123' : '456',
  env: isProd ? 'prod' : 'dev',
  callbackUrl: isProd
    ? 'https://x.sankuai.com/gateway/sso/callback'
    : 'http://x.test.sankuai.com/gw/auth/sso/callback',
})
export const SSOLogin = SSOClient.login.bind(SSOClient)
export const SSOLogout = SSOClient.logout.bind(SSOClient)
