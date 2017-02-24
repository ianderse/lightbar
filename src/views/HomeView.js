import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  AsyncStorage
} from 'react-native';

export default class HomeView extends Component {
  constructor(props) {
    super(props)
    this.state = { userName: '', loggedIn: false }
    this.persistData = this.persistData.bind(this);
    this.clearData = this.clearData.bind(this);
  }

  static navigationOptions = {
    title: "Login",
  }

  componentWillMount() {
    this.getData();
  }

  clearData() {
    AsyncStorage.clear();
    this.setState({userName: '', loggedIn: false});
  }

  persistData() {
    AsyncStorage.setItem('userName', this.state.userName).done();
    this.setState({loggedIn: true});
  }

  getData() {
    AsyncStorage.getItem('userName').then((name) => {
      if (name) {
        this.setState({userName: name, loggedIn: true})
      };
    });
  }

  createLoginLogoutButton() {
    let button;

    if (this.state.loggedIn) {
      button = (
        <Button
          title="Logout"
          onPress={this.clearData}
        />
      );
    } else {
      button = (
        <Button
          title="Login"
          onPress={this.persistData}
        />
      );
    }

    return button;
  }

  render() {
    const { navigate } = this.props.navigation;
    var buttonTitle = `Go to Demo Page ${this.state.userName}`
    var loginLogoutButton = this.createLoginLogoutButton();

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Enter username:
        </Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          value={this.state.userName}
          onChangeText={(text) => this.setState({userName: text})}
        />
        {loginLogoutButton}
        <Button
          title={buttonTitle}
          onPress={() => navigate('Demo', { title: 'Demo Page' })}
        />
        <Button
          title="Go to Bluetooth Page"
          onPress={() => navigate('Ble', { title: 'Bluetooth Page' })}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
