import React from 'react'
import { Select, Spin } from 'antd'

import useDepartmentsName from '../../hooks/useDepartmentsName'

const { Option } = Select

export type SelectedType = string[] | string | undefined
export interface SelectDepartmentsProps {
  selectedList: string[] | string
  setSelectedList: (selected: SelectedType) => void
  isMultiple?: boolean
  loading?: boolean
}
const SelectDepartments: React.VFC<SelectDepartmentsProps> = ({
  selectedList,
  setSelectedList,
  isMultiple = true,
  loading = false
}) => {
  const [nameList, isFetchingName] = useDepartmentsName()
  return (
    <Select
      allowClear
      showArrow
      disabled={loading}
      value={selectedList}
      mode={ isMultiple ? 'multiple' : undefined}
      onChange={setSelectedList}
      notFoundContent={isFetchingName ? <Spin size="small" /> : '无数据记录'}
    >
      {
        nameList.map(name => (
          <Option value={name.id} key={name.id}>{name.name}</Option>
        ))
      }
    </Select>
  )
}

export default SelectDepartments
