import { useState } from 'react'

function useToggle (initialValue: boolean = true): [boolean, () => void] {
  const [value, setValue] = useState(initialValue)

  const toggleValue = () => setValue(!value)

  return [value, toggleValue]
}

export default useToggle