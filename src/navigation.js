import { StackNavigator } from 'react-navigation';

import HomeView from './views/HomeView';
import DemoView from './views/DemoView';

export default StackNavigator({
  Home: {screen: HomeView},
  Demo: {screen: DemoView},
});
