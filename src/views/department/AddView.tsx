import React from 'react'

import departmentApi from '../../api/department'
import NewDepartmentForm from '../../components/DepartmentView/NewDepartmentForm'

const DepartmentAddView = () => {
  return (
    <>
      <NewDepartmentForm addDepartment={departmentApi.add}/>
    </>
  )
}

export default DepartmentAddView
