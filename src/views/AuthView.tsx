import React, { useState } from 'react'
import styled from 'styled-components'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'

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

  function renderEyeNode (isShow: boolean, callback: () => void ): React.ReactNode {
    return (
      isShow
        ? <EyeOutlined onClick={() => callback()} />
        : <EyeInvisibleOutlined onClick={() => callback()} />
    )
  }

  return (
    <FormWrapper>
      <FormHeader>
        <FormTitle>{isLogin ? '登录' : '注册'}</FormTitle>
        <FormToggle onClick={formToggle}>{isLogin ? '用户注册' : '用户登录'}</FormToggle>
      </FormHeader>
      <Form>
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
          !isLogin
            ? (
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
            : null
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

