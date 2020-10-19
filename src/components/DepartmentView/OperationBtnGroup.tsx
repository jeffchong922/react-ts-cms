import React from 'react'
import { Button } from 'antd'
import styled from 'styled-components'

import ConfirmButton from '../ConfirmButton'

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
        <ConfirmButton type='primary' wantToDo={deleteFunc} modalTitleDataName={deleteName} danger>删除</ConfirmButton>
    </OperationBtnWrapper>
  )
}

export default OperationBtnGroup
