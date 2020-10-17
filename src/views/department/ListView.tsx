import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { message, Switch, Table } from 'antd'

import departmentApi, { IFetchDepartmentsResult } from '../../api/department'
import { ColumnsType } from 'antd/lib/table'
import ListSearchForm from '../../components/DepartmentView/ListSearchForm'
import OperationBtnGroup from '../../components/DepartmentView/OperationBtnGroup'


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

interface IDepartmentTableData {
  key: string;
  name: string;
  status: boolean;
  memberCount: number;
}

const columns: ColumnsType<IDepartmentTableData> = [
  {
    title: '部门名称',
    dataIndex: 'name'
  },
  {
    title: '禁/启用',
    dataIndex: 'status',
    render: val => <Switch checked={val}/>
  },
  {
    title: '人员数量',
    dataIndex: 'memberCount'
  },
  {
    title: '操作',
    key: 'operation',
    width: 180,
    render: (val, rowData) => (
      <OperationBtnGroup
        deleteName={rowData.name}
        editFunc={() => { console.log(1) }}
        deleteFunc={() => {
          return departmentApi.delete({ id: rowData.key })
            .then(result => console.log(result))
            .catch(errMsg => console.log(errMsg))
        }}
      />
    )
  }
]

function makeDataSource (fetchedResult: IFetchDepartmentsResult): IDepartmentTableData[] {
  return fetchedResult.fetched.list.map<IDepartmentTableData>(department => ({
    key: department.id,
    name: department.name,
    status: department.status,
    memberCount: department.memberCount
  }))
}

const DepartmentListView = () => {
  const [dataSource, setDataSource] = useState<Array<IDepartmentTableData>>([])

  function handleSubmit (searchText: string) {
    console.log(searchText)
  }

  useEffect(() => {
    departmentApi.fetch()
      .then(result => {
        setDataSource(makeDataSource(result))
      })
      .catch(errMsg => message.error(errMsg))
  }, [])
  return (
    <ListViewWrapper>
      <ListViewHeader>
        <ListSearchForm onSubmit={handleSubmit}/>
      </ListViewHeader>
      <ListViewContent>
        <Table columns={columns} dataSource={dataSource} bordered/>
      </ListViewContent>
    </ListViewWrapper>
  )
}

export default DepartmentListView
