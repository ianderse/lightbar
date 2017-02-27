import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  AppRegistry,
  Text,
  View,
  TouchableHighlight,
  NativeAppEventEmitter,
  Platform,
  PermissionsAndroid,
  AsyncStorage
} from 'react-native';
import BleManager from 'react-native-ble-manager';
import BleHelper from '../helpers/bleHelper.js';
import * as bluetoothActions from '../actions/bluetoothActions';

class BluetoothView extends Component {
    static navigationOptions = {
      title: "Bluetooth",
    }

    constructor(){
      super()

      this.state = {
        ble:[],
        scanning:false,
      }
    }

    componentDidMount() {
      BleManager.start({showAlert: false});

      NativeAppEventEmitter
          .addListener('BleManagerDiscoverPeripheral', BleHelper.handleDiscoverPeripheral );

      BleHelper.androidCheck();
    }

    toggleScanning(bool){
      if (bool) {
        this.setState({ scanning:true })
        this.scanning = BleHelper.handleScan();
      } else {
        this.setState({ scanning:false })
      }
    }

    connect(id) {
      const { navigate } = this.props.navigation;
      BleManager.connect(id)
        .then((device) => {
          AsyncStorage.setItem('deviceId', device.id);
          this.props.actions.updateConnectedDevice(device.id);
          navigate('Device');
        }).catch((error) => {
          console.log(error);
        });
    }

    buildDeviceInfo() {
      let deviceInfo;
      if (this.state.ble.length > 0) {
        deviceInfo = (
          <View>
            {this.state.ble.map((e) =>
              <View key={e.id}>
                <Text>
                  Device ID: {e.id}
                </Text>
                <Text>
                  Device Name: {e.advertising.kCBAdvDataLocalName}
                </Text>
                <TouchableHighlight style={{padding:10, backgroundColor:'#ccc'}} onPress={() => this.connect(e.id)}>
                  <Text>Connect</Text>
                </TouchableHighlight>
              </View>
            )}
          </View>
        )
      } else {
        deviceInfo = <Text>No devices found</Text>
      }

      return deviceInfo;
    }

    render() {
      const container = {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#F5FCFF',
      }

      return (
        <View style={container}>
          <TouchableHighlight style={{padding:20, backgroundColor:'#ccc'}} onPress={() => this.toggleScanning(!this.state.scanning) }>
            <Text>Scan Bluetooth ({this.state.scanning ? 'on' : 'off'})</Text>
          </TouchableHighlight>

          {this.buildDeviceInfo()}
        </View>
      );
    }
}

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(bluetoothActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BluetoothView);
