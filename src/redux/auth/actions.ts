import {
  AuthInfo,
  UserInfo,
  AuthAction,
  AuthThunk,
  SET_USER_INFO,
  SET_SUBMITTING,
  SET_SUBMITTED,
  SET_TOKEN,
  Token,
  FormState,
  SET_FORM_STATE
} from './types'

const setUserInfo = (userInfo: UserInfo): AuthAction => ({
  type: SET_USER_INFO,
  payload: userInfo
})

const setSubmitting = (): AuthAction => ({
  type: SET_SUBMITTING
})

const setSubmitted = (): AuthAction => ({
  type: SET_SUBMITTED
})

const setToken = (token: Token): AuthAction => ({
  type: SET_TOKEN,
  payload: token
})

export const setFormState = (formState: FormState): AuthAction => ({
  type: SET_FORM_STATE,
  payload: formState
})

export const logout = (token: Token): AuthAction => ({
  type: SET_TOKEN,
  payload: token
})

export const thunkSignIn = (userInfo: AuthInfo): AuthThunk<Promise<string>> =>
  async (dispatch, getState, api) => {
    dispatch(setSubmitting())
    let error = ''
    await api.authApi.signIn(userInfo).then(result => {
      dispatch(setUserInfo({
        id: result.fetched.id,
        username: result.fetched.username
      }))
      dispatch(setToken({ value: result.fetched.token }))
    }).catch(errMsg => {
      error = errMsg
    })
    .finally(() => {
      dispatch(setSubmitted())
    })

    return Promise.resolve(error)
  }

export const thunkSignUp = (userInfo: AuthInfo): AuthThunk<Promise<any>> =>
  async (dispatch, getState, api) => {
    dispatch(setSubmitting())
    let error = ''

    await api.authApi.signUp(userInfo).then(() => {
      dispatch(setSubmitted())
    }).catch(errMsg => {
      error = errMsg
    }).finally(() => {
      dispatch(setSubmitted())
    })

    return Promise.resolve(error)
  }

export const thunkSignInByToken = (token: string): AuthThunk<Promise<any>> =>
  async (dispatch, getState, api) => {
    dispatch(setSubmitting())
    let error = ''
    await api.authApi.signInByToken(token).then(result => {
      dispatch(setUserInfo({
        id: result.fetched.id,
        username: result.fetched.username
      }))
      dispatch(setToken({ value: result.fetched.token }))
    }).catch(errMsg => {
      error = errMsg
    })
    .finally(() => {
      dispatch(setSubmitted())
    })

    return Promise.resolve(error)
  }
