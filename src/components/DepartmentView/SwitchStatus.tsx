import React, { useState } from 'react'
import { Switch } from 'antd'
import { SwitchProps } from 'antd/lib/switch'

interface SwitchStatus extends SwitchProps {
  status: boolean;
  onChangeStatus: (status: boolean) => Promise<any>
}
const SwitchStatus: React.FC<SwitchStatus> = ({ status, onChangeStatus, ...switchProps }) => {
  const [loading, setLoading] = useState<boolean>(false)

  function handleClick () {
    setLoading(true)

    // 想要改变的状态为当前数据取反
    onChangeStatus(!status).finally(() => {
      setLoading(false)
    })
  }

  return (
    <Switch loading={loading} checked={status} onClick={handleClick} {...switchProps}/>
  )
}

export default SwitchStatus
