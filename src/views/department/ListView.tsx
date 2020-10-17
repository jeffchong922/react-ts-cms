import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button, Form, Input, message, Switch, Table } from 'antd'

import departmentApi, { IFetchDepartmentsResult } from '../../api/department'
import { ColumnsType } from 'antd/lib/table'
import showConfirmModal from '../../components/show-confirm'

const OperationBtnWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  align-content: space-around;
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
      <OperationBtnWrapper>
        <Button type='primary'>编辑</Button>
        <Button type='primary' onClick={() => {
          showConfirmModal({ dataName: rowData.name, wantToDo: () => {
            return departmentApi.delete({ id: rowData.key })
              .then(result => console.log(result))
              .catch(errMsg => console.log(errMsg))
          } })
        }} danger>删除</Button>
      </OperationBtnWrapper>
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
  function handleSubmit () {
  }

  useEffect(() => {
    departmentApi.fetch()
      .then(result => {
        setDataSource(makeDataSource(result))
      })
      .catch(errMsg => message.error(errMsg))
  }, [])
  return (
    <>
      <Form onFinish={handleSubmit} colon={false} layout='inline'>
        <Form.Item label='部门名称'>
          <Input placeholder='请输入部门名称'/>
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>搜索</Button>
        </Form.Item>
      </Form>
      <Table columns={columns} dataSource={dataSource} bordered/>
    </>
  )
}

export default DepartmentListView
