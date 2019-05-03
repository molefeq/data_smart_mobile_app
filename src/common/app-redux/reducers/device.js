import { DEVICE_FETCHED } from "../actions/deviceActionTypes";

function device(state = null, action) {
  switch (action.type) {
    case DEVICE_FETCHED:
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}

export default device;
