import React, { Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import AuthView from '../views/AuthView'
import MainView from '../views/MainView'

import PrivateRoute from '../components/PrivateRoute'
import SimpleLoading from '../components/SimpleLoading'
import { prop } from '../helpers/tools'

const LazyComponents = {
  GreetView: React.lazy(() => import('../views/GreetView')),
  DashboardView: React.lazy(() => import('../views/DashboardView')),
  UserAddView: React.lazy(() => import('../views/user/AddView')),
  UserListView: React.lazy(() => import('../views/user/ListView')),
  DepartmentAddView: React.lazy(() => import('../views/department/AddView')),
  DepartmentListView: React.lazy(() => import('../views/department/ListView')),
  TakeOffView: React.lazy(() => import('../views/TakeOffView')),
  OvertimeView: React.lazy(() => import('../views/OvertimeView')),
}

export type LazyComponentsKeys = keyof typeof LazyComponents

interface NestRoute {
  component?: string
  key: string
  child?: NestRoute[]
}
export function generateRoutes (routes: NestRoute[]) {
  // console.log(routes.reduce<Array<JSX.Element>>(routesReducer, []))
  return(
    <Suspense fallback={<SimpleLoading/>}>
      <Switch>
        {
          routes.reduce<Array<JSX.Element>>(routesReducer, [])
        }
        <Route component={LazyComponents.GreetView}/>
      </Switch>
    </Suspense>
  )
}
function routesReducer (list: JSX.Element[], route: NestRoute) {
  if (route.component && (route.component in LazyComponents)) {
    list.push(<Route key={route.key} path={route.key} component={prop(LazyComponents, route.component as LazyComponentsKeys)}/>)
  }
  else if (route.child && route.child.length) {
    const result = route.child.reduce<Array<JSX.Element>>(routesReducer, [])
    list = list.concat(result)
  }
  return list
}

const routes = (
  <Switch>
    <PrivateRoute path='/auth' redirectPath='/' isRenderWithToken={false}>
      <AuthView/>
    </PrivateRoute>
    <PrivateRoute path='/' redirectPath='/auth' isRenderWithToken={true}>
      <MainView>
        {/* <Suspense fallback={<SimpleLoading/>}>
          <Switch>
            <Route path='/dashboard' component={LazyComponents.DashboardView}/>
            <Route path='/user/add' component={LazyComponents.UserAddView} />
            <Route path='/user/list' component={LazyComponents.UserListView} />
            <Route path='/department/add' component={LazyComponents.DepartmentAddView} />
            <Route path='/department/list' component={LazyComponents.DepartmentListView} />
            <Route path='/take-off' component={LazyComponents.TakeOffView} />
            <Route path='/overtime' component={LazyComponents.OvertimeView} />
            <Route component={LazyComponents.GreetView}/>
          </Switch>
        </Suspense> */}
      </MainView>
    </PrivateRoute>
  </Switch>
)

export default routes