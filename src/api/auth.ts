import makeRequestClient, { requestRejected } from "../helpers/request";

import { SignInResult, UserInfo, SignUpResult } from "./types";

const url = process.env.REACT_APP_AUTH_BASE_URL || 'http://localhost:8090'

const client = makeRequestClient({ baseURL: url })

export default Object.freeze({
  signIn (userInfo: UserInfo) {
    return client.post<SignInResult>('/sign-in', userInfo)
      .then(res => res.data, requestRejected())
  },
  signUp (userInfo: UserInfo) {
    return client.post<SignUpResult>('/sign-up', userInfo)
      .then(res => res.data, requestRejected())
  },
  signInByToken (token: string) {
    return client.post<SignInResult>('/sign-in', {
      token
    }).then(res => res.data, requestRejected())
  }
})