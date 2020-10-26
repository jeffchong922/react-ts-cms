import { AppThunk } from '../thunk-type'
import { NewDepartment as INewDepartment, UpdateDepartment as IUpdateDepartment, Department as IDepartment, DeleteDepartment as IDeleteDepartment } from '../../api/department'
import { LOGOUT } from '../auth/types'

export const SET_NEW_DATA_SUBMITTING = 'SET_NEW_DATA_SUBMITTING'
export const SET_NEW_DATA_SUBMITTED = 'SET_NEW_DATA_SUBMITTED'
export const SET_NEW_DEPARTMENT_FORM_STATE = 'SET_NEW_DEPARTMENT_FORM_STATE'
export const SET_DEPARTMENT_INFO = 'SET_DEPARTMENT_INFO'
export const SET_DELETE_DEPARTMENT = 'SET_DELETE_DEPARTMENT'
export const SET_PAGE_NUMBER = 'SET_PAGE_NUMBER'
export const SET_PAGE_SIZE = 'SET_PAGE_SIZE'
export const SET_PAGE_LIST = 'SET_PAGE_LIST'
export const SET_LIST_DATA_FETCHING = 'SET_LIST_DATA_FETCHING'
export const SET_LIST_DATA_FETCHED = 'SET_LIST_DATA_FETCHED'
export const SET_SEARCH_NAME = 'SET_SEARCH_NAME'
export const INITIAL_STATE = 'INITIAL_STATE'

// ------------------

export type NewDepartment = INewDepartment
export type UpdateDepartment = IUpdateDepartment
export type FetchDepartment = {
  id?: string
}
export type DeleteDepartment = IDeleteDepartment

export type Department = IDepartment

export interface PageList {
  total: number
  list: Department[]
}

// ------------------

interface SetNewDataSubmittingAction {
  type: typeof SET_NEW_DATA_SUBMITTING
}

interface SetNewDataSubmittedAction {
  type: typeof SET_NEW_DATA_SUBMITTED
}

interface SetDepartInfoAction {
  type: typeof SET_DEPARTMENT_INFO
  payload: Department
}

interface SetDeleteDepartmentAction {
  type: typeof SET_DELETE_DEPARTMENT
  payload: DeleteDepartment
}

interface SetPageNumberAction {
  type: typeof SET_PAGE_NUMBER
  payload: number
}

interface SetPageSizeAction {
  type: typeof SET_PAGE_SIZE
  payload: number
}

interface SetPageListAction {
  type: typeof SET_PAGE_LIST
  payload: PageList
}

interface SetListDataFetchingAction {
  type: typeof SET_LIST_DATA_FETCHING
}

interface SetListDataFetchedAction {
  type: typeof SET_LIST_DATA_FETCHED
}

interface SetSearchNameAction {
  type: typeof SET_SEARCH_NAME
  payload: string
}

interface LogoutAction {
  type: typeof LOGOUT
}

export type DepartmentAction = SetNewDataSubmittingAction | SetNewDataSubmittedAction
  | SetDepartInfoAction | SetDeleteDepartmentAction
  | SetPageNumberAction | SetPageSizeAction | SetPageListAction
  | SetListDataFetchingAction | SetListDataFetchedAction
  | SetSearchNameAction | LogoutAction

export type DepartmentThunk<ReturnType = Promise<string>>
  = AppThunk<DepartmentAction, ReturnType>

export interface DepartmentState {
  isNewDataSubmitting: boolean
  departmentInfo: Department | null
  listPageNumber: number
  listPageSize: number
  isListDataFetching: boolean
  wantToDelete: DeleteDepartment
  departmentList: PageList
  searchName: string
}