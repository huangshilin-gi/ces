const { VITE_HTTP_PROXY, VITE_BASE_URL, VITE_PROXY_NAME } = import.meta.env
let baseURL = ''

if (VITE_HTTP_PROXY === 'true') {
  baseURL = VITE_PROXY_NAME
} else {
  baseURL = VITE_BASE_URL
}

export default baseURL
