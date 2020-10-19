import { useEffect, useState } from 'react'

function useLocationSearch (search: string, key: string): [boolean, string] {
  const [hasKey, setHasKey] = useState<boolean>(false)
  const [keyVal, setKeyVal] = useState<string>('')

  useEffect(() => {
    const searchParams = new URLSearchParams(search)
    setHasKey(searchParams.has(key))
    setKeyVal(searchParams.get(key) || '')
  }, [search, key])

  return [hasKey, keyVal]
}

export default useLocationSearch