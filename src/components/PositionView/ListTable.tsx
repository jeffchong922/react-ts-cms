import React, { useEffect, useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { RouteChildrenProps, withRouter } from 'react-router-dom'
import { message, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'

import OperationBtnGroup from '../OperationBtnGroup'
import { RootState } from '../../redux/reducers'
// import {} from '../../redux/position/actions'

const mapState = (state: RootState) => ({
  fetchedList: state.position.currentPageList,
  isListDataFetching: state.position.isFetching
})
const mapDispatch = {}
const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>

export interface ITableData {
  key: string
  name: string
  departmentName: string
  status: boolean
}

const ListTable: React.FC<PropsFromRedux & RouteChildrenProps> = (props) => {
  const {
    history,
    isListDataFetching,
    fetchedList
  } = props

  const [dataSource, setDataSource] = useState<ITableData[]>([])
  useEffect(() => {
    setDataSource(fetchedList.map(data => ({
      key: data.id,
      name: data.name,
      status: data.status,
      departmentName: data.departmentInfo.name,
    })))
  }, [fetchedList])

  const columns: ColumnsType<ITableData> = [
    { title: '职位名称', dataIndex: 'name' },
    { title: '部门名称', dataIndex: 'departmentName' },
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

  // 跳转页面
  function handleEdit (id: string) {
    history.push(`/position/add?id=${id}`)
  }
  // 删除逻辑
  async function handleDelete (id: string) {
  }

  return (
    <Table
      bordered
      pagination={false}
      loading={isListDataFetching}
      columns={columns}
      dataSource={dataSource}
    />
  )
}

export default withRouter(connector(ListTable))
