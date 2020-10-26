import React from 'react'
import { message } from 'antd'

import ConfirmButton from './ConfirmButton'

export type DeleteArray = string[]

export interface DeleteManyBtnProps {
  deleteArray: DeleteArray
  thunkDelete: ({ deleteArray }: { deleteArray: DeleteArray }) => Promise<string | undefined>
  thunkFetch?: () => Promise<string | undefined>
}

const DeleteManyBtn: React.FC<DeleteManyBtnProps & { children?: string }> = (props) => {
  const {
    children,
    deleteArray , thunkDelete, thunkFetch
  } = props

  async function handleDeleteMany () {
    if (deleteArray.length <= 0) {
      return
    }
    await thunkDelete({ deleteArray })
      .then(errMsg => {
        errMsg && message.error(errMsg)
      })
    thunkFetch && await thunkFetch()
      .then(errMsg => {
        errMsg && message.error(errMsg)
      })
  }

  return (
    <ConfirmButton
      modalTitleOptionStr='删除'
      modalTitleDataName={`选中的 ${deleteArray.length} 数据`}
      wantToDo={handleDeleteMany}
    >{children ? children : '批量删除'}</ConfirmButton>
  )
}

export default DeleteManyBtn