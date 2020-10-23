export function prop<T, K extends keyof T> (obj: T, key: K): T[K] {
  return obj[key]
}

export function setProp<T, K extends keyof T> (obj: T, key: K, val: T[K] | undefined): T {
  const o = Object.assign({}, obj)
  if (typeof val !== 'undefined') {
    o[key] = val
  }
  return o
}

export function flatten<T = any> (array: Array<T | T[]>): T[] {
  return array.reduce<T[]>(
    (list, v) => (
      list.concat(
        Array.isArray(v)
          ? flatten(v)
          : v
      )
    ),
    []
  )
}

export function getObjKeys<T> (obj: T): Array<keyof T> {
  return Object.keys(obj) as Array<keyof T>
}

interface CreateObjListRetVal<T> {
  [props: string]: T
}
export function createObjList<T> (list: Array<T>, prefix: string = ''): CreateObjListRetVal<T> {
  const retVal: CreateObjListRetVal<T> = {}
  list.forEach((val, idx) => {
    retVal[`${prefix}${idx}`] = val
  })
  return retVal
}