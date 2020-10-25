import React from 'react'
import { connect, ConnectedProps } from 'react-redux'

import { RootState } from '../../redux/reducers'
import { thunkDeleteDepartment, thunkFetchDepartment } from '../../redux/department/actions'
import DeleteManyBtn from '../DeleteManyBtn'

const mapState = (state: RootState) => ({
  deleteArray: state.department.wantToDelete.deleteArray
})
const mapDispatch = {
  thunkDelete: thunkDeleteDepartment,
  thunkFetch: thunkFetchDepartment
}
const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>

const DepartmentDeleteManyBtn: React.VFC<PropsFromRedux> = ({
  deleteArray,
  thunkDelete,
  thunkFetch
}) => (
  <DeleteManyBtn deleteArray={deleteArray} thunkDelete={thunkDelete} thunkFetch={thunkFetch}/>
)


export default connector(DepartmentDeleteManyBtn)
