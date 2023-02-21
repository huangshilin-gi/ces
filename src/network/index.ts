import RequestFn from './request'
import baseURL from './config'

const requestFn = new RequestFn({
  baseURL,
  timeout: 30000,
  intercept: {
    requestInterceptor: (config) => {
      console.log(config)
      return config
    },
    requestInterceptorCatch: (err) => {
      return err
    },
    responseInterceotor: (res) => {
      return res
    },
    resopnseInterceotorCatch: (err) => {
      return err
    }
  }
})

export default requestFn
