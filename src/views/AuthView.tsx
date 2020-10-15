import React, { useState } from 'react'
import styled from 'styled-components'

import authApi from '../api/auth'
import FormContent from '../components/AuthView/FormContent'

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
  const [isLogin, setIsLogin] = useState(true)
  
  function formToggle () {
    setIsLogin(!isLogin)
  }

  return (
    <FormWrapper>
      <FormHeader>
        <FormTitle>{isLogin ? '登录' : '注册'}</FormTitle>
        <FormToggle onClick={formToggle}>{isLogin ? '用户注册' : '用户登录'}</FormToggle>
      </FormHeader>
      <FormContent
        isLogin={isLogin}
        signIn={authApi.signIn}
        signUp={authApi.signUp}
      />
    </FormWrapper>
  )
}

export default AuthView