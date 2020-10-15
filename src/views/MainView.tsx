import React from 'react'
import styled from 'styled-components'
import { Layout } from 'antd'

import AsideMenu from '../components/MainView/AsideMenu'
import menuRoutes from '../data/menu-routes.json'

const { Header, Sider, Content } = Layout

const LogoWrapper = styled.div`
  display: flex;
  height: 83px;
  align-items: center;
  justify-content: center;
  background-color: #1a2d3f;
`

const MainView = () => {
  return (
    <Layout>
      <Sider width='250' className='layout-aside'>
        <LogoWrapper>Logo</LogoWrapper>
        <AsideMenu menuRoutes={menuRoutes}/>
      </Sider>
      <Layout className='layout-main'>
        <Header className='layout-header'>
          头部
        </Header>
        <Content className='layout-content'>主体内容</Content>
      </Layout>
    </Layout>
  )
}

export default MainView
