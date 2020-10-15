import React from 'react'
import { Route, Switch } from 'react-router-dom'
import AuthView from '../views/AuthView'
import FOFView from '../views/FOFView'
import MainView from '../views/MainView'

import GreetView from '../views/GreetView'

import PrivateRoute from '../components/PrivateRoute'
import token from '../helpers/token'

const routes = (
  <Switch>
    {/* <Route exact path='/' component={MainView}/> */}
    <PrivateRoute exact path='/' isAuthenticated={token.getToken() ? true : false}>
      <MainView>
        <Switch>
          <Route component={GreetView}/>
        </Switch>
      </MainView>
    </PrivateRoute>
    <Route path='/auth' component={AuthView}/>
    <Route component={FOFView} />
  </Switch>
)

export default routes