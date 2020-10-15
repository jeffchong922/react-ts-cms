import React, { useState } from 'react'
import styled from 'styled-components'
import { Form, Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'

import authApi from '../api/auth'
import makeValidator, { Strategy } from '../helpers/validator'

const FormWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 320px;
  padding: 0 10px;
  height: 100vh;
  margin: auto;
`
const FormHeader = styled.header`
  height: 56px;
  width: 100%;
  line-height: 56px;
`
const FormTitle = styled.h3`
  float: left;
  margin: 0;
  font-size: 16px;
  color: #fff;
  user-select: none;
`
const FormToggle = styled.span`
  float: right;
  color: rgba(255, 255, 255, 0.3);
  user-select: none;
  cursor: pointer;
`
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

const AuthView = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPw, setConfirmPw] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPw, setShowConfirmPw] = useState(false)
  
  function formToggle () {
    if (isSubmitting) return
    initialForm()
    setIsLogin(!isLogin)
  }

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

  function handleSubmit () {
    const errorMsg = normalDataCheck()
    if (errorMsg) {
      return alert(errorMsg)
    }

    const confirmError = isLogin || confirmDataCheck()
    if (confirmError && typeof confirmError !== 'boolean') {
      return alert(confirmError)
    }

    setIsSubmitting(true)
    
    if (isLogin) {
      signIn()
    } else {
      signUp()
    }
  }

  function signIn () {
    authApi.signIn({ username, password }).then(result => {
      console.log('sign-in : ', result)
    }).catch(errorMsg => {
      message.error(errorMsg)
    }).finally(() => setIsSubmitting(false))
  }

  function signUp () {
    authApi.signUp({ username, password }).then(result => {
      message.success('注册成功')
      setIsSubmitting(false)
      formToggle()
    }).catch(errorMsg => {
      message.error(errorMsg)
    }).finally(() => setIsSubmitting(false))
  }

  return (
    <FormWrapper>
      <FormHeader>
        <FormTitle>{isLogin ? '登录' : '注册'}</FormTitle>
        <FormToggle onClick={formToggle}>{isLogin ? '用户注册' : '用户登录'}</FormToggle>
      </FormHeader>

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
    </FormWrapper>
  )
}

export default AuthView