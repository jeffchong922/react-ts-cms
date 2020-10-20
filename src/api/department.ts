import { AxiosRequestConfig } from "axios";
import makeRequestClient, { requestRejected } from "../helpers/request";

const url = process.env.REACT_APP_DEPARTMENT_BASE_URL || 'http://localhost:8090'

const client = makeRequestClient({ baseURL: url })

function createObjectList (list: Array<string>, prefix: string = 'item') {
  const retVal: { [index: string]: string } = {}
  list.forEach((val, idx) => {
    retVal[`${prefix}${idx}`] = val
  })
  return retVal
}

export interface INewDepartment {
  name: string;
  memberCount: number;
  status: boolean;
  introduction: string;
}
export interface IFetchDepartments {
  id?: string;
  searchName?: string;
  pageNumber?: number;
  pageSize?: number;
}
export interface IDeleteDepartment {
  deleteArray: Array<string>;
}
export interface IUpdateDepartment {
  id: string;
  name?: string;
  memberCount?: number;
  status?: boolean;
  introduction?: string;
}
export interface IDepartment {
  id: string;
  name: string;
  introduction: string;
  memberCount: number;
  status: boolean;
  belonger: {
    id: string;
    username: string;
  }
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
    list: Array<IDepartment>;
    total: number;
  }
}
interface IDeleteDepartmentResult {
  deleted: {
    deleteCount: number;
    message: string;
  }
}
export default Object.freeze({
  add (departmentInfo: INewDepartment) {
    return client.postWithToken<IAddDepartmentResult>('/departments', departmentInfo)
      .then(res => res.data, requestRejected())
  },
  fetch ({ id, pageNumber = 1, pageSize = 10, searchName = '' }: IFetchDepartments = {}) {
    const config: AxiosRequestConfig = {
      params: {
        departId: id,
        pageNumber,
        searchName: searchName || undefined,
        pageSize,
      }
    }
    return client.getWithToken<IFetchDepartmentsResult>('/departments', config)
      .then(res => res.data, requestRejected())
  },
  delete ({ deleteArray }: IDeleteDepartment) {
    const deleteObjList = createObjectList(deleteArray, 'depart')
    return client.deleteWithToken<IDeleteDepartmentResult>('/departments', {
      params: {
        total: deleteArray.length,
        ...deleteObjList
      }
    })
      .then(res => res.data, requestRejected())
  },
  update (updateDepartmentInfo: IUpdateDepartment) {
    return client.putWithToken('/departments', updateDepartmentInfo)
      .then(res => res.data, requestRejected())
  }
})