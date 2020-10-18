import React from 'react'
import { Route, Switch } from 'react-router-dom'
import AuthView from '../views/AuthView'
import MainView from '../views/MainView'

import GreetView from '../views/GreetView'
import DashboardView from '../views/DashboardView'
import UserAddView from '../views/user/AddView'
import UserListView from '../views/user/ListView'
import DepartmentAddView from '../views/department/AddView'
import DepartmentListView from '../views/department/ListView'
import TakeOffView from '../views/TakeOffView'
import OvertimeView from '../views/OvertimeView'

import PrivateRoute from '../components/PrivateRoute'
import token from '../helpers/token'

function hasToken () {
  return token.getToken()
    ? true
    : false
}

const routes = (
  <Switch>
    <PrivateRoute path='/auth' redirectPath='/' isRenderChild={!hasToken()}>
      <AuthView/>
    </PrivateRoute>
    <PrivateRoute path='/' redirectPath='/auth' isRenderChild={hasToken()}>
      <MainView>
        <Switch>
          <Route path='/dashboard'><DashboardView/></Route>
          <Route path='/user/add' component={UserAddView} />
          <Route path='/user/list' component={UserListView} />
          <Route path='/department/add' component={DepartmentAddView} />
          <Route path='/department/list' component={DepartmentListView} />
          <Route path='/take-off' component={TakeOffView} />
          <Route path='/overtime' component={OvertimeView} />
          <Route component={GreetView}/>
        </Switch>
      </MainView>
    </PrivateRoute>
  </Switch>
)

export default routes