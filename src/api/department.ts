import makeRequestClient, { requestRejected } from "../helpers/request";

const url = process.env.REACT_APP_DEPARTMENT_BASE_URL || 'http://localhost:8090'

const client = makeRequestClient({ baseURL: url })

export interface INewDepartment {
  name: string;
  memberSize: number;
  status: boolean;
  introduction: string;
}
interface IInserted {
  id: string;
  name: string;
  status: boolean;
  memberCount: number;
  introduction: string;
}
interface IAddDepartmentResult {
  inserted: IInserted;
}
export default Object.freeze({
  add (departmentInfo: INewDepartment) {
    return client.postWithToken<IAddDepartmentResult>('/departments', departmentInfo)
      .then(res => res.data, requestRejected())
  }
})