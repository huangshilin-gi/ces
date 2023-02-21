import requestFn from '../index'
import { T_account } from './type'

enum configApi {
  account = '/web/agent/login'
}

export const accountAdminLogin = (data: T_account) => {
  return requestFn.post({
    url: configApi.account,
    data
  })
}
