import React from 'react'
import { Switch, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'

import OperationBtnGroup from './OperationBtnGroup'

export interface IDepartmentTableData {
  key: string;
  name: string;
  status: boolean;
  memberCount: number;
  editFunc: (id: string) => void;
  deleteFunc: (id: string) => Promise<any>
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
        editFunc={() => { rowData.editFunc(rowData.key) }}
        deleteFunc={() => rowData.deleteFunc(rowData.key)}
      />
    )
  }
]

interface ListTableProps {
  dataSource: IDepartmentTableData[]
}
const ListTable: React.FC<ListTableProps> = ({ dataSource }) => {
  return (
    <Table columns={columns} dataSource={dataSource} bordered/>
  )
}

export default ListTable
