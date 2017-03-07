import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import AppWithNavigation from './navigation';
import store from './store';
import { ThemeProvider } from 'react-native-material-ui';

const uiTheme = {
  palette: {
    primaryColor: '#77C9D4',
    accentColor: '#009688',
    canvasColor: '#fff',
    borderColor: '#BDBDBD',
    primaryTextColor: '#212121',
    secondaryTextColor: '#757575',
  },
};

class MyApp extends Component {
  render() {
    return (
      <Provider store={store}>
        <ThemeProvider uiTheme={uiTheme}>
          <AppWithNavigation/>
        </ThemeProvider>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('MyApp', () => MyApp);
