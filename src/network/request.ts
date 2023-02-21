import axios, { AxiosResponse, AxiosInstance, AxiosRequestConfig } from 'axios'
import { ElLoading, ElNotification } from 'element-plus'
import { LoadingInstance } from 'element-plus/es/components/loading/src/loading'

//定义拦截器接口
interface requestIntercept<T = AxiosResponse> {
  //请求拦截
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  //响应拦截
  responseInterceotor?: (res: T) => T
  resopnseInterceotorCatch?: (error: any) => any
}

//创建接口继承axios类型
interface requestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  //添加拦截类型
  intercept?: requestIntercept<T>
  showLoading?: Boolean
}

//loading默认状态
const IS_LOADING = true

//封装请求方法
class RequestFn {
  instance: AxiosInstance
  intercept?: requestIntercept
  loading?: LoadingInstance
  showLoading: Boolean
  constructor(config: requestConfig) {
    this.instance = axios.create(config)
    this.intercept = config.intercept
    //创建的请求实例中给loading初始化
    this.showLoading = config.showLoading ?? IS_LOADING
    //全局拦截器
    this.instance.interceptors.request.use(
      (config) => {
        //判断是否需要loading状态
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '加载中..',
            background: 'rgba(0, 0, 0, 0.7)'
          })
        }
        return config
      },
      (err) => {
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        this.loading?.close()
        return res.data
      },
      (err) => {
        this.loading?.close()
        const status = err.response.status
        if (status !== 200) {
          ElNotification({
            title: '系统错误！',
            message: '服务错误,请刷新重试或检查网络。',
            type: 'error'
          })
        }
        return err
      }
    )

    //传入自定义的请求拦截
    this.instance.interceptors.request.use(
      this.intercept?.requestInterceptor,
      this.intercept?.requestInterceptorCatch
    )
    //传入自定义的响应拦截
    this.instance.interceptors.response.use(
      this.intercept?.responseInterceotor,
      this.intercept?.resopnseInterceotorCatch
    )
  }

  request<T = any>(config: requestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      //判断当前请求路径是否需要拦截
      if (config.intercept?.requestInterceptor) {
        //执行拦截，将拦截后的数据重新接收
        config = config.intercept.requestInterceptor(config)
      }
      //判断当前单个请求是否有单独配置loading状态
      if (config.showLoading == !IS_LOADING) {
        this.showLoading = config.showLoading
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          //判断是否需要拦截响应数据
          if (config.intercept?.responseInterceotor) {
            res = config.intercept.responseInterceotor(res)
          }
          this.showLoading = IS_LOADING
          resolve(res)
        })
        .catch((err) => {
          this.showLoading = IS_LOADING
          reject(err)
        })
    })
  }

  get<T = any>(config: requestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = any>(config: requestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T = any>(config: requestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T = any>(config: requestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default RequestFn
