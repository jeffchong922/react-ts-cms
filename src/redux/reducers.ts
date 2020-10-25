import { combineReducers } from 'redux'

import authReducer from './auth/reducer'
import departmentReducer from './department/reducer'
import positionReducer from './position/reducer'

const rootReducer = combineReducers({
  auth: authReducer,
  department: departmentReducer,
  position: positionReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer