import { StackNavigator } from 'react-navigation';

import HomeView from './views/HomeView';
import BluetoothView from './views/BluetoothView';
import DeviceView from './views/DeviceView';

export default StackNavigator({
  Home: {screen: HomeView},
  Ble: {screen: BluetoothView},
  Device: {screen: DeviceView},
});
