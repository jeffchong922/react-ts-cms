import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { Dropdown, Menu } from 'antd'

import { RootState } from '../../redux/reducers'
import { logout } from '../../redux/auth/actions'
import { initialState } from '../../redux/department/actions'

const mapState = (state: RootState) => ({
  userInfo: state.auth.userInfo
})
const mapDispatch = {
  logout,
  departmentInit: initialState
}
const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>

const HeaderAvatar: React.FC<PropsFromRedux & RouteComponentProps> = (props) => {
  const { userInfo, logout, departmentInit, history } = props
  
  function handleLogout () {
    logout()
    departmentInit()
    history.replace('/auth')
  }

  const dropdownMenu = (
    <Menu>
      <Menu.Item onClick={handleLogout}>
        退出登录
      </Menu.Item>
    </Menu>
  )

  return (
    <div>
      {
        userInfo && (
          <Dropdown overlay={dropdownMenu}>
            <span style={{ cursor: 'pointer' }}>{userInfo.username}</span>
          </Dropdown>
        )
      }
    </div>
  )
}

export default withRouter(connector(HeaderAvatar))
