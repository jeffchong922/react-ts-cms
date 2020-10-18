import React, { useImperativeHandle, useState } from 'react'
import { Table } from 'antd'
import { ColumnsType, TableProps } from 'antd/lib/table'

import OperationBtnGroup from './OperationBtnGroup'
import { TableRowSelection } from 'antd/lib/table/interface'
import SwitchStatus from './SwitchStatus'

export interface IDepartmentTableData {
  key: string;
  name: string;
  status: boolean;
  memberCount: number;
  editFunc: (id: string) => void;
  deleteFunc: (id: string) => Promise<any>;
  changeStatusFunc: (status: boolean) => Promise<any>;
}
const columns: ColumnsType<IDepartmentTableData> = [
  {
    title: '部门名称',
    dataIndex: 'name'
  },
  {
    title: '禁/启用',
    dataIndex: 'status',
    render: (val, rowData) => <SwitchStatus onChangeStatus={rowData.changeStatusFunc} status={rowData.status}/>
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
export interface ListTableRef {
  getSelectedRowKeys: () => React.Key[]
}
const ListTable: React.ForwardRefRenderFunction<ListTableRef, ListTableProps> = ({ dataSource, ...tableProps }, ref) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  useImperativeHandle(ref, () => ({
    getSelectedRowKeys: () => selectedRowKeys
  }), [selectedRowKeys])

  const rowSelection: TableRowSelection<IDepartmentTableData> = {
    selectedRowKeys,
    onChange: onSelectedChange
  }

  function onSelectedChange (keys: React.Key[]) {
    setSelectedRowKeys(keys)
  }

  return (
    <Table pagination={false} rowSelection={rowSelection} columns={columns} dataSource={dataSource} bordered {...tableProps}/>
  )
}

export default React.forwardRef(ListTable)
