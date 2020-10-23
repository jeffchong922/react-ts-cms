import React, { useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux';
import styled from 'styled-components'
import { Layout, message } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import AsideMenu from '../components/MainView/AsideMenu'
// import menuRoutes from '../data/menu-routes.json'
import { generateRoutes } from '../routes'
import useToggle from '../hooks/useToggle'
import { RootState } from '../redux/reducers';
import { thunkSignInByToken, logout } from '../redux/auth/actions'
import HeaderAvatar from '../components/MainView/HeaderAvatar';

const { Header, Sider, Content } = Layout

const LogoWrapper = styled.div`
  display: flex;
  height: 83px;
  align-items: center;
  justify-content: center;
  background-color: #1a2d3f;
`
const HeaderRightWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`

const mapState = (state: RootState) => ({
  token: state.auth.token,
  isAuth: state.auth.isAuth,
  isAuthSubmitting: state.auth.isSubmitting,
  userInfo: state.auth.userInfo
})
const mapDispatch = {
  logout,
  thunkSignInByToken,
}
const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>

const MainView: React.FC<PropsFromRedux & RouteComponentProps> = (props) => {
  const {
    location: { pathname },
    history: { push },
    token, isAuth, isAuthSubmitting, thunkSignInByToken, logout, userInfo
  } = props

  const [collapsed, toggleCollapsed] = useToggle(false)

  // 主页面登录信息校验，用于刷新页面时数据丢失
  useEffect(() => {
    if (!isAuth && token.value && !isAuthSubmitting) {
      thunkSignInByToken(token.value)
        .then(errMsg => {
          if (errMsg) {
            message.error('请重新登录, 错误: ' + errMsg)
            logout()
            push('/auth')
          }
        })
    }
  }, [isAuth, token.value, thunkSignInByToken, logout, push, isAuthSubmitting])

  return (
    <Layout>
      {/* 固定侧边栏 */}
      <Sider trigger={null} collapsible collapsed={collapsed} width='250' className='layout-aside'>
        <LogoWrapper>Logo</LogoWrapper>
        <AsideMenu activeKey={pathname} onItemClick={push} menuRoutes={
          userInfo
            ? userInfo.userMenu
            : []
        }/>
      </Sider>

      {/* 主体 */}
      <Layout className={`layout-main ${collapsed ? 'is-collapsed' : ''}`}>

        {/* 固定头部 */}
        <Header className={`layout-header ${collapsed ? 'is-collapsed' : ''}`}>
          {
            React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'layout-menu-trigger',
              onClick: toggleCollapsed
            })
          }
          <HeaderRightWrapper>
            <HeaderAvatar/>
          </HeaderRightWrapper>
        </Header>

        {/* 内容 */}
        <Content className='layout-content'>
          {/* {children} */}
          { userInfo && generateRoutes(userInfo.userMenu)}
        </Content>

      </Layout>
    </Layout>
  )
}

export default withRouter(connector(MainView))
