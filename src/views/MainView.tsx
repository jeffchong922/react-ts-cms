import React from 'react'
import styled from 'styled-components'
import { Layout } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';

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

const MainView: React.FC = ({ children }) => {
  const [collapsed, toggleCollapsed] = useToggle(false)

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} width='250' className='layout-aside'>
        <LogoWrapper>Logo</LogoWrapper>
        <AsideMenu menuRoutes={menuRoutes}/>
      </Sider>
      <Layout className={`layout-main ${collapsed ? 'is-collapsed' : ''}`}>
        <Header className='layout-header'>
          {
            React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'layout-menu-trigger',
              onClick: toggleCollapsed
            })
          }
        </Header>
        <Content className='layout-content'>
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainView
