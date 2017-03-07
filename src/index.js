import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import AppWithNavigation from './navigation';
import store from './store';
import { ThemeProvider } from 'react-native-material-ui';

class MyApp extends Component {
  render() {
    return (
      <Provider store={store}>
        <ThemeProvider>
          <AppWithNavigation/>
        </ThemeProvider>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('MyApp', () => MyApp);
