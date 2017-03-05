import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  StyleSheet,
  Text,
  View,
  NativeAppEventEmitter,
  AsyncStorage
} from 'react-native';
import BleManager from 'react-native-ble-manager';
import BleHelper from '../helpers/bleHelper.js';
import * as bluetoothActions from '../actions/bluetoothActions';
import AppText from '../components/appText';
import AppButton from '../components/appButton';
import gStyles from '../styles/global.json';

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

      BleHelper.androidCheck();
    }

    handleDiscoverPeripheral(data) {
      var found = this.state.ble.some(function (e) {
        return e.id === data.id;
      });

      if (!found) {
        // Need to find out why it's not saving the name change always
        if (data.advertising.kCBAdvDataLocalName === 'CLLightbar' || data.advertising.kCBAdvDataLocalName === 'Adafruit Bluefruit LE') {
          console.log('found');
          var newList = this.state.ble.concat(data)
          this.setState({ ble: newList })
        }
      }
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
          this.props.actions.updateConnectedDevice(device.id);
          AsyncStorage.setItem('deviceId', device.id);
          navigate('Device');
        }).catch((error) => {
          return error;
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
                  {`Device ID: ${e.id}`}
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
            Scan
          </AppButton>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: gStyles.container.backgroundColor,
  },
  error: {
    fontSize: gStyles.error.fontSize,
    color: gStyles.error.color,
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    fontSize: gStyles.title.fontSize,
    textAlign: 'center',
  },
});


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(bluetoothActions, dispatch)
  };
}

BluetoothView.propTypes = {
  navigation: React.PropTypes.object,
  actions: React.PropTypes.object,
  children: React.PropTypes.string,
};

export default connect(null, mapDispatchToProps)(BluetoothView);
