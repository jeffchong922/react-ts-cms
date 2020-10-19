import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import styled from 'styled-components'

import FormContent from '../components/AuthView/FormContent'
import { setFormState } from '../redux/auth/actions'
import { RootState } from '../redux/reducers'

const mapState = (state: RootState) => ({
  formState: state.auth.formState,
  isSubmitting: state.auth.isSubmitting
})
const mapDispatch = {
  setFormState
}
const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>

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

const AuthView: React.FC<PropsFromRedux> = (props) => {
  const { isSubmitting, setFormState, formState: { isLogin } } = props

  function handleToggleClick () {
    if (!isSubmitting) {
      setFormState({ isLogin: !isLogin })
    }
  }

  return (
    <FormWrapper>
      <FormHeader>
        <FormTitle>{isLogin ? '登录' : '注册'}</FormTitle>
        <FormToggle onClick={handleToggleClick}>{isLogin ? '用户注册' : '用户登录'}</FormToggle>
      </FormHeader>
      <FormContent/>
    </FormWrapper>
  )
}

export default connector(AuthView)