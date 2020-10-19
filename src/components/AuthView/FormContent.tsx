import React, { useState, useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { RouteChildrenProps, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { Form, Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'

import makeValidator, { Strategy } from '../../helpers/validator'
import { RootState } from '../../redux/reducers'
import { thunkSignIn, thunkSignUp } from '../../redux/auth/actions'

const mapState = (state: RootState) => ({
  formState: state.auth.formState,
  isSubmitting: state.auth.isSubmitting
})
const mapDispatch = {
  thunkSignIn,
  thunkSignUp
}
const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>

const FormItemHelper = styled.span`
  color: #afb2b5;
`

function renderEyeNode (isShow: boolean, callback: () => void ): React.ReactNode {
  return (
    isShow
      ? <EyeOutlined onClick={() => callback()} />
      : <EyeInvisibleOutlined onClick={() => callback()} />
  )
}

export interface SubmitData {
  username: string;
  password: string;
}
interface FormContentProps extends PropsFromRedux, RouteChildrenProps {
}

const FormContent: React.FC<FormContentProps> = (props) => {
  const {
    history,
    thunkSignIn,
    thunkSignUp,
    formState: { isLogin },
    isSubmitting
  } = props

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPw, setConfirmPw] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPw, setShowConfirmPw] = useState(false)

  useEffect(() => {
    initialForm()
  }, [isLogin])

  function initialForm () {
    setUsername('')
    setPassword('')
    setConfirmPw('')
    setShowPassword(false)
    setShowConfirmPw(false)
  }
  
  function normalDataCheck () {
    const validator = makeValidator()
    validator.add(username, [
      { strategy: Strategy.IsNotEmpty, errorMsg: '用户名字段不能为空' },
      { strategy: Strategy.IsEmail, errorMsg: '用户名字段必须为有效邮箱' }
    ])
    validator.add(password, [
      { strategy: Strategy.IsNotEmpty, errorMsg: '密码字段不能为空' },
      { strategy: Strategy.MinLength, errorMsg: '密码字段不能小于6位有效字符', dataLength: 6 },
      { strategy: Strategy.MaxLength, errorMsg: '密码字段不能大18位有效字符', dataLength: 18 }
    ])
    return validator.start()
  }

  function confirmDataCheck () {
    return password !== confirmPw
      ? '输入密码不一致'
      : ''
  }

  function handleSignInResult (errMsg: string) {
    if (errMsg) {
      message.error(errMsg)
    } else {
      message.success(`欢迎使用\n本地时间: ${new Date().toLocaleDateString()}`)
      history.replace('/')
    }
  }

  function handleSignUpResult (errMsg: string) {
    if (errMsg) {
      message.error(errMsg)
    } else {
      message.success('注册成功')
      initialForm()
    }
  }

  function handleSubmit () {
    const errorMsg = normalDataCheck()
    if (errorMsg) {
      return message.error(errorMsg)
    }

    const confirmError = isLogin || confirmDataCheck()
    if (confirmError && typeof confirmError !== 'boolean') {
      return message.error(confirmError)
    }

    if (isLogin) {
      thunkSignIn({ username, password })
        .then(handleSignInResult)
    } else {
      thunkSignUp({ username, password })
        .then(handleSignUpResult)
    }

  }

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item help={<FormItemHelper>邮箱格式</FormItemHelper>}>
        <Input prefix={<UserOutlined />} placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value.trim())}
        />
      </Form.Item>

      <Form.Item help={<FormItemHelper>6~18位有效字符</FormItemHelper>}>
        <Input
          prefix={<LockOutlined />}
          suffix={renderEyeNode(showPassword, () => {setShowPassword(!showPassword)})}
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value.trim())}
        />
      </Form.Item>

      {
        // 注册账户时添加密码确认输入框
        !isLogin && (
          <Form.Item help={<FormItemHelper>6~18位有效字符</FormItemHelper>}>
            <Input
              prefix={<LockOutlined />}
              suffix={renderEyeNode(showConfirmPw, () => {setShowConfirmPw(!showConfirmPw)})}
              type={showConfirmPw ? 'text' : 'password'}
              placeholder="ConfirmPassword"
              value={confirmPw}
              onChange={e => setConfirmPw(e.target.value.trim())}
            />
          </Form.Item>
        )
      }

      <Form.Item>
        <Button loading={isSubmitting} type="primary" htmlType="submit" block>
          {isLogin ? '登录' : '注册'}
        </Button>
      </Form.Item>

    </Form>
  )
}

export default withRouter(connector(FormContent))
