import { LOGOUT } from "../auth/types";
import {
  PositionAction, PositionState,
  SET_POSITION_FETCHED,
  SET_POSITION_FETCHING,
  SET_POSITION_PAGE_NUMBER,
  SET_POSITION_PAGE_SIZE,
  SET_POSITION_UPDATED,
  SET_POSITION_UPDATING,
  SET_SEARCH_DEPARTMENT_IDS,
  SET_SEARCH_POSITION_NAME,
  SET_FETCHED_POSITION_RESULT,
  SET_POSITION_INFO_BY_ID,
  SET_POSITION_DELETE_ARRAY
} from "./types";

const initialState: PositionState = {
  isUpdating: false,
  isFetching: false,
  searchInfo: {
    departmentIds: [],
    positionName: undefined
  },
  fetchedList: {
    list: [],
    total: 0
  },
  listPageNumber: 1,
  listPageSize: 10,
  currentPageList: [],
  positionInfoById: null,
  deleteArray: []
}

function getPageList<T> (array: T[], pageNumber: number, pageSize: number): T[] {
  return array.slice(pageSize * (pageNumber - 1), pageSize * pageNumber)
}

const positionReducer = (state = initialState, action: PositionAction): PositionState => {
  switch(action.type) {
    case SET_POSITION_UPDATED: return {
      ...state,
      isUpdating: false
    }
    case SET_POSITION_UPDATING: return {
      ...state,
      isUpdating: true
    }
    case SET_POSITION_FETCHED: return {
      ...state,
      isFetching: false
    }
    case SET_POSITION_FETCHING: return {
      ...state,
      isFetching: true
    }
    case SET_SEARCH_DEPARTMENT_IDS: return {
      ...state,
      searchInfo: {
        ...state.searchInfo,
        departmentIds: action.payload
      }
    }
    case SET_SEARCH_POSITION_NAME: return {
      ...state,
      searchInfo: {
        ...state.searchInfo,
        positionName: action.payload
      }
    }
    case SET_POSITION_PAGE_NUMBER: {
      const pageNumber = action.payload
      const pageSize = state.listPageSize
      const currentList = getPageList(state.fetchedList.list, pageNumber, pageSize)
      return {
        ...state,
        currentPageList: currentList,
        listPageNumber: pageNumber
      }
    }
    case SET_POSITION_PAGE_SIZE: {
      const pageNumber = state.listPageNumber
      const pageSize = action.payload
      const currentList = getPageList(state.fetchedList.list, pageNumber, pageSize)
      return {
        ...state,
        currentPageList: currentList,
        listPageSize: pageSize
      }
    }
    case SET_FETCHED_POSITION_RESULT: {
      const pageNumber = state.listPageNumber
      const pageSize = state.listPageSize
      const currentList = getPageList(action.payload.list, pageNumber, pageSize)
      return {
        ...state,
        currentPageList: currentList,
        fetchedList: {
          list: action.payload.list,
          total: action.payload.total
        }
      }
    }
    case SET_POSITION_INFO_BY_ID: return {
      ...state,
      positionInfoById: action.payload
    }
    case SET_POSITION_DELETE_ARRAY: return {
      ...state,
      deleteArray: action.payload
    }
    case LOGOUT: return initialState
    default: return state
  }
}

export default positionReducer