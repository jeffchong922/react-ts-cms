import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import Token from './token'

interface IClient extends AxiosInstance {
  postWithToken: <T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<R>
}

interface IClientMap {
  [index: string]: IClient
}
const clientMap: IClientMap = {}

interface IMakeRequestClient {
  baseURL: string
}
function makeRequestClient ({ baseURL }: IMakeRequestClient) {
  if (!clientMap[baseURL]) {
    console.log(`创建新的请求客户端, 基础地址: ${baseURL}`)
    const client = axios.create({
      baseURL
    }) as IClient

    client.postWithToken = function (url: string, data = null, config?: AxiosRequestConfig) {
      if (config) {
        config.headers = Object.assign({}, config.headers, { Authorization: `Bearer ${Token.getToken()}` })
      }
      else {
        config = {
          headers: {
            Authorization: `Bearer ${Token.getToken()}`
          }
        }
      }
      return this.post(url, data, config)
    }
    
    clientMap[baseURL] = client as IClient
  }
  return clientMap[baseURL]
}

export function requestRejected (beforeTodo = (() => {})) {
  return function appliedRequestRejected ({ message, response }: AxiosError) {
    beforeTodo()

    let errorMsg: string
    if (response) {
      // 接口错误数据获取
      errorMsg = response.data.error || `${response.config.url} 接口请求失败`
    } else {
      errorMsg = message
    }
    throw errorMsg
  }
}

export default makeRequestClient