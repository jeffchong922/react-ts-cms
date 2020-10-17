import React from 'react'
import { Modal } from 'antd'
import { ModalFuncProps } from 'antd/lib/modal'

const { confirm } = Modal

function renderConfirmTitle (deleteName: string) {
  return <p>你确定要 <strong style={{ color: 'red' }}>删除</strong> <span style={{ color: 'blueviolet' }}>{deleteName}</span> 数据吗?</p>
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

interface ShowConfirmModalProps {
  dataName: string;
  wantToDo: () => Promise<any>
}
const showConfirmModal = ({ dataName, wantToDo }: ShowConfirmModalProps) => {
  const modal = confirm({
    keyboard: true,
    maskClosable: true,
    title: renderConfirmTitle(dataName),
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
