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
      this.handleDiscoverPeripheral = this.handleDiscoverPeripheral.bind(this);

      NativeAppEventEmitter
          .addListener('BleManagerDiscoverPeripheral', this.handleDiscoverPeripheral );

      if (Platform.OS === 'android' && Platform.Version >= 23) {
        PermissionsAndroid.checkPermission(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
          if (result) {
            console.log("Permission is OK");
          } else {
            PermissionsAndroid.requestPermission(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
              if (result) {
                console.log("User accept");
              } else {
                console.log("User refuse");
              }
            });
          }
        });
      }
    }

    handleScan() {
      BleManager.scan([], 2, false)
        .then((results) => {
          console.log('Scanning...');
        });
    }

    toggleScanning(bool){
      if (bool) {
        this.setState({ scanning:true })
        this.scanning = this.handleScan();
      } else {
        this.setState({ scanning:false })
      }
    }

    connect(id) {
      const { navigate } = this.props.navigation;
      BleManager.connect(id)
        .then((device) => {
          console.log('Connected');
          console.log(device);
          AsyncStorage.setItem('device', device);
          this.props.actions.updateConnectedDevice(device);
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
