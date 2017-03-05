import * as types from '../redux/actionTypes';
import { AsyncStorage } from 'react-native';

const initialState = {
  deviceId: null,
  sliderValue: null,
}

function bluetooth (state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_CONNECTED_DEVICE:
      console.log('ucd' + action.deviceId);
      return {
        ...state,
        deviceId: action.deviceId
      };
    case types.DISCONNECT_DEVICE:
      AsyncStorage.removeItem('deviceId');
      return {
        ...state,
        deviceId: null
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
