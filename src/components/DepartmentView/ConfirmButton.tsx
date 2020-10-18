import React from 'react'
import { Button } from 'antd'
import { BaseButtonProps } from 'antd/lib/button/button'

import showConfirmModal, { ShowConfirmModalProps } from '../show-confirm'

interface ConfirmButtonProps extends ShowConfirmModalProps, BaseButtonProps {
  
}
const ConfirmButton: React.FC<ConfirmButtonProps> = ({ modalTitleDataName, modalTitleOptionStr, wantToDo, children, ...buttonProps }) => {

  function handleCLick () {
    showConfirmModal({ modalTitleDataName, wantToDo, modalTitleOptionStr })
  }

  return (
    <Button onClick={handleCLick} {...buttonProps}>
      {children}
    </Button>
  )
}

export default ConfirmButton
