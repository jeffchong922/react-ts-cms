import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { message } from 'antd'
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

const DepartmentListView: React.FC<RouteComponentProps> = ({ history }) => {
  const [dataSource, setDataSource] = useState<Array<IDepartmentTableData>>([])
  
  const makeDataSource = useCallback((fetchedResult: IFetchDepartmentsResult): IDepartmentTableData[] => {
    return fetchedResult.fetched.list.map<IDepartmentTableData>(department => ({
      key: department.id,
      name: department.name,
      status: department.status,
      memberCount: department.memberCount,
      editFunc: (id) => { history.push(`/department/add?id=${id}`) },
      deleteFunc: (id) => departmentApi.delete({ id })
    }))
  }, [history])

  useEffect(() => {
    departmentApi.fetch()
      .then(result => {
        setDataSource(makeDataSource(result))
      })
      .catch(errMsg => message.error(errMsg))
  }, [makeDataSource])

  function handleSubmit (searchText: string) {
    console.log(searchText)
  }

  return (
    <ListViewWrapper>
      <ListViewHeader>
        <ListSearchForm onSubmit={handleSubmit}/>
      </ListViewHeader>
      <ListViewContent>
        <ListTable dataSource={dataSource}/>
      </ListViewContent>
    </ListViewWrapper>
  )
}

export default withRouter(DepartmentListView)
