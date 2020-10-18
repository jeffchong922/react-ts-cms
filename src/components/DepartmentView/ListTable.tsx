import React, { useState } from 'react'
import { Switch, Table } from 'antd'
import { ColumnsType, TableProps } from 'antd/lib/table'

import OperationBtnGroup from './OperationBtnGroup'
import { TableRowSelection } from 'antd/lib/table/interface'

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

interface ListTableProps extends TableProps<IDepartmentTableData> {
}
const ListTable: React.FC<ListTableProps> = ({ dataSource }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  const rowSelection: TableRowSelection<IDepartmentTableData> = {
    selectedRowKeys,
    onChange: onSelectedChange
  }

  function onSelectedChange (keys: React.Key[]) {
    setSelectedRowKeys(keys)
  }

  return (
    <Table pagination={false} rowSelection={rowSelection} columns={columns} dataSource={dataSource} bordered/>
  )
}

export default ListTable
