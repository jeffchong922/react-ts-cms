import makeRequestClient, { requestRejected } from "../helpers/request";

const url = process.env.REACT_APP_AUTH_BASE_URL || 'http://localhost:8090'

const client = makeRequestClient({ baseURL: url })

export interface IUserInfo {
  username: string;
  password: string;
}
interface IRegisteredInfo {
  id: string;
  username: string;
}
export interface ISignInResult {
  fetched: {
    token: string;
    id: string;
    username: string;
  }
}
export interface ISignUpResult {
  registered: IRegisteredInfo
}
export default Object.freeze({
  signIn (userInfo: IUserInfo) {
    return client.post<ISignInResult>('/sign-in', userInfo)
      .then(res => res.data, requestRejected())
  },
  signUp (userInfo: IUserInfo) {
    return client.post<ISignUpResult>('/sign-up', userInfo)
      .then(res => res.data, requestRejected())
  },
  signInByToken (token: string) {
    return client.post<ISignInResult>('/sign-in', {
      token
    }).then(res => res.data, requestRejected())
  }
})