import {
  PositionAction,
  PositionThunk,
  NewPosition,
  SET_POSITION_UPDATED,
  SET_POSITION_UPDATING
} from "./types";

const setPositionUpdating = (): PositionAction => ({
  type: SET_POSITION_UPDATING
})
const setPositionUpdated = (): PositionAction => ({
  type: SET_POSITION_UPDATED
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