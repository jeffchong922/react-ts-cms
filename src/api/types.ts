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

// position module start
export interface NewPosition {
  name: string
  departmentId: string
  status: boolean
  introduction: string
}

export interface AddPositionResult {
  id: string
}

export interface FetchPositions {
  id?: string
  searchName?: string
  departmentIds?: string[]
}

export interface FetchPositionsResult {
  fetched: {
    list: Array<{
      id: string
      name: string
      introduction: string
      status: boolean
      departmentInfo: {
        id: string
        name: string
      }
    }>
    total: number
  }
}

export type UpdatePosition = {
  [key in keyof NewPosition]?: NewPosition[key]
} & {
  id: string
}
// position module end