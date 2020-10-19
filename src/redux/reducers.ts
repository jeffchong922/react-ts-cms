import { combineReducers } from 'redux'

import authReducer from './auth/reducer'
import departmentReducer from './department/reducer'

const rootReducer = combineReducers({
  auth: authReducer,
  department: departmentReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer