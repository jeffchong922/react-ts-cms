import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'

interface PrivateRouteProps extends RouteProps {
  isAuthenticated: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({children, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={
      () => isAuthenticated
        ? (children)
        : (
            <Redirect to={{
              pathname: '/auth'
            }}/>
          )
    }
  />
)

export default PrivateRoute