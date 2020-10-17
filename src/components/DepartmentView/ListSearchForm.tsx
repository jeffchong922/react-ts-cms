import React from 'react'
import { Button, Form, Input } from 'antd'
import useInput from '../../hooks/useInput'

interface ListSearchFormProps {
  onSubmit: (searchText: string) => void;
}
const ListSearchForm: React.FC<ListSearchFormProps> = ({ onSubmit }) => {
  const [searchText, setSearchText] = useInput<string>('')

  function handleSubmit () {
    onSubmit(searchText)
  }

  return (
    <Form onFinish={handleSubmit} colon={false} layout='inline'>
      <Form.Item label='部门名称'>
        <Input allowClear value={searchText} onChange={setSearchText} placeholder='请输入部门名称'/>
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit'>搜索</Button>
      </Form.Item>
    </Form>
  )
}

export default ListSearchForm
