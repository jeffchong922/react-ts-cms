import React from 'react'
import { message } from 'antd'
import { connect, ConnectedProps } from 'react-redux'

import ConfirmButton from '../ConfirmButton'
import { RootState } from '../../redux/reducers'
import { thunkDeleteDepartment, thunkFetchDepartment } from '../../redux/department/actions'

const mapState = (state: RootState) => ({
  department: state.department.wantToDelete
})
const mapDispatch = {
  thunkDeleteDepartment,
  thunkFetchDepartment
}
const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>

const DeleteManyBtn: React.FC<PropsFromRedux & { children?: string }> = (props) => {
  const {
    children,
    department: { deleteArray }, thunkDeleteDepartment, thunkFetchDepartment
  } = props

  async function handleDeleteMany () {
    if (deleteArray.length <= 0) {
      return
    }
    await thunkDeleteDepartment({ deleteArray })
      .then(errMsg => {
        errMsg && message.error(errMsg)
      })
    await thunkFetchDepartment()
      .then(errMsg => {
        errMsg && message.error(errMsg)
      })
  }

  return (
    <ConfirmButton
      modalTitleOptionStr='删除'
      modalTitleDataName={`选中的 ${deleteArray.length} 数据`}
      wantToDo={handleDeleteMany}
    >{children ? children : '批量删除'}</ConfirmButton>
  )
}

export default connector(DeleteManyBtn)
