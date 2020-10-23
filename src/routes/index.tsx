import React, { Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import AuthView from '../views/AuthView'
import MainView from '../views/MainView'

import PrivateRoute from '../components/PrivateRoute'
import SimpleLoading from '../components/SimpleLoading'

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

const routes = (
  <Switch>
    <PrivateRoute path='/auth' redirectPath='/' isRenderWithToken={false}>
      <AuthView/>
    </PrivateRoute>
    <PrivateRoute path='/' redirectPath='/auth' isRenderWithToken={true}>
      <MainView>
        <Suspense fallback={<SimpleLoading/>}>
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
        </Suspense>
      </MainView>
    </PrivateRoute>
  </Switch>
)

export default routes