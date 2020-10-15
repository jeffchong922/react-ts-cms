import React from 'react'
import { Menu } from 'antd'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'
import * as allIcons from '@ant-design/icons';

interface MenuRoute {
  key: string;
  icon: string;
  title: string;
  child?: Array<MenuRoute>
}

/**
 * 动态生成 icon
 */
function renderIcon (iconName: string) {
  const NewIcon = (allIcons as any)[iconName]
  return React.createElement(NewIcon)
}

function renderMenuItem ({ key, title, icon }: MenuRoute) {
  return <Menu.Item icon={renderIcon(icon)} key={key}><Link to={key}>{title}</Link></Menu.Item>
}

function renderSubMenu ({ key, title, child, icon }: MenuRoute) {
  return (
    <Menu.SubMenu icon={renderIcon(icon)} key={key} title={title}>
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
