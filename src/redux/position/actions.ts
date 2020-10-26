import { getObjKeys, prop, setProp } from "../../helpers/tools";
import {
  PositionAction,
  PositionThunk,
  NewPosition,
  SET_POSITION_UPDATED,
  SET_POSITION_UPDATING,
  SET_SEARCH_DEPARTMENT_IDS,
  SET_SEARCH_POSITION_NAME,
  SET_POSITION_FETCHING,
  SET_POSITION_FETCHED,
  SET_POSITION_PAGE_NUMBER,
  SET_POSITION_PAGE_SIZE,
  SET_FETCHED_POSITION_RESULT,
  FetchList,
  PositionInfo,
  SET_POSITION_INFO_BY_ID,
  UpdatePosition
} from "./types";

const setPositionUpdating = (): PositionAction => ({
  type: SET_POSITION_UPDATING
})
const setPositionUpdated = (): PositionAction => ({
  type: SET_POSITION_UPDATED
})

const setPositionFetching = (): PositionAction => ({
  type: SET_POSITION_FETCHING
})
const setPositionFetched = (): PositionAction => ({
  type: SET_POSITION_FETCHED
})

const setFetchList = (result: FetchList): PositionAction => ({
  type: SET_FETCHED_POSITION_RESULT,
  payload: result
})

export const setSearchDepartmentIds = (ids: string[]): PositionAction => ({
  type: SET_SEARCH_DEPARTMENT_IDS,
  payload: ids
})
export const setSearchPositionName = (name: string): PositionAction => ({
  type: SET_SEARCH_POSITION_NAME,
  payload: name
})

export const setPositionByIdInfo = (info: PositionInfo | null): PositionAction => ({
  type: SET_POSITION_INFO_BY_ID,
  payload: info
})

export const setPageNumber = (number: number): PositionAction => ({
  type: SET_POSITION_PAGE_NUMBER,
  payload: number
})
export const setPageSize = (number: number): PositionAction => ({
  type: SET_POSITION_PAGE_SIZE,
  payload: number
})

export const thunkNewPosition = (position: NewPosition): PositionThunk =>
  async (dispatch, getState, api) => {
    let error = ''
    dispatch(setPositionUpdating())

    await api.positionApi.add(position).then(result => {
      // TODO
    }).catch(errMsg => {
      error = errMsg
    }).finally(() => {
      dispatch(setPositionUpdated())
    })

    return error
  }

export const thunkFetchPositions = ({ id }: { id?: string } = {}): PositionThunk =>
  async (dispatch, getState, api) => {
    let error = ''
    if (!id) {
      dispatch(setPositionFetching())
    } else {
      dispatch(setPositionUpdating())
    }

    const { positionName, departmentIds } = getState().position.searchInfo

    await api.positionApi.fetch({
      id,
      searchName: positionName,
      departmentIds
    }).then(result => {
      if (!id) {
        dispatch(setFetchList(result.fetched))
      } else {
        dispatch(setPositionByIdInfo(
          result.fetched.total !== 0
            ? result.fetched.list[0]
            : null
        ))
      }
    }).catch(errMsg => {
      error = errMsg
    }).finally(() => {
      dispatch(setPositionFetched())
      dispatch(setPositionUpdated())
    })

    return error
  }

export const thunkUpdatePosition = (updateInfo: UpdatePosition): PositionThunk =>
  async (dispatch, getState, api) => {
    dispatch(setPositionUpdating())
    
    // 用于更新 redux 列表数据
    const { total, list } = getState().position.fetchedList

    let error = ''
    let updated = list

    await api.positionApi.update(updateInfo).then(result => {

      // 更新数据
      updated = list.map(oldData => {
        if (oldData.id === updateInfo.id) {
          getObjKeys(updateInfo).forEach(key => {
            if (key !== 'departmentId') {
              oldData = setProp(oldData, key, prop(updateInfo, key))
            }
          })
        }
        return oldData
      })

    }).catch(errMsg => {
      error = errMsg
    })
    .finally(() => {

      // 提交更改
      dispatch(setFetchList({ total, list: updated }))

      dispatch(setPositionUpdated())
    })

    return error
  }