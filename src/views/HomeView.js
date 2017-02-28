import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as firebase from 'firebase';
import {
  StyleSheet,
  Text,
  View,
  Button,
  NativeAppEventEmitter,
  TextInput,
  AsyncStorage,
  TouchableHighlight
} from 'react-native';

import AppText from '../components/appText';
import AppButton from '../components/appButton';
import * as bluetoothActions from '../actions/bluetoothActions';
import * as accountActions from '../actions/accountActions';
import BleManager from 'react-native-ble-manager';
import BleHelper from '../helpers/bleHelper.js';
import FirebaseHelper from '../helpers/firebaseHelper.js';

class HomeView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      password: '',
      ble: [],
      loggedIn: false,
      error: '' }
    this.persistUser = this.persistUser.bind(this);
    this.clearData = this.clearData.bind(this);
  }

  static navigationOptions = {
    header: {
      visible: false,
    }
  }

  componentWillMount() {
    FirebaseHelper.firebaseSetup();
    this.getData();
    this.autoConnect();
  }

  componentDidMount() {
    BleManager.start({showAlert: false});
  }

  // signup function for when functionality is in place
  async signup(email, pass) {
    try {
      await firebase.auth()
          .createUserWithEmailAndPassword(email, pass);
      this.nextPage();
    } catch (error) {
      this.setState({ error: error.message });
    }

  }

  async login() {
    try {
      await firebase.auth()
          .signInWithEmailAndPassword(this.state.user, this.state.password);
      this.persistUser();
      this.nextPage();
    } catch (error) {
      this.setState({ password: null, error: error.message, loggedIn: true });
    }
  }

  async logout() {
    try {
      await firebase.auth().signOut();
      this.clearData();
    } catch (error) {
      console.log(error);
    }
  }

  nextPage() {
    const navTo = this.props.deviceId ? 'Device' : 'Ble';
    const { navigate } = this.props.navigation;

    navigate(navTo)
  }

  autoConnect() {
    AsyncStorage.getItem('deviceId').then((deviceId) => {
      if (deviceId) {
        BleManager.scan([], 2, false)
          .then((results) => {
            this.props.bleActions.updateConnectedDevice(deviceId);
            BleManager.connect(deviceId)
          });
      };
    });
  }

  clearData() {
    AsyncStorage.clear();
    this.props.accountActions.logoutUser();
    this.setState({user: '', loggedIn: false});
  }

  persistUser() {
    AsyncStorage.setItem('user', this.state.user).done();
  }

  getData() {
    AsyncStorage.getItem('user').then((name) => {
      if (name) {
        this.props.accountActions.updateUser(name);
      };
    });
  }

  buildWelcome() {
    let welcome;

    if (this.props.user) {
      welcome = (
        <View>
          <AppText>
            Welcome {this.props.user}
          </AppText>
          <AppButton
            style={{alignSelf: 'center'}}
            onPress={() => this.nextPage() } >
            Enter
          </AppButton>
          <AppButton
            style={{alignSelf: 'center'}}
            onPress={() => this.logout() } >
            Logout
          </AppButton>

        </View>
      );
    } else {
      welcome = (
        <View>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={this.state.userName}
            onChangeText={(text) => this.setState({user: text})}
          />
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder="Password"
            value={this.state.password}
            onChangeText={(text) => this.setState({password: text})}
          />
          <AppButton
            style={{alignSelf: 'center'}}
            onPress={() => this.login() } >
            Login
          </AppButton>

        </View>
      )
    }
    return welcome;
  }

  render() {

    const welcomeSection = this.buildWelcome();
    return (
      <View style={styles.container}>
        <AppText style={{marginBottom: 130}}>
          <Text style={styles.title}>
            Lightbar
          </Text>
        </AppText>
        {welcomeSection}
        <AppText style={styles.error}>
          {this.state.error}
        </AppText>
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
  error: {
    fontSize: 16,
    color: 'red',
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
});

function mapStateToProps(state) {
  return {
    deviceId: state.bluetooth.deviceId,
    user: state.account.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    bleActions: bindActionCreators(bluetoothActions, dispatch),
    accountActions: bindActionCreators(accountActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
