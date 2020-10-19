import { Action } from "redux"
import { ThunkAction } from "redux-thunk"

import { RootState } from "./reducers"
import { ApiGroup } from '../api'

export type AppThunk<A extends Action, ReturnType = void> = ThunkAction<ReturnType, RootState, ApiGroup, A>