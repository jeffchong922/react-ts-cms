// auth
export interface UserInfo {
  username: string
  password: string
}

export interface UserMenuItem {
  icon: string
  title: string
  component: string
  key: string
  child?: UserMenuItem[]
}

export interface SignInResult {
  fetched: {
    token: string
    id: string
    username: string
    userMenu: UserMenuItem[]
  }
}

export interface SignUpResult {
  registered: {
    id: string
    username: string
  }
}