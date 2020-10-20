import React from 'react'
import { connect, ConnectedProps } from 'react-redux';
import { Button, Form, Input, message } from 'antd'

import useInput from '../../hooks/useInput'
import { RootState } from '../../redux/reducers';
import { thunkFetchDepartment, setSearchName } from '../../redux/department/actions'

const mapState = (state: RootState) => ({
  isListFetching: state.department.isListDataFetching,
  currentSearch: state.department.searchName
})
const mapDispatch = {
  thunkFetchDepartment,
  setSearchName
}
const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>

const ListSearchForm: React.FC<PropsFromRedux> = (props) => {
  const {
    isListFetching,
    currentSearch,
    setSearchName,
    thunkFetchDepartment
  }= props

  const [searchText, setSearchText] = useInput<string>('')

  function handleSubmit () {
    setSearchName(searchText)
    thunkFetchDepartment()
      .then(errMsg => {
        errMsg && message.error(errMsg)
      })
  }

  return (
    <>
      <Form onFinish={handleSubmit} colon={false} layout='inline'>
        <Form.Item label='部门名称'>
          <Input allowClear value={searchText} onChange={setSearchText} placeholder='请输入部门名称'/>
        </Form.Item>
        <Form.Item>
          <Button loading={isListFetching} type='primary' htmlType='submit'>搜索</Button>
        </Form.Item>
      </Form>
      { currentSearch && <span style={{ color: '#888' }}>当前模糊查询数据 : {currentSearch}</span> }
    </>
  )
}

export default connector(ListSearchForm)
