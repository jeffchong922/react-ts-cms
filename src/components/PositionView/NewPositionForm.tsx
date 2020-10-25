import React, { useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { Button, Form, Input, message, Radio } from 'antd'

import LabelInput from '../LabelInput'
import SelectDepartments, { SelectedType } from './SelectDepartments'
import makeValidator, { Strategy } from '../../helpers/validator'
import useLocationSearch from '../../hooks/useLocationSearch'
import { RootState } from '../../redux/reducers'
import { thunkNewPosition } from '../../redux/position/actions'

const mapState = (state: RootState) => ({
  isSubmitting: state.position.isUpdating
})
const mapDispatch = {
  addPosition: thunkNewPosition
}
const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>


const NewPositionForm: React.FC<PropsFromRedux & RouteComponentProps> = (props) => {
  const {
    location: { search },
    isSubmitting,
    addPosition
  } = props

  const [departmentId, setDepartmentId] = useState('')
  const [name, setName] = useState<string>('')
  const [status, setStatus] = useState<boolean>(true)
  const [introduction, setIntroduction] = useState<string>('')

  const [hasId, id] = useLocationSearch(search, 'id')

  /**
   * 校验数据
   */
  function dataCheck () {
    const validator = makeValidator()
    validator.add(departmentId, [
      { strategy: Strategy.IsNotEmpty, errorMsg: '部门字段不能为空' }
    ])
    validator.add(name, [
      { strategy: Strategy.IsNotEmpty, errorMsg: '职位名字段不能为空' }
    ])
    return validator.start()
  }

  /**
   * 初始化表单
   */
  function initialForm () {
    setName('')
    setDepartmentId('')
    setStatus(true)
    setIntroduction('')
  }

  function handleSubmit () {
    const errorMsg = dataCheck()
    if (errorMsg) {
      return message.error(errorMsg)
    }

    if (hasId) {
      updateWay()
    }
    else {
      addWay()
    }
  }
  function updateWay () {
    // TODO
  }
  function addWay () {
    addPosition({
      name,
      departmentId,
      status,
      introduction
    }).then(errMsg => {
      if (errMsg) {
        message.error(errMsg)
      } else {
        message.success('注册成功')
        initialForm()
      }
    })
  }
  
  /**
   * 选择组件回调
   */
  function handleSelected (selected: SelectedType) {
    setDepartmentId(
      typeof selected === 'undefined'
        ? ''
        : Array.isArray(selected)
            ? selected[0]
            : selected
    )
  }

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item>
        <LabelInput label='选择部门' inputCol={{ md: 12, lg: 10, xl: 5 }}>
          <SelectDepartments isMultiple={false} selectedList={departmentId} setSelectedList={handleSelected}/>
        </LabelInput>
      </Form.Item>
      <Form.Item>
        <LabelInput label='职位名称' inputCol={{ md: 12, lg: 10, xl: 5 }}>
          <Input value={name} onChange={e => setName(e.target.value)}/>
        </LabelInput>
      </Form.Item>
      <Form.Item>
        <LabelInput label='禁/启用'>
          <Radio.Group onChange={e => setStatus(e.target.value)} value={status}>
            <Radio value={false}>禁用</Radio>
            <Radio value={true}>启用</Radio>
          </Radio.Group>
        </LabelInput>
      </Form.Item>
      <Form.Item>
        <LabelInput label='描述'>
          <Input.TextArea allowClear value={introduction} onChange={e => setIntroduction(e.target.value)} rows={5}/>
        </LabelInput>
      </Form.Item>
      <Form.Item>
        <LabelInput label=''>
          <Button loading={isSubmitting} type='primary' htmlType='submit'>确定</Button>
        </LabelInput>
      </Form.Item>
    </Form>
  )
}

export default connector(withRouter(NewPositionForm))
