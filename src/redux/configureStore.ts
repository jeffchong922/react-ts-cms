import { createStore, compose, applyMiddleware } from 'redux'

import rootReducer from './reducers'

export default function configureStore (preloadedState?: any) {
  const composeEnhancer: typeof compose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const store = createStore(
    rootReducer,
    preloadedState,
    composeEnhancer(
      applyMiddleware(
        /* middleware */
      )
    )
  )

  return store
}