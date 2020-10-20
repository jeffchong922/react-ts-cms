import React, { useEffect, useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { RouteChildrenProps, withRouter } from 'react-router-dom'
import { message, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { TableRowSelection } from 'antd/lib/table/interface'

import OperationBtnGroup from './OperationBtnGroup'
import SwitchStatus from './SwitchStatus'
import { RootState } from '../../redux/reducers'
import { thunkDeleteDepartment, setDeleteDepartment, thunkFetchDepartment, thunkUpdateDepartment } from '../../redux/department/actions'

const mapState = (state: RootState) => ({
  fetchedList: state.department.departmentList.list,
  deleteDepartments: state.department.wantToDelete,
  isListDataFetching: state.department.isListDataFetching
})
const mapDispatch = {
  setDeleteDepartment,
  thunkDeleteDepartment,
  thunkFetchDepartment,
  thunkUpdateDepartment
}
const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>

export interface ITableData {
  key: string;
  name: string;
  status: boolean;
  memberCount: number;
}

const ListTable: React.FC<PropsFromRedux & RouteChildrenProps> = (props) => {
  const {
    history,
    isListDataFetching,
    fetchedList,
    deleteDepartments,
    setDeleteDepartment,
    thunkDeleteDepartment,
    thunkFetchDepartment,
    thunkUpdateDepartment
  } = props

  const [dataSource, setDataSource] = useState<ITableData[]>([])
  useEffect(() => {
    setDataSource(fetchedList.map(department => ({
      key: department.id,
      name: department.name,
      status: department.status,
      memberCount: department.memberCount,
    })))
  }, [fetchedList])

  const columns: ColumnsType<ITableData> = [
    { title: '部门名称', dataIndex: 'name' },
    { title: '禁/启用', dataIndex: 'status',
      render: (val, rowData) => <SwitchStatus onChangeStatus={change => handleChangeStatus(rowData.key, change)} status={rowData.status}/>
    },
    { title: '人员数量', dataIndex: 'memberCount' },
    { title: '操作', key: 'operation', width: 180,
      render: (val, rowData) => (
        <OperationBtnGroup
          deleteName={rowData.name}
          editFunc={() => { handleEdit(rowData.key) }}
          deleteFunc={() => handleDelete(rowData.key)}
        />
      )
    }
  ]
  async function handleChangeStatus (id: string, status: boolean) {
    console.log('want to change to : ', status)
    await thunkUpdateDepartment({ id, status: status })
      .then(errMsg => {
        errMsg && message.error(errMsg)
      })
  }
  function handleEdit (id: string) {
    history.push(`/department/add?id=${id}`)
  }
  async function handleDelete (id: string) {
    await thunkDeleteDepartment({ deleteArray: [id] })
      .then(errMsg => {
        errMsg && message.error(errMsg)
      })
    await thunkFetchDepartment()
      .then(errMsg => {
        errMsg && message.error(errMsg)
      })
  }

  const rowSelection: TableRowSelection<ITableData> = {
    selectedRowKeys: deleteDepartments.deleteArray,
    onChange: onSelectedChange
  }
  function onSelectedChange (keys: React.Key[]) {
    setDeleteDepartment({
      deleteArray: keys.map(key => '' + key)
    })
  }

  return (
    <Table
      bordered
      pagination={false}
      loading={isListDataFetching}
      columns={columns}
      rowSelection={rowSelection}
      dataSource={dataSource}
    />
  )
}

export default withRouter(connector(ListTable))
