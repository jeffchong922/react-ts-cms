import { useState } from 'react'

interface IUseInputEvent<T> {
  target: {
    value: T
  }
}
function useInput<S> (initialValue: S | (() => S)): [S, (e: IUseInputEvent<S>) => void, () => void] {
  const [value, setValue] = useState<S>(initialValue)

  function setValueFromEvent (event: IUseInputEvent<S>) {
    setValue(event.target.value)
  }

  function resetValue () {
    setValue(initialValue)
  }

  return [value, setValueFromEvent, resetValue]
}

export default useInput