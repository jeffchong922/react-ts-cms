import { useEffect, useState } from 'react'
import apiGroup from '../api'

export interface department {
  id: string
  name: string
}

function useDepartmentsName (): [department[], boolean] {
  const [array, setArray] = useState<department[]>([])
  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    setIsFetching(true)
    apiGroup.departmentApi.fetchOnlyName().then(result => {
      setArray(result.fetched.list)
    }).finally(() => setIsFetching(false))

  }, [])

  return [array, isFetching];
}

export default useDepartmentsName