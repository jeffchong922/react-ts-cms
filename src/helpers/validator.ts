export enum Strategy {
  IsNotEmpty = 'isNotEmpty',
  MinLength = 'minLength',
  MaxLength = 'maxLength',
  IsEmail = 'isEmail'
}
interface StrategyArray {
  [index: string]: Function
} 
function makeStrategies () {
  function isNotEmpty (val: string, errorMsg?: string) {
    if (val.trim() === '') {
      return errorMsg || `数据不能为空字符串`
    }
  }

  function minLength (val: string, length: string, errorMsg?: string) {
    if (val.length < (+length)) {
      return errorMsg || `数据小于指定长度: ${length}`
    }
  }

  function maxLength (val: string, length: string, errorMsg?: string) {
    if (val.length > (+length)) {
      return errorMsg || `数据大于指定长度: ${length}`
    }
  }

  function isEmail (val: string, errorMsg?: string) {
    if (!(/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/.test(val))) {
      return errorMsg || `数据不符合邮箱验证规则`
    }
  }

  return Object.freeze<StrategyArray>({
    isNotEmpty,
    minLength,
    maxLength,
    isEmail
  })
}
const strategies = makeStrategies()

// ----------------分割线--------------------

interface Rule {
  strategy: Strategy;
  errorMsg?: string;
  dataLength?: number;
}
type ValidatorCache = () => string | void

function makeValidator () {
  const caches: Array<ValidatorCache> = []

  function add (val: string, rules: Array<Rule>) {
    for (let i = 0; i < rules.length; i++) {
      const rule = rules[i]
      const strategyAry: Array<string> = []

      const { strategy, dataLength = '6', errorMsg } = rule

      strategyAry.push(val)
      if ([Strategy.MaxLength, Strategy.MinLength].includes(strategy)) {
        strategyAry.push(dataLength + '')
      }
      errorMsg && strategyAry.push(errorMsg)

      caches.push(function () {
        if (strategy && (strategy in strategies)) {
          return strategies[strategy]!.apply(null, strategyAry)
        }
      })
    }
  }

  function start () {
    for (let i = 0; i < caches.length; i++) {
      const validatorFunc = caches[i]
      const errorMsg = validatorFunc()
      if (errorMsg) {
        return errorMsg
      }
    }
  }

  return Object.freeze({
    add,
    start
  })
}

export default makeValidator