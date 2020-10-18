import { message } from 'antd'
import React from 'react'
import styled from 'styled-components'

import authApi from '../api/auth'
import FormContent, { SubmitData } from '../components/AuthView/FormContent'
import useToggle from '../hooks/useToggle'

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

const AuthView = () => {
  const [isLogin, toggleIsLogin] = useToggle(true)

  function handleSubmit (data: SubmitData) {
    if (isLogin) {
      return signIn(data)
    } else {
      return signUp(data)
    }
  }

  function signIn (userInfo: SubmitData) {
    return authApi.signIn(userInfo)
      .then(result => {
        console.log('sign-in token : ', result.token)
      }).catch(errMsg => {
        message.error(errMsg)
        return Promise.reject(null)
      })
  }
  
  function signUp (userInfo: SubmitData) {
    return authApi.signUp(userInfo)
      .then(result => {
        message.success(`注册成功`)
        console.log(`用户id : ${result.registered.id} 用户邮箱 : ${result.registered.username}`)
      }).catch(errMsg => {
        message.error(errMsg)
        return Promise.reject(null)
      })
  }

  return (
    <FormWrapper>
      <FormHeader>
        <FormTitle>{isLogin ? '登录' : '注册'}</FormTitle>
        <FormToggle onClick={toggleIsLogin}>{isLogin ? '用户注册' : '用户登录'}</FormToggle>
      </FormHeader>
      <FormContent
        isLogin={isLogin}
        onSubmit={handleSubmit}
      />
    </FormWrapper>
  )
}

export default AuthView