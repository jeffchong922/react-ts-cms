import React from 'react'
import { Button } from 'antd'
import styled from 'styled-components'

import showConfirmModal from '../show-confirm'

const OperationBtnWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  align-content: space-around;
`

interface OperationBtnGroupProps {
  deleteName: string;
  deleteFunc: () => Promise<any>;
  editFunc: () => void;
}
const OperationBtnGroup: React.FC<OperationBtnGroupProps> = ({ deleteName, deleteFunc, editFunc }) => {
  return (
    <OperationBtnWrapper>
        <Button type='primary' onClick={editFunc}>编辑</Button>
        <Button type='primary' onClick={() => {
          showConfirmModal({ dataName: deleteName, wantToDo: deleteFunc })
        }} danger>删除</Button>
    </OperationBtnWrapper>
  )
}

export default OperationBtnGroup
