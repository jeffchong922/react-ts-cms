import React, { useState } from 'react'
import styled from 'styled-components'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'

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
`
const FormToggle = styled.span`
  float: right;
  color: rgba(255, 255, 255, 0.3);
  user-select: none;
  cursor: pointer;
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
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPw, setShowConfirmPw] = useState(false)
  
  function formToggle () {
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

  function handleSubmit () {
    if (isLogin) {
      signIn()
    } else {
      signUp()
    }
  }

  function signIn () {
    const errorMsg = normalDataCheck()
    if (errorMsg) {
      return alert(errorMsg)
    }
  }

  function signUp () {
    const errorMsg = normalDataCheck()
    if (errorMsg) {
      return alert(errorMsg)
    }
    if (password !== confirmPw) {
      return alert('密码不一致')
    }
  }

  return (
    <FormWrapper>
      <FormHeader>
        <FormTitle>{isLogin ? '登录' : '注册'}</FormTitle>
        <FormToggle onClick={formToggle}>{isLogin ? '用户注册' : '用户登录'}</FormToggle>
      </FormHeader>

      <Form onFinish={handleSubmit}>
        <Form.Item>
          <Input prefix={<UserOutlined />} placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </Form.Item>

        <Form.Item>
          <Input
            prefix={<LockOutlined />}
            suffix={renderEyeNode(showPassword, () => {setShowPassword(!showPassword)})}
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Item>

        {
          // 注册账户时添加密码确认输入框
          !isLogin && (
            <Form.Item>
              <Input
                prefix={<LockOutlined />}
                suffix={renderEyeNode(showConfirmPw, () => {setShowConfirmPw(!showConfirmPw)})}
                type={showConfirmPw ? 'text' : 'password'}
                placeholder="ConfirmPassword"
                value={confirmPw}
                onChange={e => setConfirmPw(e.target.value)}
              />
            </Form.Item>
          )
        }

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            登录
          </Button>
        </Form.Item>

      </Form>
    </FormWrapper>
  )
}

export default AuthView