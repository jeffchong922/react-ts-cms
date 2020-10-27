import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { connect, ConnectedProps } from 'react-redux'

import { debounce } from '../helpers/tools'
import { useInterval } from '../hooks/useInterval'
import { RootState } from '../redux/reducers'
import { setUserInfo } from '../redux/auth/actions'
import { UserMenuItem } from '../api/types'

const mapState = (state: RootState) => ({
  userInfo: state.auth.userInfo
})
const mapDispatch = {
  setUserInfo,
}
const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>

const GreetViewWrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const GreetView: React.VFC<PropsFromRedux> = ({ userInfo, setUserInfo }) => {
  const [time, setTime] = useState<string>('')
  const getUndoMenusDebouncedRef = useRef(debounce(getUndoMenus, 2000, { isImmediate: true }))

  useInterval(() => {
    setTime(new Date().toLocaleString())
  }, 500)
  
  function getUndoMenus () {
    const url = process.env.REACT_APP_AUTH_BASE_URL || 'http://localhost:8090'
    fetch(`${url}/undo-menus`)
    .then(res => res.json())
    .then((data: { menu: UserMenuItem[] } | undefined) => {
      data && setCurrentMenu(data.menu)
    })
  }

  function setCurrentMenu (undoMenu: UserMenuItem[]) {
    const newMenu = mergeMenuItems(undoMenu)
    userInfo && setUserInfo({
      userMenu: newMenu,
      username: userInfo.username,
      id: userInfo.id
    })
  }

  function mergeMenuItems (undoMenu: UserMenuItem[]): UserMenuItem[] {
    const currentMenu = userInfo
      ? userInfo.userMenu
      : []
    return currentMenu.concat(undoMenu.filter(menuItem => !~currentMenu.findIndex(existItem => existItem.key === menuItem.key)))
  }

  return (
    <GreetViewWrapper>
      <p style={{ fontSize: '1.5rem' }}>欢迎访问管理系统</p>
      <p>本地时间：{time}</p>
      <ul>
        <li>✔部门模块</li>
        <li>✔职位模块</li>
        <li>
          <span role='img' aria-label='img'>⏰</span>
          其他模块开发中<button onClick={getUndoMenusDebouncedRef.current}>其余菜单,刷新复原</button>
        </li>
      </ul>
    </GreetViewWrapper>
  )
}

export default connector(GreetView)
