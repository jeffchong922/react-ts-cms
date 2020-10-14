import axios, { AxiosError, AxiosInstance } from 'axios'

interface IClient {
  [index: string]: AxiosInstance
}
const clientMap: IClient = {}

interface IMakeRequestClient {
  baseURL: string
}
function makeRequestClient ({ baseURL }: IMakeRequestClient) {
  if (!clientMap[baseURL]) {
    console.log(`创建新的请求客户端, 基础地址: ${baseURL}`)
    clientMap[baseURL] = axios.create({
      baseURL
    })
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