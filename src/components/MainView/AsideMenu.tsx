import React from 'react'
import { Menu } from 'antd'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'

interface MenuRoute {
  key: string;
  title: string;
  child?: Array<MenuRoute>
}

function renderMenuItem ({ key, title }: MenuRoute) {
  return <Menu.Item key={key}><Link to={key}>{title}</Link></Menu.Item>
}

function renderSubMenu ({ key, title, child }: MenuRoute) {
  return (
    <Menu.SubMenu key={key} title={title}>
      {
        child!.map(route => (
          route.child
            ? renderSubMenu(route)
            : renderMenuItem(route)
        ))
      }
    </Menu.SubMenu> 
  )
}

interface AsideMenuProps extends RouteComponentProps {
  menuRoutes: Array<MenuRoute>
}
const AsideMenu: React.FC<AsideMenuProps> = ({ menuRoutes, location }) => {
  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultOpenKeys={menuRoutes.map(route => route.child ? route.key : '').filter(_ => _)}
      selectedKeys={[location.pathname]}
    >
      {
        menuRoutes.map(route => (
          route.child
            ? renderSubMenu(route)
            : renderMenuItem(route)
        ))
      }
    </Menu>
  )
}

export default withRouter(AsideMenu)
