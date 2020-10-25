import {
  PositionAction, PositionState,
  SET_POSITION_FETCHED,
  SET_POSITION_FETCHING,
  SET_POSITION_UPDATED,
  SET_POSITION_UPDATING,
  SET_SEARCH_DEPARTMENT_IDS,
  SET_SEARCH_POSITION_NAME
} from "./types";

const initialState: PositionState = {
  isUpdating: false,
  isFetching: false,
  searchInfo: {
    departmentIds: [],
    positionName: undefined
  }
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
    default: return state
  }
}

export default positionReducer