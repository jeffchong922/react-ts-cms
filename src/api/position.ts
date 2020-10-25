import makeRequestClient, { requestRejected } from "../helpers/request";
import { AddPositionResult, NewPosition } from "./types";

const url = process.env.REACT_APP_POSITION_BASE_URL || 'http://localhost:8090'

const client = makeRequestClient({ baseURL: url })

export default Object.freeze({
  add (positionInfo: NewPosition) {
    return client.postWithToken<AddPositionResult>('/positions', positionInfo)
      .then(res => res.data, requestRejected())
  }
})