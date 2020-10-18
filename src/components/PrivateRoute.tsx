import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'

interface PrivateRouteProps extends RouteProps {
  isRenderChild: boolean;
  redirectPath: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({children, isRenderChild, redirectPath, ...rest }) => (
  <Route
    {...rest}
    render={
      () => isRenderChild
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