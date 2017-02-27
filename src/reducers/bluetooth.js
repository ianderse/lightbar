import * as types from '../redux/actionTypes';

const initialState = {
  deviceId: null
}

function bluetooth (state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_CONNECTED_DEVICE:
      return {
        ...state,
        deviceId: action.deviceId
      };
    case types.DISCONNECT_DEVICE:
        return {
          ...state,
          deviceId: null
        };
    default:
      return state;
  }
}

export default bluetooth;
