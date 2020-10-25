import {
  PositionAction, PositionState,
  SET_POSITION_UPDATED,
  SET_POSITION_UPDATING
} from "./types";

const initialState: PositionState = {
  isUpdating: false
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
    default: return state
  }
}

export default positionReducer