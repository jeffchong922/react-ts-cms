import React from 'react'
import { Modal } from 'antd'
import { ModalFuncProps } from 'antd/lib/modal'

const { confirm } = Modal

function renderConfirmTitle (dataName: string, optionStr: string = '删除') {
  return <p>您确定要 <strong style={{ color: 'red' }}>{optionStr}</strong> <span style={{ color: '#7d0000' }}>{dataName}</span> 吗?</p>
}

type modal = {
  destroy: () => void;
  update: (newConfig: ModalFuncProps) => void;
}
function submitting (modal: modal) {
  modal.update({
    keyboard: false,
    maskClosable: false,
    onCancel (close) {}
  })
}

export interface ShowConfirmModalProps {
  modalTitleDataName: string;
  modalTitleOptionStr?: string;
  wantToDo: () => Promise<any>
}
const showConfirmModal = ({ modalTitleDataName, modalTitleOptionStr, wantToDo }: ShowConfirmModalProps) => {
  const modal = confirm({
    keyboard: true,
    maskClosable: true,
    title: renderConfirmTitle(modalTitleDataName, modalTitleOptionStr),
    onOk() {
      return new Promise((resolve, reject) => {
        submitting(modal)
        wantToDo().finally(resolve)
      })
    },
    okText: '确认',
    okButtonProps: {
      danger: true
    },
    cancelText: '取消'
  })
}

export default showConfirmModal
