import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { message, Pagination } from 'antd'

import { RootState } from '../../redux/reducers'
import { thunkFetchDepartment, setPageNumber, setPageSize } from '../../redux/department/actions'

const mapState = (state: RootState) => ({
  total: state.department.departmentList.total,
  pageNumber: state.department.listPageNumber,
  pageSize: state.department.listPageSize
})
const mapDispatch = {
  setPageSize,
  setPageNumber,
  thunkFetchDepartment,
}
const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>

function renderTotalItem (total: number) {
  return `总共 ${total} 条数据`
}

const ListPagination: React.FC<PropsFromRedux> = (props) => {
  const {
    total, pageNumber, pageSize,
    thunkFetchDepartment, setPageSize, setPageNumber
  } = props

  function handleShowSizeChange (current: number, size: number) {
    setPageSize(size)
    setPageNumber(current)
    fetchNewList()
  }
  function handlePageChange (pageNumber: number) {
    setPageNumber(pageNumber)
    fetchNewList()
  }
  function fetchNewList () {
    thunkFetchDepartment({})
      .then(errMsg => {
        errMsg && message.error(errMsg)
      })
  }

  return (
    <Pagination
      current={pageNumber}
      pageSize={pageSize}
      total={total}
      showTotal={renderTotalItem}
      onChange={handlePageChange}
      showSizeChanger
      onShowSizeChange={handleShowSizeChange}
    />
  )
}

export default connector(ListPagination)
