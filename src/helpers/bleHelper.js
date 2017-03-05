/*global Uint8Array */
import BleManager from 'react-native-ble-manager';
import base64 from 'base64-js';
import {
  Platform,
  PermissionsAndroid
} from 'react-native';

export default class BleHelper {
  static handleScan() {
    BleManager.scan([], 2, false);
  }

  static androidCheck() {
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      PermissionsAndroid.checkPermission(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
        if (result) {
          return;
        } else {
          PermissionsAndroid.requestPermission(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
            if (result) {
              return;
            } else {
              return;
            }
          });
        }
      });
    }
  }

  static stringToBytes(string) {
    var array = new Uint8Array(string.length);
    for (var i = 0, l = string.length; i < l; i++) {
      array[i] = string.charCodeAt(i);
    }
    return array;
  }

  static sendCommand(deviceId, command) {
    const stbCommand = new Uint8Array(this.stringToBytes(command));
    var data = base64.fromByteArray(stbCommand);
    const UARTServiceId = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
    const TXServiceId = '6e400002-b5a3-f393-e0a9-e50e24dcca9e';

    BleManager.write(deviceId, UARTServiceId, TXServiceId, data)
      .then(() => {
        return;
      })
      .catch((error) => {
        return error;
      });
  }
}
