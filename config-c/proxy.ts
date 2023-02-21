import type { ProxyOptions } from 'vite'

/**
 * 跨域配置,网络代理
 * VITE_HTTP_PROXY  是否开启代理
 * VITE_BASE_URL    代理的http
 * VITE_PROXY_NAME  代理的名称
 */
const createProxyConfig = (config: Record<string, string>) => {
  const { VITE_HTTP_PROXY, VITE_BASE_URL, VITE_PROXY_NAME } = config
  const isOpenProxy = VITE_HTTP_PROXY === 'true'
  const envConfig = { api: VITE_BASE_URL, proxyName: VITE_PROXY_NAME }

  if (!isOpenProxy) return undefined
  const proxy: Record<string, string | ProxyOptions> = {
    [envConfig.proxyName]: {
      target: envConfig.api,
      changeOrigin: true,
      rewrite: (path) => path.replace(new RegExp(`^${envConfig.proxyName}`), '')
    }
  }
  return proxy
}

export default createProxyConfig
