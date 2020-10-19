import {
  DepartmentAction,
  DepartmentState,
  SET_DEPART_INFO,
  SET_NEW_DATA_SUBMITTED,
  SET_NEW_DATA_SUBMITTING
} from "./types";

const initialState: DepartmentState = {
  isNewDataSubmitting: false,
  departmentInfo: null,
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
    case SET_DEPART_INFO: {
      const departmentInfo = action.payload
      return {
        ...state,
        departmentInfo
      }
    }
    default: return state
  }
}

export default departmentReducer