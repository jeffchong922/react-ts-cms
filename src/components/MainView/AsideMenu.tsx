import React from 'react'
import { Menu } from 'antd'

interface MenuRoute {
  key: string;
  title: string;
  child?: Array<MenuRoute>
}

function renderMenuItem ({ key, title }: MenuRoute) {
  return <Menu.Item key={key}>{title}</Menu.Item>
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

interface AsideMenuProps {
  menuRoutes: Array<MenuRoute>
}
const AsideMenu: React.FC<AsideMenuProps> = ({ menuRoutes }) => {
  return (
    <Menu theme="dark" mode="inline">
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

export default AsideMenu
