import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'

import Token from '../helpers/token'

interface PrivateRouteProps extends RouteProps {
  redirectPath: string;
  isRenderWithToken: boolean;
}

function shouldRender (isRenderWithToken: boolean) {
  const hasToken = Token.getToken() ? true : false

  return hasToken
    ? isRenderWithToken
      ? true
      : false
    : isRenderWithToken
      ? false
      : true
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({children, isRenderWithToken, redirectPath, ...rest }) => (
  <Route
    {...rest}
    render={
      () => shouldRender(isRenderWithToken)
        ? (children)
        : (
            <Redirect to={{
              pathname: redirectPath
            }}/>
          )
    }
  />
)

export default PrivateRoute