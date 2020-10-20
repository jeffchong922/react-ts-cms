import { IUserInfo } from "../../api/auth"
import { AppThunk } from '../thunk-type'

export const SET_USER_INFO = 'SET_USER_INFO'
export const SET_TOKEN = 'SET_TOKEN'
export const SET_FORM_STATE = 'SET_FORM_STATE'
export const SET_SUBMITTING = 'SET_SUBMITTING'
export const SET_SUBMITTED = 'SET_SUBMITTED'
export const LOGOUT = 'LOGOUT'

// 数据格式
export type AuthInfo = IUserInfo

export interface Token {
  value: string
}

export interface UserInfo {
  id: string
  username: string
}

export interface FormState {
  isLogin: boolean
}

// actions
interface SetUserInfoAction {
  type: typeof SET_USER_INFO
  payload: UserInfo
}

interface SetTokenAction {
  type: typeof SET_TOKEN
  payload: Token
}

interface SetFormStateAction {
  type: typeof SET_FORM_STATE
  payload: FormState
}

interface SetSubmittingAction {
  type: typeof SET_SUBMITTING
}

interface SetSubmittedAction {
  type: typeof SET_SUBMITTED
}

interface LogoutAction {
  type: typeof LOGOUT
}

export type AuthAction = SetUserInfoAction | SetTokenAction | SetFormStateAction
  | SetSubmittedAction | SetSubmittingAction | LogoutAction

export type AuthThunk<ReturnType = void> = AppThunk<AuthAction, ReturnType>

export interface AuthState {
  token: Token
  isAuth: boolean
  isSubmitting: boolean
  formState: FormState
  userInfo: UserInfo | null
}