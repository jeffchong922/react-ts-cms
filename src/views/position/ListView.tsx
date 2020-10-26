import React, { useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { message } from 'antd'

import ListSearchForm from '../../components/PositionView/ListSearchForm'
import ListTable from '../../components/PositionView/ListTable'
import ListPagination from '../../components/PositionView/ListPagination'
import { ListViewContent, ListViewFooter, ListViewHeader, ListViewWrapper } from '../../components/styled-elements'
import DeleteManyBtn from '../../components/PositionView/DeleteManyBtn'
import { RootState } from '../../redux/reducers'
import { thunkFetchPositions, setDeleteArray } from '../../redux/position/actions'

const mapState = (state: RootState) => ({})
const mapDispatch = {
  thunkFetchPositions,
  setDeleteArray
}
const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>

const PositionListView: React.VFC<PropsFromRedux> = ({
  thunkFetchPositions,
  setDeleteArray
}) => {

  useEffect(() => {
    thunkFetchPositions().then(errMsg => {
      errMsg && message.error(errMsg)
    })
    return () => {
      setDeleteArray([])
    }
  }, [thunkFetchPositions, setDeleteArray])

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

export default connector(PositionListView)
