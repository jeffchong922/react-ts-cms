import token from "../../helpers/token";
import {
  AuthState,
  AuthAction,
  SET_USER_INFO,
  SET_FORM_STATE,
  SET_SUBMITTED,
  SET_SUBMITTING,
  SET_TOKEN
} from "./types";

const initialState: AuthState = {
  userInfo: null,
  isAuth: false,
  formState: { isLogin: true },
  token: { value: token.getToken() || '' },
  isSubmitting: false
}

const authReducer = (state = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case SET_USER_INFO: {
      const { username, id } = action.payload
      return {
        ...state,
        userInfo: {
          username,
          id
        }
      }
    }
    case SET_FORM_STATE: {
      const { isLogin } = action.payload
      return {
        ...state,
        formState: {
          isLogin
        }
      }
    }
    case SET_TOKEN: {
      const { value } = action.payload
      token.setToken(value)
      return {
        ...state,
        token: {
          value
        },
        isAuth: true
      }
    }
    case SET_SUBMITTED: return {
      ...state,
      isSubmitting: false
    }
    case SET_SUBMITTING: return {
      ...state,
      isSubmitting: true
    }
    default: return state
  }
}

export default authReducer