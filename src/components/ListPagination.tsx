import React from 'react'
import { message, Pagination } from 'antd'

function renderTotalItem (total: number) {
  return `总共 ${total} 条数据`
}

export interface ListPaginationProps {
  total: number
  pageNumber: number
  pageSize: number
  setPageSize: (size: number) => void
  setPageNumber: (number: number) => void
  fetchList?: () => Promise<string | undefined>
}

const ListPagination: React.VFC<ListPaginationProps> = (props) => {
  const {
    total, pageNumber, pageSize,
    fetchList, setPageSize, setPageNumber
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
    fetchList && fetchList()
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

export default ListPagination
