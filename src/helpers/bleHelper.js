import BleManager from 'react-native-ble-manager';
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
}
