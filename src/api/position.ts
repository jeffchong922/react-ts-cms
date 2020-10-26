import { AxiosRequestConfig } from "axios";
import makeRequestClient, { requestRejected } from "../helpers/request";
import { createObjList } from "../helpers/tools";
import { AddPositionResult, FetchPositions, FetchPositionsResult, NewPosition, UpdatePosition } from "./types";

const url = process.env.REACT_APP_POSITION_BASE_URL || 'http://localhost:8090'

const client = makeRequestClient({ baseURL: url })

export default Object.freeze({
  add (positionInfo: NewPosition) {
    return client.postWithToken<AddPositionResult>('/positions', positionInfo)
      .then(res => res.data, requestRejected())
  },
  fetch ({ searchName, id, departmentIds }: FetchPositions = {}) {
    const objList = createObjList<string>(departmentIds || [], 'depart')
    const config: AxiosRequestConfig = {
      params: {
        id: id || undefined,
        searchName: searchName || undefined,
        ...objList
      }
    }
    return client.getWithToken<FetchPositionsResult>('/positions', config)
      .then(res => res.data, requestRejected())
  },
  update (updateData: UpdatePosition) {
    return client.putWithToken('/positions', updateData)
      .then(res => res.data, requestRejected())
  }
})