import {
  DepartmentThunk,
  DepartmentAction,
  NewDepartment,
  UpdateDepartment,
  FetchDepartment,
  SET_NEW_DATA_SUBMITTING,
  SET_NEW_DATA_SUBMITTED,
  SET_DEPARTMENT_INFO,
  Department,
  DeleteDepartment,
  SET_DELETE_DEPARTMENT,
  SET_PAGE_SIZE,
  SET_PAGE_NUMBER,
  PageList,
  SET_PAGE_LIST,
  SET_LIST_DATA_FETCHING,
  SET_LIST_DATA_FETCHED
} from './types'

const setNewDataSubmitting = (): DepartmentAction => ({
  type: SET_NEW_DATA_SUBMITTING
})

const setNewDataSubmitted = (): DepartmentAction => ({
  type: SET_NEW_DATA_SUBMITTED
})

const setDepartment = (departInfo: Department): DepartmentAction => ({
  type: SET_DEPARTMENT_INFO,
  payload: departInfo
})

const setPageList = (departments: PageList): DepartmentAction => ({
  type: SET_PAGE_LIST,
  payload: departments
})

const setListDataFetching = (): DepartmentAction => ({
  type: SET_LIST_DATA_FETCHING
})

const setListDataFetched = (): DepartmentAction => ({
  type: SET_LIST_DATA_FETCHED
})

export const setDeleteDepartment = (departments: DeleteDepartment): DepartmentAction => ({
  type: SET_DELETE_DEPARTMENT,
  payload: departments
})

export const setPageSize = (size: number): DepartmentAction => ({
  type: SET_PAGE_SIZE,
  payload: size
})

export const setPageNumber = (number: number): DepartmentAction => ({
  type: SET_PAGE_NUMBER,
  payload: number
})

export const thunkNewDepartment = (department: NewDepartment): DepartmentThunk =>
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

export const thunkUpdateDepartment = (department: UpdateDepartment): DepartmentThunk =>
  async (dispatch, getState, api) => {
    dispatch(setNewDataSubmitting())
    
    const { total, list } = getState().department.departmentList
    let error = ''
    let updated: Array<Department> = []
    await api.departmentApi.update(department).then(result => {
      updated = list.map(oldDepartment => {
        if (oldDepartment.id === department.id) {
          oldDepartment.name = typeof department.name === 'undefined' ? oldDepartment.name : department.name
          oldDepartment.status = typeof department.status === 'undefined' ? oldDepartment.status : department.status
          oldDepartment.memberCount = typeof department.memberCount === 'undefined' ? oldDepartment.memberCount : department.memberCount
          oldDepartment.introduction = typeof department.introduction === 'undefined' ? oldDepartment.introduction : department.introduction
        }
        return oldDepartment
      })
    }).catch(errMsg => {
      error = errMsg
    })
    .finally(() => {
      dispatch(setPageList({ total, list: updated }))
      dispatch(setNewDataSubmitted())
    })

    return Promise.resolve(error)
  }

export const thunkFetchDepartment = (department: FetchDepartment = {}): DepartmentThunk =>
  async (dispatch, getState, api) => {
    const pageNumber = getState().department.listPageNumber
    const pageSize = getState().department.listPageSize

    const isAddView = department.id ? true : false
    if (isAddView) {
      dispatch(setNewDataSubmitting())
    } else {
      dispatch(setListDataFetching())
    }

    let error = ''
    await api.departmentApi.fetch({
      id: department.id,
      pageNumber,
      pageSize
    }).then(result => {
      const { list, total } = result.fetched
      if (isAddView) {
        dispatch(setDepartment(list[0]))
      } else {
        dispatch(setPageList({
          total: total,
          list
        }))
      }
    }).catch(errMsg => {
      error = errMsg
    })
    .finally(() => {
      dispatch(setNewDataSubmitted())
      dispatch(setListDataFetched())
    })

    return Promise.resolve(error)
  }

export const thunkDeleteDepartment = (department: DeleteDepartment): DepartmentThunk =>
  async (dispatch, getState, api) => {
    let error = ''
    await api.departmentApi.delete(department).then(result => {
      // TODO
    }).catch(errMsg => {
      error = errMsg
    })

    return Promise.resolve(error)
  }