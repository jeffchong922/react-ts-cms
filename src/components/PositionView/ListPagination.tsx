import React from 'react'
import { connect, ConnectedProps } from 'react-redux'

import { RootState } from '../../redux/reducers'
import { setPageNumber, setPageSize } from '../../redux/position/actions'
import ListPagination from '../ListPagination'

const mapState = (state: RootState) => ({
  total: state.position.fetchedList.total,
  pageNumber: state.position.listPageNumber,
  pageSize: state.position.listPageSize
})
const mapDispatch = {
  setPageSize,
  setPageNumber
}
const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>

const PositionListPagination: React.VFC<PropsFromRedux> = ({
  total, pageNumber, pageSize,
  setPageSize, setPageNumber
}) => (
  <ListPagination
    total={total}
    pageNumber={pageNumber}
    pageSize={pageSize}
    setPageNumber={setPageNumber}
    setPageSize={setPageSize}
  />
)

export default connector(PositionListPagination)
