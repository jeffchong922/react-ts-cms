import React, { useEffect, useImperativeHandle, useState } from 'react'
import { Button, Form, Input, InputNumber, message, Radio } from 'antd'

import LabelInput from './LabelInput'
import makeValidator, { Strategy } from '../../helpers/validator'
import useBoolean from '../../hooks/useBoolean'

export interface InitialFormFields {
  name?: string;
  memberCount?: number;
  status?: boolean;
  introduction?: string;
}
export interface SubmitData {
  name: string;
  memberCount: number;
  status: boolean;
  introduction: string;
}
interface NewDepartmentFormProps {
  initialFormFields?: InitialFormFields;
  onSubmit: (data: SubmitData) => Promise<any>;
}
export interface NewDepartmentFormRef {
  resetForm: () => void
}
const NewDepartmentForm: React.ForwardRefRenderFunction<NewDepartmentFormRef, NewDepartmentFormProps> = (props, ref) => {
  const {
    onSubmit,
    initialFormFields = {}
  } = props

  const [name, setName] = useState<string>(initialFormFields.name || '')
  const [memberCount, setMemberCount] = useState<number>(initialFormFields.memberCount || 0)
  const [status, setStatus] = useState<boolean>(initialFormFields.status || true)
  const [introduction, setIntroduction] = useState<string>(initialFormFields.introduction ||'')
  const [isSubmitting, submitting, submitted] = useBoolean(false)

  useEffect(() => {
    initialFormFields.name && setName(initialFormFields.name)
    initialFormFields.memberCount && setMemberCount(initialFormFields.memberCount)
    initialFormFields.status && setStatus(initialFormFields.status)
    initialFormFields.introduction && setIntroduction(initialFormFields.introduction)
  }, [initialFormFields])

  useImperativeHandle(ref, () => ({
    resetForm: initialForm
  }), [])

  function initialForm () {
    setName('')
    setMemberCount(0)
    setStatus(true)
    setIntroduction('')
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

    onSubmit({
      name, status, memberCount, introduction
    }).then(initialForm)
      .finally(submitted)
  }

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item>
        <LabelInput label='部门名称' inputCol={{
          md: 12,
          lg: 10,
          xl: 5
        }}>
          <Input allowClear type='text' value={name} onChange={e => setName(e.target.value)} />
        </LabelInput>
      </Form.Item>
      <Form.Item>
        <LabelInput label='人员数量'>
          <InputNumber
            value={memberCount}
            onChange={val => typeof val === 'number' && setMemberCount(val)}
            type='number'
            min={0}
            max={100}
          />
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


export default React.forwardRef(NewDepartmentForm)
