import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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
import BleManager from 'react-native-ble-manager';

class HomeView extends Component {
  constructor(props) {
    super(props)
    this.state = { userName: '', password: '', ble: [], loggedIn: false }
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
    this.autoConnect();
  }

  componentDidMount() {
    BleManager.start({showAlert: false});
    this.handleDiscoverPeripheral = this.handleDiscoverPeripheral.bind(this);

    NativeAppEventEmitter
          .addListener('BleManagerDiscoverPeripheral', this.handleDiscoverPeripheral );
  }

  handleDiscoverPeripheral(data){
    var found = this.state.ble.some(function (e) {
      return e.id === data.id;
    });

    console.log('Got ble data', data);

    if (!found) {
      if (data.advertising.kCBAdvDataLocalName === 'CLLightbar') {
        var newList = this.state.ble.concat(data)
        this.setState({ ble: newList })
      }
    }
  }

  autoConnect() {
    console.log('autoconnect');
    AsyncStorage.getItem('deviceId').then((deviceId) => {
      console.log('after get: ' + deviceId);
      if (deviceId) {
        console.log('AC DiD: ' + deviceId);
        BleManager.scan([], 2, false)
          .then((results) => {
            this.props.actions.updateConnectedDevice(deviceId);
            BleManager.connect(deviceId)
          });
      };
    });
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
    const navTo = this.props.deviceId ? 'Device' : 'Ble';

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
        <AppButton
          onPress={() => navigate(navTo)} >
          Login
        </AppButton>
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
});

function mapStateToProps(state) {
  return {
    deviceId: state.bluetooth.deviceId
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(bluetoothActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
