import { StackNavigator } from 'react-navigation';

import HomeView from './views/HomeView';
import DemoView from './views/DemoView';
import BluetoothView from './views/BluetoothView';
import DeviceView from './views/DeviceView';

export default StackNavigator({
  Home: {screen: HomeView},
  Demo: {screen: DemoView},
  Ble: {screen: BluetoothView},
  Device: {screen: DeviceView},
});
