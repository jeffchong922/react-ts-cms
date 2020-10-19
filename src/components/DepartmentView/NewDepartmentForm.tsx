import React, { useEffect, useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Button, Form, Input, InputNumber, message, Radio } from 'antd'

import LabelInput from './LabelInput'
import makeValidator, { Strategy } from '../../helpers/validator'
import { RootState } from '../../redux/reducers'
import { thunkNewDepartment, thunkUpdateDepartment, thunkFetchDepartment } from '../../redux/department/actions'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import useLocationSearch from '../../hooks/useLocationSearch'

const mapState = (state: RootState) => ({
  isSubmitting: state.department.isNewDataSubmitting,
  departInfoById: state.department.departmentInfo
})
const mapDispatch = {
  thunkNewDepartment,
  thunkUpdateDepartment,
  thunkFetchDepartment,
}
const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>

const NewDepartmentForm: React.FC<PropsFromRedux & RouteComponentProps> = (props) => {
  const {
    location: { search }, history,
    thunkFetchDepartment, thunkNewDepartment, thunkUpdateDepartment,
    isSubmitting, departInfoById
  } = props

  const [name, setName] = useState<string>('')
  const [memberCount, setMemberCount] = useState<number>(0)
  const [status, setStatus] = useState<boolean>(true)
  const [introduction, setIntroduction] = useState<string>('')

  const [hasId, id] = useLocationSearch(search, 'id')

  // 获取数据
  useEffect(() => {
    if (hasId) {
      thunkFetchDepartment({ id })
        .then(errMsg => {
          if (errMsg) {
            message.error(`获取指定数据失败`)
            history.replace('/department/list')
          }
        })
    } else {
      initialForm()
    }
  }, [hasId, id, history, thunkFetchDepartment])

  useEffect(() => {
    if (departInfoById && hasId) {
      setName(departInfoById.name)
      setMemberCount(departInfoById.memberCount)
      setStatus(departInfoById.status)
      setIntroduction(departInfoById.introduction)
    }
  }, [departInfoById, hasId])

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

  function addWay () {
    thunkNewDepartment({ name, status, introduction, memberCount })
      .then(errMsg => {
        if (errMsg) {
          message.error(errMsg)
        } else {
          message.success('注册成功')
          initialForm()
        }
      })
  }

  function updateWay () {
    thunkUpdateDepartment({ id, name, status, introduction, memberCount })
      .then(errMsg => {
        if (errMsg) {
          message.error(errMsg)
        } else {
          message.success('更新成功')
        }
      })
  }
  
  function handleSubmit () {
    const errorMsg = dataCheck()
    if (errorMsg) {
      return message.error(errorMsg)
    }

    if (!hasId) {
      addWay()
    } else {
      updateWay()
    }
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


export default withRouter(connector(NewDepartmentForm))
