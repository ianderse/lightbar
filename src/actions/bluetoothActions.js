import * as types from '../redux/actionTypes';

export const updateConnectedDevice = (device) => {
  return {
    type: types.UPDATE_CONNECTED_DEVICE,
    device
  }
}

export const disconnectDevice = () => {
  return {
    type: types.DISCONNECT_DEVICE
  }
}
