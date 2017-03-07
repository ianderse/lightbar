import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as firebase from 'firebase';
import {
  StyleSheet,
  View,
  TextInput,
  AsyncStorage,
} from 'react-native';

import { Button, Card } from 'react-native-material-ui';
import AppText from '../components/appText';
import AppButton from '../components/appButton';
import gStyles from '../styles/global.json';
import * as bluetoothActions from '../actions/bluetoothActions';
import * as accountActions from '../actions/accountActions';
import BleManager from 'react-native-ble-manager';
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
      return error;
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
          .then(() => {
            this.props.bleActions.updateConnectedDevice(deviceId);
            BleManager.connect(deviceId);
          });
      }
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
      }
    });
  }

  buildWelcome() {
    let welcome;
    const welcomeText = `Welcome ${this.props.user}`;

    if (this.props.user) {
      welcome = (
        <View>
          <AppText>
          {welcomeText}
          </AppText>
          <Button
            raised
            accent
            onPress={() => this.nextPage() }
            text="Enter"
          />
          <Button
            raised
            accent
            onPress={() => this.logout() }
            text="Logout"
          />
        </View>
      );
    } else {
      welcome = (
        <Card>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={this.state.userName}
              onChangeText={(text) => this.setState({user: text})}
            />
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              placeholder="Password"
              value={this.state.password}
              onChangeText={(text) => this.setState({password: text})}
            />
          </View>
          <View style={styles.buttonWrapper}>
            <Button
              raised
              accent
              onPress={() => this.login() }
              text="Login"
            />
          </View>
        </Card>
      )
    }
    return welcome;
  }

  render() {
    const welcomeSection = this.buildWelcome();
    const palette = StyleSheet.flatten(this.context.uiTheme.palette);

    return (
      <View style={[styles.container, {backgroundColor: palette.primaryColor}]}>
        <AppText style={[styles.title, {color: palette.canvasColor}]}>
          Lightbar
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
  },
  cardContainer: {
    top: 20,
  },
  error: {
    fontSize: gStyles.error.fontSize,
    color: gStyles.error.color,
  },
  title: {
    fontSize: gStyles.title.fontSize,
    textAlign: 'center',
  },
  input: {
    height: 50,
    width: 235,
    backgroundColor: gStyles.input.backgroundColor,
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: gStyles.global.fontFamily,
  },
  inputWrapper: {
    margin: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#BDBDBD',
  },
  buttonWrapper: {
    top: 20,
    marginHorizontal: 20,
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

HomeView.propTypes = {
  navigation: React.PropTypes.object,
  accountActions: React.PropTypes.object,
  bleActions: React.PropTypes.object,
  deviceId: React.PropTypes.string,
  user: React.PropTypes.string,
};

HomeView.contextTypes = {
  uiTheme: React.PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
