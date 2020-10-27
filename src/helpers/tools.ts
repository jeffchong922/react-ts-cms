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

export type DebounceProcedure = (...args: any[]) => void
export type DebounceOptions = {
  isImmediate: boolean,
}
export type DebounceResult<F extends DebounceProcedure> = (this: ThisParameterType<F>, ...args: Parameters<F>) => void
export function debounce<F extends DebounceProcedure> (fn: F, waitMilliseconds: number = 50, options: DebounceOptions = { isImmediate: false }): DebounceResult<F> {
  let timer: ReturnType<typeof setTimeout> | undefined
  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    const context = this
    const doLater = function() {
      timer = undefined
      if (!options.isImmediate) {
        fn.apply(context, args)
      }
    }
    const shouldCallNow = options.isImmediate && timer === undefined
    if (timer !== undefined) {
      clearTimeout(timer)
    }
    timer = setTimeout(doLater, waitMilliseconds);
    if (shouldCallNow) {
      fn.apply(context, args)
    }
  }
}