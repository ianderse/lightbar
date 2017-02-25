import * as types from '../redux/actionTypes';

export const updateConnectedDevice = (deviceId) => {
  return {
    type: types.UPDATE_CONNECTED_DEVICE,
    deviceId
  }
}

export const disconnectDevice = () => {
  return {
    type: types.DISCONNECT_DEVICE
  }
}
