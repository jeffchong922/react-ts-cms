import { useState } from 'react'

function useBoolean (initialValue: boolean = true): [boolean, () => void, () => void] {
  const [value, setValue] = useState(initialValue)

  const setTrue = () => setValue(true)
  const setFalse = () => setValue(false)

  return [value, setTrue, setFalse]
}

export default useBoolean