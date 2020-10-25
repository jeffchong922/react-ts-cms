import { AppThunk } from '../thunk-type'
import { NewPosition as ApiNewPosition } from '../../api/types'

export const SET_POSITION_UPDATING = 'SET_POSITION_UPDATING'
export const SET_POSITION_UPDATED = 'SET_POSITION_UPDATED'

// type start
export type NewPosition = ApiNewPosition
// type end

// actions start
interface SetNewDataSubmittingAction {
  type: typeof SET_POSITION_UPDATING
}
interface SetNewDataSubmittedAction {
  type: typeof SET_POSITION_UPDATED
}
// actions end

export type PositionAction = SetNewDataSubmittingAction | SetNewDataSubmittedAction

export type PositionThunk<ReturnType = Promise<string>>
  = AppThunk<PositionAction, ReturnType>

export interface PositionState {
  isUpdating: boolean
}