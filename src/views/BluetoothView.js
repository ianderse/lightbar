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
  PermissionsAndroid
} from 'react-native';
import BleManager from 'react-native-ble-manager';
import * as demoActions from '../actions/demoActions';

class BluetoothView extends Component {
    static navigationOptions = {
      title: "Bluetooth",
    }

    constructor(){
        super()

        this.state = {
            ble:null,
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
            this.setState({scanning:true})
            this.scanning = this.handleScan();
        } else{
            this.setState({scanning:false})
        }
    }

    buildDeviceInfo() {
      let deviceInfo;
      if (this.state.ble) {
        deviceInfo = (
          <View>
            <Text>
              Device ID: {this.state.ble.id}
            </Text>
            <Text>
              Device Name: {this.state.ble.advertising.kCBAdvDataLocalName}
            </Text>
          </View>
        )
      } else {
        deviceInfo = <Text>No devices found</Text>
      }

      return deviceInfo;
    }

    handleDiscoverPeripheral(data){
        console.log('Got ble data', data);
        this.setState({ ble: data })
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
    posts: state.demo.posts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(demoActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BluetoothView);
