import React, { useState } from 'react'
import { Button, Form, Input, message, Switch, Table } from 'antd'

import departmentApi, { IFetchDepartmentsResult } from '../../api/department'
import { ColumnsType } from 'antd/lib/table'

const columns: ColumnsType<object> = [
  {
    title: '部门名称',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '禁/启用',
    dataIndex: 'status',
    key: 'status',
    render: val => <Switch checked={val}/>
  },
  {
    title: '人员数量',
    dataIndex: 'memberCount',
    key: 'memberCount'
  }
]

interface IDataSource {
  key: string;
  name: string;
  status: boolean;
  memberCount: number;
}
function makeDataSource (fetchedResult: IFetchDepartmentsResult) {
  return fetchedResult.fetched.list.map<IDataSource>(department => ({
    key: department.id,
    name: department.name,
    status: department.status,
    memberCount: department.memberCount
  }))
}

const DepartmentListView = () => {
  const [dataSource, setDataSource] = useState<Array<IDataSource>>([])
  function handleSubmit () {
    departmentApi.fetch()
      .then(result => {
        setDataSource(makeDataSource(result))
      })
      .catch(errMsg => message.error(errMsg))
  }
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
