import React, { useEffect } from 'react'
import styled from 'styled-components'
import { connect, ConnectedProps } from 'react-redux'
import { message } from 'antd'

import ListTable from '../../components/DepartmentView/ListTable'
import ListSearchForm from '../../components/DepartmentView/ListSearchForm'
import DeleteManyBtn from '../../components/DepartmentView/DepartmentDeleteManyBtn'
import ListPagination from '../../components/DepartmentView/ListPagination'
import { RootState } from '../../redux/reducers'
import { thunkFetchDepartment, setDeleteDepartment } from '../../redux/department/actions'


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

const mapState = (state: RootState) => ({})
const mapDispatch = {
  thunkFetchDepartment,
  setDeleteDepartment
}
const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>

const DepartmentListView: React.FC<PropsFromRedux> = (props) => {
  const {
    thunkFetchDepartment,
    setDeleteDepartment
  } = props

  useEffect(() => {
    thunkFetchDepartment().then(errMsg => {
      errMsg && message.error(errMsg)
    })
    return () => {
      setDeleteDepartment({
        deleteArray: []
      })
    }
  }, [thunkFetchDepartment, setDeleteDepartment])

  return (
    <ListViewWrapper>
      <ListViewHeader>
        <ListSearchForm/>
      </ListViewHeader>
      <ListViewContent>
        <ListViewHeader>
          <ListTable/>
        </ListViewHeader>
        <ListViewFooter>
          <DeleteManyBtn/>
          <ListPagination/>
        </ListViewFooter>
      </ListViewContent>
    </ListViewWrapper>
  )
}

export default connector(DepartmentListView)
