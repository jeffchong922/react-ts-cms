import { AxiosRequestConfig } from "axios";
import makeRequestClient, { requestRejected } from "../helpers/request";
import { createObjList } from "../helpers/tools";

const url = process.env.REACT_APP_DEPARTMENT_BASE_URL || 'http://localhost:8090'

const client = makeRequestClient({ baseURL: url })

export interface NewDepartment {
  name: string;
  memberCount: number;
  status: boolean;
  introduction: string;
}
export interface FetchDepartments {
  id?: string;
  searchName?: string;
  pageNumber?: number;
  pageSize?: number;
}
export interface DeleteDepartment {
  deleteArray: Array<string>;
}
export type UpdateDepartment = {
  [index in keyof NewDepartment]?: NewDepartment[index];
} & {
  id: string;
};
export type Department = {
  id: string;
  belonger: {
    id: string;
    username: string;
  }
} & {
  [index in keyof NewDepartment]: NewDepartment[index];
}

export interface AddDepartmentResult {
  inserted: Department
}
export interface FetchDepartmentsResult {
  fetched: {
    list: Array<Department>;
    total: number;
  }
}
interface DeleteDepartmentResult {
  deleted: {
    deleteCount: number;
    message: string;
  }
}

export interface FetchDepartmentsOnlyNameResult {
  fetched: {
    list: Array<{
      id: string
      name: string
    }>,
    total: number
  }
}
export default Object.freeze({
  add (departmentInfo: NewDepartment) {
    return client.postWithToken<AddDepartmentResult>('/departments', departmentInfo)
      .then(res => res.data, requestRejected())
  },
  fetch ({ id, pageNumber = 1, pageSize = 10, searchName = '' }: FetchDepartments = {}) {
    const config: AxiosRequestConfig = {
      params: {
        departId: id,
        pageNumber,
        searchName: searchName || undefined,
        pageSize,
      }
    }
    return client.getWithToken<FetchDepartmentsResult>('/departments', config)
      .then(res => res.data, requestRejected())
  },
  fetchOnlyName () {
    const config: AxiosRequestConfig = {
      params: {
        nameOnly: true
      }
    }
    return client.getWithToken<FetchDepartmentsOnlyNameResult>('/departments', config)
      .then(res => res.data, requestRejected())
  },
  delete ({ deleteArray }: DeleteDepartment) {
    const deleteObjList = createObjList(deleteArray, 'depart')
    return client.deleteWithToken<DeleteDepartmentResult>('/departments', {
      params: {
        total: deleteArray.length,
        ...deleteObjList
      }
    })
      .then(res => res.data, requestRejected())
  },
  update (updateDepartmentInfo: UpdateDepartment) {
    return client.putWithToken('/departments', updateDepartmentInfo)
      .then(res => res.data, requestRejected())
  }
})