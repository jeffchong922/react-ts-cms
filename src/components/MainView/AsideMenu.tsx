import React from 'react'
import { Menu } from 'antd'
import * as allIcons from '@ant-design/icons';
import { MenuProps } from 'antd/lib/menu';

interface MenuRoute {
  key: string;
  icon: string;
  title: string;
  child?: Array<MenuRoute>
}
type OnItemClick = (key: string) => void

/**
 * 动态生成 icon
 */
function renderIcon (iconName: string) {
  const NewIcon = (allIcons as any)[iconName]
  return React.createElement(NewIcon)
}

function renderMenuItem ({ key, title, icon }: MenuRoute, itemCLick: OnItemClick) {
  return <Menu.Item icon={renderIcon(icon)} key={key} onClick={() => {itemCLick(key)}}>{title}</Menu.Item>
}

function renderSubMenu ({ key, title, child, icon }: MenuRoute, itemCLick: OnItemClick) {
  return (
    <Menu.SubMenu icon={renderIcon(icon)} key={key} title={title}>
      {
        child!.map(route => (
          route.child
            ? renderSubMenu(route, itemCLick)
            : renderMenuItem(route, itemCLick)
        ))
      }
    </Menu.SubMenu> 
  )
}

interface AsideMenuProps extends MenuProps {
  menuRoutes?: Array<MenuRoute>;
  onItemClick: OnItemClick;
  activeKey: string;
}
const AsideMenu: React.FC<AsideMenuProps> = ({ menuRoutes, onItemClick, activeKey, ...MenuProps }) => {
  return (
    <Menu
      theme="dark"
      mode="inline"
      openKeys={menuRoutes && menuRoutes.map(route => route.child ? route.key : '').filter(_ => _)}
      selectedKeys={[activeKey]}
      {...MenuProps}
    >
      {
        menuRoutes && menuRoutes.map(route => (
          route.child
            ? renderSubMenu(route, onItemClick)
            : renderMenuItem(route, onItemClick)
        ))
      }
    </Menu>
  )
}

export default AsideMenu
