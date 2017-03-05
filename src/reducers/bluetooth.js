import * as types from '../redux/actionTypes';
import { AsyncStorage } from 'react-native';

const initialState = {
  deviceId: null,
  sliderValue: 50,
}

function bluetooth (state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_CONNECTED_DEVICE:
      return {
        ...state,
        deviceId: action.deviceId
      };
    case types.DISCONNECT_DEVICE:
      AsyncStorage.removeItem('deviceId');
      return {
        ...state,
        deviceId: null,
        sliderValue: 50,
      };
    case types.UPDATE_SLIDER:
      return {
        ...state,
        sliderValue: action.newValue
      };
    default:
      return state;
  }
}

export default bluetooth;
