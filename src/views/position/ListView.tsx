import React from 'react'

import ListSearchForm from '../../components/PositionView/ListSearchForm'
import ListTable from '../../components/PositionView/ListTable'
import { ListViewContent, ListViewFooter, ListViewHeader, ListViewWrapper } from '../../components/styled-elements'

const PositionListView = () => {
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
          {/* <DeleteManyBtn/> */}
          {/* <ListPagination/> */}
        </ListViewFooter>
      </ListViewContent>
    </ListViewWrapper>
  )
}

export default PositionListView
