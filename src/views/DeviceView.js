import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableHighlight,
  AsyncStorage,
} from 'react-native';

import AppText from '../components/appText';
import AppButton from '../components/appButton';
import * as bluetoothActions from '../actions/bluetoothActions';
import base64 from 'base64-js';
import BleManager from 'react-native-ble-manager';

class DeviceView extends Component {
  constructor(props) {
    super(props)
  }

  static navigationOptions = {
    title: "Connected Device",
  }

  stringToBytes(string) {
    var array = new Uint8Array(string.length);
    for (var i = 0, l = string.length; i < l; i++) {
      array[i] = string.charCodeAt(i);
    }
    return array;
  }

  sendCommand(command) {
    var data = base64.fromByteArray(new Uint8Array(this.stringToBytes(command)));
    const UARTServiceId = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
    const TXServiceId = '6e400002-b5a3-f393-e0a9-e50e24dcca9e';

    BleManager.write(this.props.deviceId, UARTServiceId, TXServiceId, data)
      .then(() => {
        console.log('Write: ' + data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  disconnectDevice() {
    const { navigate } = this.props.navigation;
    BleManager.disconnect(this.props.deviceId)
      .then(() => {
	this.props.actions.disconnectDevice();
        AsyncStorage.removeItem('deviceId');
	navigate('Ble', { title: 'Bluetooth'});
      })
      .catch((error) => {
	console.log(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <AppButton onPress={() => this.sendCommand("On") }>
          On
        </AppButton>
        <AppButton onPress={() => this.sendCommand("Off") }>
          Off
        </AppButton>
        <AppButton onPress={() => this.disconnectDevice() }>
	  Disconnect
        </AppButton>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#77C9D4',
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

export default connect(mapStateToProps, mapDispatchToProps)(DeviceView);
