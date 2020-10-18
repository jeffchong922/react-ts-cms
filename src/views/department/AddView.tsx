import { message } from 'antd'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'

import departmentApi, { INewDepartment, IUpdateDepartment } from '../../api/department'
import NewDepartmentForm, { SubmitData, InitialFormFields, NewDepartmentFormRef } from '../../components/DepartmentView/NewDepartmentForm'

function addWay (departmentInfo: INewDepartment) {
  return departmentApi.add(departmentInfo).then(() => { message.success('注册成功') })
    .catch(errMsg => {
      message.error(errMsg)
      return Promise.reject()
    })
}

function updateWay (updateDepartmentInfo: IUpdateDepartment) {
  return departmentApi.update(updateDepartmentInfo).then(() => { message.success('更新成功') })
    .catch(errMsg => {
      message.error(errMsg)
      return Promise.reject()
    })
}

const DepartmentAddView: React.FC<RouteComponentProps> = ({ location: { search }, history }) => {
  const [searchId, setSearchId] = useState('')
  const [fetched, setFetched] = useState<InitialFormFields>({})
  const [isNewDepartment, setIsNewDepartment] = useState<boolean>(true)
  const formRef = useRef<NewDepartmentFormRef>(null)

  const getDepartmentInfoById = useCallback((id: string) => {
    return departmentApi.fetch({ id })
      .then(result => {
        const departmentList = result.fetched.list
        if (departmentList.length <= 0) {
          message.error(`获取指定数据失败`)
          history.replace('/department/list')
        } else {
          return departmentList[0]
        }
      })
      .catch(errMsg => {
        message.error(errMsg)
        history.replace('/department/list')
      })
  }, [history])

  useEffect(() => {
    const searchParams = new URLSearchParams(search)
    const hasId = searchParams.has('id')
    const id = searchParams.get('id') || ''
    setIsNewDepartment(!hasId)
    setSearchId(id)

    hasId && getDepartmentInfoById(id).then(data => {
      if (data) {
        setFetched({
          name: data.name,
          status: data.status,
          memberCount: data.memberCount,
          introduction: data.introduction
        })
      }
    })

    !hasId && formRef.current && formRef.current.resetForm()
  }, [search, getDepartmentInfoById])

  function handleSubmit ({ name, status, memberCount, introduction }: SubmitData) {
    if (isNewDepartment) {
      return addWay({ name, status, memberCount, introduction })
    } else {
      return updateWay({ id: searchId, name, status, memberCount, introduction })
    }
  }

  return (
    <>
      <NewDepartmentForm ref={formRef} onSubmit={handleSubmit} initialFormFields={fetched}/>
    </>
  )
}

export default withRouter(DepartmentAddView)
