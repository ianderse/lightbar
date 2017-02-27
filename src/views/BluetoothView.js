import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  StyleSheet,
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
import AppText from '../components/appText';
import AppButton from '../components/appButton';

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
                <AppText>
                  Device ID: {e.id}
                </AppText>
                <AppText>
                  Lightbar Found
                </AppText>
                <AppButton onPress={() => this.connect(e.id)}>
                  <Text>Connect</Text>
                </AppButton>
              </View>
            )}
          </View>
        )
      } else {
        deviceInfo = <AppText style={styles.error}>No devices found</AppText>
      }

      return deviceInfo;
    }

    render() {
      return (
        <View style={styles.container}>
          <AppText style={styles.title}>
            Connect to Lightbar
          </AppText>
          {this.buildDeviceInfo()}
          <AppButton onPress={() => this.toggleScanning(!this.state.scanning) }>
            <Text>Scan ({this.state.scanning ? 'on' : 'off'})</Text>
          </AppButton>

        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#77C9D4',
  },
  error: {
    fontSize: 16,
    color: 'red',
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    fontSize: 64,
    textAlign: 'center',
  },
});


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
