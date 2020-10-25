import React from 'react'
import { connect, ConnectedProps } from 'react-redux';
import { Button, Form, Input, message } from 'antd'

import useInput from '../../hooks/useInput'
import { RootState } from '../../redux/reducers';
import { setSearchDepartmentIds, setSearchPositionName, thunkFetchPositions } from '../../redux/position/actions'
import SelectDepartments, { SelectedType } from './SelectDepartments';

const mapState = (state: RootState) => ({
  isListFetching: state.position.isFetching,
  currentSearchName: state.position.searchInfo.positionName,
  currentSearchIds: state.position.searchInfo.departmentIds
})
const mapDispatch = {
  setSearchIds: setSearchDepartmentIds,
  setSearchName: setSearchPositionName,
  fetchList: thunkFetchPositions
}
const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>

const ListSearchForm: React.FC<PropsFromRedux> = (props) => {
  const {
    isListFetching,
    currentSearchName,
    currentSearchIds,
    setSearchIds,
    setSearchName,
    fetchList
  }= props

  const [searchText, setSearchText] = useInput<string>('')

  function handleSubmit () {
    setSearchName(searchText)
    fetchList().then(errMsg => {
      errMsg && message.error(errMsg)
    })
  }

  function handleSelectedChange (selected: SelectedType) {
    if (typeof selected === 'undefined') return

    !isListFetching && setSearchIds(
      Array.isArray(selected)
        ? selected
        : [selected]
    )
  }

  return (
    <>
      <Form onFinish={handleSubmit} colon={false} layout='inline'>
        <Form.Item label='选择部门'>
          <div style={{ width: '194px' }}>
            <SelectDepartments loading={isListFetching} selectedList={currentSearchIds} setSelectedList={handleSelectedChange} isMultiple={true} />
          </div>
        </Form.Item>
        <Form.Item label='职位名称'>
          <Input allowClear value={searchText} onChange={setSearchText} placeholder='请输入职位名称'/>
        </Form.Item>
        <Form.Item>
          <Button loading={isListFetching} type='primary' htmlType='submit'>搜索</Button>
        </Form.Item>
      </Form>
      { currentSearchName && <span style={{ color: '#888' }}>当前模糊查询数据 : {currentSearchName}</span> }
    </>
  )
}

export default connector(ListSearchForm)
