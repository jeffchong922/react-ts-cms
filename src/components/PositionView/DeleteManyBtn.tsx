import React from 'react'
import { connect, ConnectedProps } from 'react-redux'

import { RootState } from '../../redux/reducers'
import { thunkDeletePosition } from '../../redux/position/actions'
import DeleteManyBtn from '../DeleteManyBtn'

const mapState = (state: RootState) => ({
  deleteArray: state.position.deleteArray
})
const mapDispatch = {
  thunkDelete: thunkDeletePosition
}
const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>

const PositionDeleteManyBtn: React.VFC<PropsFromRedux> = ({
  deleteArray,
  thunkDelete
}) => (
  <DeleteManyBtn deleteArray={deleteArray} thunkDelete={(x) => thunkDelete(x.deleteArray)}/>
)


export default connector(PositionDeleteManyBtn)
