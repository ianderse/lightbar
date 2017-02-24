import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  AsyncStorage,
  TouchableHighlight
} from 'react-native';

import AppText from '../components/appText';

export default class HomeView extends Component {
  constructor(props) {
    super(props)
    this.state = { userName: '', password: '', loggedIn: false }
    this.persistData = this.persistData.bind(this);
    this.clearData = this.clearData.bind(this);
  }

  static navigationOptions = {
    header: {
      visible: false,
    }
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

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <AppText style={{marginBottom: 130}}>
          <Text style={styles.title}>
            Lightbar
          </Text>
        </AppText>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={this.state.userName}
          onChangeText={(text) => this.setState({userName: text})}
        />
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="Password"
          value={this.state.password}
          onChangeText={(text) => this.setState({password: text})}
        />
        <TouchableHighlight
          style={styles.button}
          onPress={() => navigate('Ble', { title: 'Bluetooth Page' })} >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#77C9D4',
  },
  title: {
    fontSize: 64,
    textAlign: 'center',
  },
  input: {
    height: 50,
    width: 235,
    borderWidth: 1,
    borderColor: '#57BC90',
    backgroundColor: '#FFF',
    textAlign: 'center',
    alignSelf: 'center',
    marginVertical: 15,
    fontFamily: 'AvenirNextCondensed-Bold',
  },
  button: {
    height: 65,
    width: 140,
    borderWidth: 1,
    borderColor: '#57BC90',
    backgroundColor: '#015249',
    borderRadius: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 50,
    shadowRadius: 2,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'AvenirNextCondensed-Bold',
    color: '#FFF',
    marginTop: 14,
  },
});
