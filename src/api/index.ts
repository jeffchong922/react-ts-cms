import authApi from './auth'
import departmentApi from './department'


const apiGroup = Object.freeze({
  authApi,
  departmentApi
})

export type ApiGroup = typeof apiGroup
export default apiGroup