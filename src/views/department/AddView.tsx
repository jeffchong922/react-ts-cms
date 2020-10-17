import React, { useEffect, useState } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'

import departmentApi from '../../api/department'
import NewDepartmentForm from '../../components/DepartmentView/NewDepartmentForm'

const DepartmentAddView: React.FC<RouteComponentProps> = ({ location: { search } }) => {
  const [searchId, setSearchId] = useState('')
  const [isNewDepartment, setIsNewDepartment] = useState<boolean>(true)

  useEffect(() => {
    const searchParams = new URLSearchParams(search)
    const hasId = searchParams.has('id')
    const id = searchParams.get('id') || ''
    setIsNewDepartment(hasId)
    setSearchId(id)

    if (hasId) {
      departmentApi.fetch({ id }).then(result => console.log(result)).catch(errMsg => console.error(errMsg))
    }

  }, [search])

  return (
    <>
      <NewDepartmentForm addDepartment={departmentApi.add}/>
    </>
  )
}

export default withRouter(DepartmentAddView)
