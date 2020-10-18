import React from 'react'
import styled from 'styled-components'
import { Layout } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import AsideMenu from '../components/MainView/AsideMenu'
import menuRoutes from '../data/menu-routes.json'
import useToggle from '../hooks/useToggle'

const { Header, Sider, Content } = Layout

const LogoWrapper = styled.div`
  display: flex;
  height: 83px;
  align-items: center;
  justify-content: center;
  background-color: #1a2d3f;
`

const MainView: React.FC<RouteComponentProps> = ({ children, location: { pathname }, history: { push } }) => {
  const [collapsed, toggleCollapsed] = useToggle(false)

  return (
    <Layout>
      {/* 固定侧边栏 */}
      <Sider trigger={null} collapsible collapsed={collapsed} width='250' className='layout-aside'>
        <LogoWrapper>Logo</LogoWrapper>
        <AsideMenu activeKey={pathname} onItemClick={push} menuRoutes={menuRoutes}/>
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
        </Header>

        {/* 内容 */}
        <Content className='layout-content'>
          {children}
        </Content>

      </Layout>
    </Layout>
  )
}

export default withRouter(MainView)
