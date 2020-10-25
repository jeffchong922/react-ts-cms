import React, { useEffect, useState } from 'react'
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
  isCollapsed: boolean;
}
const AsideMenu: React.FC<AsideMenuProps> = ({ isCollapsed, menuRoutes, onItemClick, activeKey, ...MenuProps }) => {
  const [openKeys, setOpenKeys] = useState<string[]>([])

  useEffect(() => {
    if (!isCollapsed) {
      setOpenKeys(
        menuRoutes
          ? menuRoutes.filter(route => route.child).map(_ => _.key)
          : []
      )
    } else {
      setOpenKeys([])
    }
  }, [isCollapsed, menuRoutes])

  function handleSubMenuOpen (keys: React.Key[] | {
    key: React.Key;
    item: React.ReactInstance;
    trigger: string;
    open: boolean;
  }) {
    if (Array.isArray(keys)) {
      setOpenKeys(keys.map(key => key.toString()))
    } else {
      setOpenKeys([keys.key.toString()])
    }
  }
  
  return (
    <Menu
      theme="dark"
      mode="inline"
      openKeys={openKeys}
      onOpenChange={handleSubMenuOpen}
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
