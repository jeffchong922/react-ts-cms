import React from 'react'
import styled from 'styled-components'
import { Layout, Menu } from 'antd'
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UserOutlined,
  UploadOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';

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
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            nav 1
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            nav 2
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            nav 3
          </Menu.Item>
          <Menu.Item key="4" icon={<BarChartOutlined />}>
            nav 4
          </Menu.Item>
          <Menu.Item key="5" icon={<CloudOutlined />}>
            nav 5
          </Menu.Item>
          <Menu.Item key="6" icon={<AppstoreOutlined />}>
            nav 6
          </Menu.Item>
          <Menu.Item key="7" icon={<TeamOutlined />}>
            nav 7
          </Menu.Item>
          <Menu.Item key="8" icon={<ShopOutlined />}>
            nav 8
          </Menu.Item>
        </Menu>
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
