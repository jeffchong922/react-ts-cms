import React from 'react'
import { Route, Switch } from 'react-router-dom'
import AuthView from '../views/AuthView'
import FOFView from '../views/FOFView'
import MainView from '../views/MainView'

const routes = (
  <Switch>
    <Route exact path='/' component={MainView}/>
    <Route path='/auth' component={AuthView}/>
    <Route component={FOFView} />
  </Switch>
)

export default routes