import { AppThunk } from '../thunk-type'
import { NewPosition as ApiNewPosition, FetchPositionsResult } from '../../api/types'

export const SET_POSITION_UPDATING = 'SET_POSITION_UPDATING'
export const SET_POSITION_UPDATED = 'SET_POSITION_UPDATED'
export const SET_POSITION_FETCHING = 'SET_POSITION_FETCHING'
export const SET_POSITION_FETCHED = 'SET_POSITION_FETCHED'
export const SET_SEARCH_DEPARTMENT_IDS = 'SET_SEARCH_DEPARTMENT_IDS'
export const SET_SEARCH_POSITION_NAME = 'SET_SEARCH_POSITION_NAME'
export const SET_POSITION_PAGE_NUMBER = 'SET_POSITION_PAGE_NUMBER'
export const SET_POSITION_PAGE_SIZE = 'SET_POSITION_PAGE_SIZE'
export const SET_FETCHED_POSITION_RESULT = 'SET_FETCHED_POSITION_RESULT'

// type start
export type NewPosition = ApiNewPosition

export type FetchPosition = FetchPositionsResult['fetched']['list']

export interface FetchList {
  list: FetchPosition
  total: number
}
// type end

// actions start
interface SetNewDataSubmittingAction {
  type: typeof SET_POSITION_UPDATING
}
interface SetNewDataSubmittedAction {
  type: typeof SET_POSITION_UPDATED
}

interface SetSearchDepartmentIdsAction {
  type: typeof SET_SEARCH_DEPARTMENT_IDS
  payload: string[]
}
interface SetSearchPositionNameAction {
  type: typeof SET_SEARCH_POSITION_NAME
  payload: string | undefined
}

interface SetPositionFetchingAction {
  type: typeof SET_POSITION_FETCHING
}
interface SetPositionFetchedAction {
  type: typeof SET_POSITION_FETCHED
}

interface SetPositionPageNumberAction {
  type: typeof SET_POSITION_PAGE_NUMBER
  payload: number
}
interface SetPositionPageSizeAction {
  type: typeof SET_POSITION_PAGE_SIZE
  payload: number
}

interface SetPositionFetchResult {
  type: typeof SET_FETCHED_POSITION_RESULT
  payload: FetchList
}
// actions end

export type PositionAction = SetNewDataSubmittingAction | SetNewDataSubmittedAction
  | SetSearchDepartmentIdsAction | SetSearchPositionNameAction
  | SetPositionFetchingAction | SetPositionFetchedAction
  | SetPositionPageNumberAction | SetPositionPageSizeAction
  | SetPositionFetchResult

export type PositionThunk<ReturnType = Promise<string>>
  = AppThunk<PositionAction, ReturnType>

export interface PositionState {
  isUpdating: boolean
  isFetching: boolean
  searchInfo: {
    departmentIds: string[]
    positionName: string | undefined
  }
  fetchedList: FetchList
  listPageNumber: number
  listPageSize: number
  currentPageList: FetchPosition
}