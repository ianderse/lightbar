import * as types from '../redux/actionTypes';

const initialState = {
  device: null
}

function bluetooth (state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_CONNECTED_DEVICE:
      return {
        ...state,
        device: action.device
      };
    case types.DISCONNECT_DEVICE:
        return {
          ...state,
          device: null
        };
    default:
      return state;
  }
}

export default bluetooth;
