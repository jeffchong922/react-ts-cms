import React from 'react'
import { Button, Form, Input, InputNumber, message, Radio } from 'antd'

import LabelInput from './LabelInput'
import useInput from '../../hooks/useInput'
import { INewDepartment } from '../../api/department'
import makeValidator, { Strategy } from '../../helpers/validator'
import useBoolean from '../../hooks/useBoolean'

interface NewDepartmentFormProps {
  addDepartment: (departmentInfo: INewDepartment) => Promise<any>
}
const NewDepartmentForm: React.FC<NewDepartmentFormProps> = ({ addDepartment }) => {
  const [name, setName, resetName] = useInput<string>('')
  const [memberSize, setMemberSize, resetMemberSize] = useInput<number>(0)
  const [status, setStatus, resetStatus] = useInput<boolean>(true)
  const [introduction, setIntroduction, resetIntroduction] = useInput<string>('')
  const [isSubmitting, submitting, submitted ] = useBoolean(false)

  function initialForm () {
    resetName()
    resetMemberSize()
    resetStatus()
    resetIntroduction()
  }

  function dataCheck () {
    const validator = makeValidator()
    validator.add(name, [
      { strategy: Strategy.IsNotEmpty, errorMsg: '部门名字段不能为空' }
    ])
    validator.add(introduction, [
      { strategy: Strategy.IsNotEmpty, errorMsg: '部门描述字段不能为空' }
    ])
    return validator.start()
  }

  function handleSubmit () {
    const errorMsg = dataCheck()
    if (errorMsg) {
      return message.error(errorMsg)
    }

    submitting()

    addDepartment({
      name,
      memberSize,
      status,
      introduction
    }).then(() => {
      message.success('创建成功')
      initialForm()
    }).catch(errMsg => {
      message.error(errMsg)
    }).finally(submitted)
  }

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item>
        <LabelInput label='部门名称' inputCol={{
          md: 12,
          lg: 10,
          xl: 5
        }}>
          <Input allowClear type='text' value={name} onChange={setName} />
        </LabelInput>
      </Form.Item>
      <Form.Item>
        <LabelInput label='人员数量'>
          <InputNumber
            value={memberSize}
            onChange={val => typeof val === 'number' && setMemberSize({target:{value: val}})}
            type='number'
            min={0}
            max={100}
          />
        </LabelInput>
      </Form.Item>
      <Form.Item>
        <LabelInput label='禁/启用'>
          <Radio.Group onChange={e => setStatus({target:{value: e.target.value}})} value={status}>
            <Radio value={false}>禁用</Radio>
            <Radio value={true}>启用</Radio>
          </Radio.Group>
        </LabelInput>
      </Form.Item>
      <Form.Item>
        <LabelInput label='描述'>
          <Input.TextArea allowClear value={introduction} onChange={setIntroduction} rows={5}/>
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

export default NewDepartmentForm
