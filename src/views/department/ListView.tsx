import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button, message, Pagination } from 'antd'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import departmentApi, { IFetchDepartmentsResult } from '../../api/department'
import ListTable, { IDepartmentTableData } from '../../components/DepartmentView/ListTable'
import ListSearchForm from '../../components/DepartmentView/ListSearchForm'


const ListViewWrapper = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
`
const ListViewHeader = styled.header`
  margin-bottom: 30px;
`
const ListViewContent = styled.main`
  flex: 1;
`
const ListViewFooter = styled.footer`
  display: flex;
  justify-content: space-between;
`

const DepartmentListView: React.FC<RouteComponentProps> = ({ history }) => {
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [departmentTotal, setDepartmentTotal] = useState<number>(0)
  const [dataSource, setDataSource] = useState<Array<IDepartmentTableData>>([])
  
  const makeDataSource = useCallback((fetchedResult: IFetchDepartmentsResult): IDepartmentTableData[] => {
    return fetchedResult.fetched.list.map<IDepartmentTableData>(department => ({
      key: department.id,
      name: department.name,
      status: department.status,
      memberCount: department.memberCount,
      editFunc: (id) => { history.push(`/department/add?id=${id}`) },
      deleteFunc: (id) => departmentApi.delete({ deleteArray: [id] })
    }))
  }, [history])

  useEffect(() => {
    departmentApi.fetch({ pageNumber, pageSize })
      .then(result => {
        setDepartmentTotal(result.fetched.total)
        setDataSource(makeDataSource(result))
      })
      .catch(errMsg => message.error(errMsg))
  }, [makeDataSource, pageSize, pageNumber])

  function handleSubmit (searchText: string) {
    console.log(searchText)
  }

  function handleShowSizeChange (current: number, size: number) {
    setPageNumber(current)
    setPageSize(size)
  }

  function handlePageChange (pageNumber: number) {
    setPageNumber(pageNumber)
  }

  function renderTotalItem (total: number) {
    return `Total ${total} items`
  }

  return (
    <ListViewWrapper>
      <ListViewHeader>
        <ListSearchForm onSubmit={handleSubmit}/>
      </ListViewHeader>
      <ListViewContent>
        <ListViewHeader>
          <ListTable dataSource={dataSource}/>
        </ListViewHeader>
        <ListViewFooter>
          <Button>批量删除</Button>
          <Pagination current={pageNumber} onChange={handlePageChange} total={departmentTotal} showTotal={renderTotalItem} pageSize={pageSize} showSizeChanger onShowSizeChange={handleShowSizeChange}/>
        </ListViewFooter>
      </ListViewContent>
    </ListViewWrapper>
  )
}

export default withRouter(DepartmentListView)
