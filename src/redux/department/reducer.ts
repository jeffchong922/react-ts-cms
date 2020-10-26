import { LOGOUT } from "../auth/types";
import {
  DepartmentAction,
  DepartmentState,
  SET_DELETE_DEPARTMENT,
  SET_DEPARTMENT_INFO,
  SET_LIST_DATA_FETCHED,
  SET_LIST_DATA_FETCHING,
  SET_NEW_DATA_SUBMITTED,
  SET_NEW_DATA_SUBMITTING,
  SET_PAGE_LIST,
  SET_PAGE_NUMBER,
  SET_PAGE_SIZE,
  SET_SEARCH_NAME
} from "./types";

const initialState: DepartmentState = {
  isNewDataSubmitting: false,
  departmentInfo: null,
  listPageNumber: 1,
  listPageSize: 10,
  isListDataFetching: false,
  searchName: '',
  wantToDelete: {
    deleteArray: []
  },
  departmentList: {
    total: 0,
    list: []
  }
}

const departmentReducer = (state = initialState, action: DepartmentAction): DepartmentState => {
  switch (action.type) {
    case SET_NEW_DATA_SUBMITTING: return {
      ...state,
      isNewDataSubmitting: true
    }
    case SET_NEW_DATA_SUBMITTED: return {
      ...state,
      isNewDataSubmitting: false
    }
    case SET_DEPARTMENT_INFO: {
      const departmentInfo = action.payload
      return {
        ...state,
        departmentInfo
      }
    }
    case SET_DELETE_DEPARTMENT: {
      const { deleteArray } = action.payload
      return {
        ...state,
        wantToDelete: {
          deleteArray
        }
      }
    }
    case SET_PAGE_SIZE: return {
      ...state,
      listPageSize: (action.payload > 0 ? action.payload : 10)
    }
    case SET_PAGE_NUMBER: return {
      ...state,
      listPageNumber: (action.payload > 0 ? action.payload : 1)
    }
    case SET_LIST_DATA_FETCHED: return {
      ...state,
      isListDataFetching: false
    }
    case SET_LIST_DATA_FETCHING: return {
      ...state,
      isListDataFetching: true
    }
    case SET_PAGE_LIST: {
      const { total, list } = action.payload
      return {
        ...state,
        departmentList: {
          total,
          list
        }
      }
    }
    case SET_SEARCH_NAME: return {
      ...state,
      searchName: action.payload
    }
    case LOGOUT: return initialState
    default: return state
  }
}

export default departmentReducer