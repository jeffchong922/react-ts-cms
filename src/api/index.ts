import authApi from './auth'
import departmentApi from './department'
import positionApi from './position'


const apiGroup = Object.freeze({
  authApi,
  departmentApi,
  positionApi
})

export type ApiGroup = typeof apiGroup
export default apiGroup