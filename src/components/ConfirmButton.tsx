import React from 'react'
import { Button } from 'antd'
import { BaseButtonProps } from 'antd/lib/button/button'

import showConfirmModal, { ShowConfirmModalProps } from './show-confirm'

const ConfirmButton: React.FC<ShowConfirmModalProps & BaseButtonProps> = (props) => {
  const {
    modalTitleDataName, modalTitleOptionStr, wantToDo,
    children,
    ...buttonProps
  } = props

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
