import { getObjKeys, prop, setProp } from '../../helpers/tools'
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
  SET_LIST_DATA_FETCHED,
  SET_SEARCH_NAME
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

export const setSearchName = (name: string): DepartmentAction => ({
  type: SET_SEARCH_NAME,
  payload: name
})

// 添加部门
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

// 更新部门
export const thunkUpdateDepartment = (department: UpdateDepartment): DepartmentThunk =>
  async (dispatch, getState, api) => {
    dispatch(setNewDataSubmitting())
    
    // 用于更新 redux 列表数据
    const { total, list } = getState().department.departmentList

    let error = ''
    let updated = list

    await api.departmentApi.update(department).then(result => {

      // 更新数据
      updated = list.map(oldDepartment => {
        if (oldDepartment.id === department.id) {
          getObjKeys(department).forEach(key => {
            oldDepartment = setProp(oldDepartment, key, prop(department, key))
          })
        }
        return oldDepartment
      })

    }).catch(errMsg => {
      error = errMsg
    })
    .finally(() => {

      // 提交更改
      dispatch(setPageList({ total, list: updated }))

      dispatch(setNewDataSubmitted())
    })

    return Promise.resolve(error)
  }

// 获取部门
export const thunkFetchDepartment = (department: FetchDepartment = {}): DepartmentThunk =>
  async (dispatch, getState, api) => {

    // 请求参数
    const { listPageNumber, listPageSize, searchName } = getState().department

    // 对应添加部门与部门列表页面
    const isAddView = department.id ? true : false
    isAddView
      ? dispatch(setNewDataSubmitting())
      : dispatch(setListDataFetching())

    let error = ''
    
    await api.departmentApi.fetch({
      id: department.id,
      pageNumber: listPageNumber,
      pageSize: listPageSize,
      searchName
    }).then(result => {
      const { list, total } = result.fetched

      // 对应不同页面
      isAddView
      ? dispatch(setDepartment(list[0]))
      : dispatch(setPageList({
          total: total,
          list
        }))

    }).catch(errMsg => {
      error = errMsg
    })
    .finally(() => {
      dispatch(setNewDataSubmitted())
      dispatch(setListDataFetched())
    })

    return Promise.resolve(error)
  }

// 删除部门
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