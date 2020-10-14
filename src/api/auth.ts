import makeRequestClient, { requestRejected } from "../helpers/request";

const url = process.env.REACT_APP_AUTH_BASE_URL || 'http://localhost:8080'

const client = makeRequestClient({ baseURL: url })

interface IUserInfo {
  username: string;
  password: string;
}
export default Object.freeze({
  signIn (userInfo: IUserInfo) {
    return client.post('/sign-in', userInfo)
      .then(res => res.data, requestRejected())
  },
  signUp (userInfo: IUserInfo) {
    return client.post('/sign-up', userInfo)
      .then(res => res.data, requestRejected())
  }
})