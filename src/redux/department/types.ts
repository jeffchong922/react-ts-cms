import { AppThunk } from '../thunk-type'
import { IFetchDepartments, INewDepartment, IUpdateDepartment, IDepartment } from '../../api/department'

export const SET_NEW_DATA_SUBMITTING = 'SET_NEW_DATA_SUBMITTING'
export const SET_NEW_DATA_SUBMITTED = 'SET_NEW_DATA_SUBMITTED'
export const SET_NEW_DEPART_FORM_STATE = 'SET_NEW_DEPART_FORM_STATE'
export const SET_DEPART_INFO = 'SET_DEPART_INFO'

// ------------------

export type NewDepartment = INewDepartment
export type UpdateDepartment = IUpdateDepartment
export type FetchDepartment = IFetchDepartments

export type Department = IDepartment

// ------------------

interface SetNewDataSubmittingAction {
  type: typeof SET_NEW_DATA_SUBMITTING
}

interface SetNewDataSubmittedAction {
  type: typeof SET_NEW_DATA_SUBMITTED
}

interface SetDepartInfo {
  type: typeof SET_DEPART_INFO
  payload: Department
}

export type DepartmentAction = SetNewDataSubmittingAction | SetNewDataSubmittedAction
  | SetDepartInfo

export type DepartmentThunk<ReturnType = Promise<string>>
  = AppThunk<DepartmentAction, ReturnType>

export interface DepartmentState {
  isNewDataSubmitting: boolean
  departmentInfo: Department | null
  departmentList: {
    total: number
    list: Array<Department>
  }
}