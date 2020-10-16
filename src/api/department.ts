import { AxiosRequestConfig } from "axios";
import makeRequestClient, { requestRejected } from "../helpers/request";

const url = process.env.REACT_APP_DEPARTMENT_BASE_URL || 'http://localhost:8090'

const client = makeRequestClient({ baseURL: url })

export interface INewDepartment {
  name: string;
  memberSize: number;
  status: boolean;
  introduction: string;
}
export interface IFetchDepartments {
  id?: string;
  pageNumber?: number;
  pageSize?: number;
}

export interface IAddDepartmentResult {
  inserted: {
    id: string;
    name: string;
    status: boolean;
    memberCount: number;
    introduction: string;
  }
}
export interface IFetchDepartmentsResult {
  fetched: {
    list: Array<{
      id: string;
      name: string;
      introduction: string;
      memberCount: number;
      status: boolean;
      belonger: {
        id: string;
        username: string;
      }
    }>;
    total: number;
  }
}
export default Object.freeze({
  add (departmentInfo: INewDepartment) {
    return client.postWithToken<IAddDepartmentResult>('/departments', departmentInfo)
      .then(res => res.data, requestRejected())
  },
  fetch ({ id, pageNumber = 1, pageSize = 10 }: IFetchDepartments = {}) {
    const config: AxiosRequestConfig = {
      params: {
        departId: id,
        pageNumber,
        pageSize
      }
    }
    return client.getWithToken<IFetchDepartmentsResult>('/departments', config)
      .then(res => res.data, requestRejected())
  }
})