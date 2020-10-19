import {
  DepartmentThunk,
  DepartmentAction,
  NewDepartment,
  UpdateDepartment,
  FetchDepartment,
  SET_NEW_DATA_SUBMITTING,
  SET_NEW_DATA_SUBMITTED,
  SET_DEPART_INFO,
  Department
} from './types'

const setNewDataSubmitting = (): DepartmentAction => ({
  type: SET_NEW_DATA_SUBMITTING
})

const setNewDataSubmitted = (): DepartmentAction => ({
  type: SET_NEW_DATA_SUBMITTED
})

const setDepartment = (departInfo: Department): DepartmentAction => ({
  type: SET_DEPART_INFO,
  payload: departInfo
})

export const thunkNewDepart = (department: NewDepartment): DepartmentThunk =>
  async (dispatch, getState, api) => {
    dispatch(setNewDataSubmitting())
    let error = ''
    await api.departmentApi.add(department).then(result => {
      // TODO
    }).catch(errMsg => {
      error = errMsg
    })
    .finally(() => {
      dispatch(setNewDataSubmitted())
    })

    return Promise.resolve(error)
  }

export const thunkUpdateDepart = (department: UpdateDepartment): DepartmentThunk =>
  async (dispatch, getState, api) => {
    dispatch(setNewDataSubmitting())
    let error = ''
    await api.departmentApi.update(department).then(result => {
      // TODO
    }).catch(errMsg => {
      error = errMsg
    })
    .finally(() => {
      dispatch(setNewDataSubmitted())
    })

    return Promise.resolve(error)
  }

export const thunkFetchDepart = (department: FetchDepartment): DepartmentThunk =>
  async (dispatch, getState, api) => {
    const isAddView = department.id ? true : false
    isAddView && dispatch(setNewDataSubmitting())
    let error = ''
    await api.departmentApi.fetch(department).then(result => {
      const { list } = result.fetched
      isAddView && dispatch(setDepartment(list[0]))
    }).catch(errMsg => {
      error = errMsg
    })
    .finally(() => {
      dispatch(setNewDataSubmitted())
    })

    return Promise.resolve(error)
  }