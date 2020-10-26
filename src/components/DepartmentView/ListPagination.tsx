import React from 'react'
import { connect, ConnectedProps } from 'react-redux'

import { RootState } from '../../redux/reducers'
import { thunkFetchDepartment, setPageNumber, setPageSize } from '../../redux/department/actions'
import ListPagination from '../ListPagination'

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

const DepartmentListPagination: React.VFC<PropsFromRedux> = ({
  total, pageNumber, pageSize,
  thunkFetchDepartment, setPageSize, setPageNumber
}) => (
  <ListPagination
    total={total}
    pageNumber={pageNumber}
    pageSize={pageSize}
    fetchList={thunkFetchDepartment}
    setPageNumber={setPageNumber}
    setPageSize={setPageSize}
  />
)

export default connector(DepartmentListPagination)
