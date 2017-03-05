import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  StyleSheet,
  View,
  AsyncStorage,
} from 'react-native';

import AppButton from '../components/appButton';
import AppText from '../components/appText';
import gStyles from '../styles/global.json';
import * as bluetoothActions from '../actions/bluetoothActions';
import BleManager from 'react-native-ble-manager';
import BleHelper from '../helpers/bleHelper.js';

class DeviceView extends Component {
  constructor(props) {
    super(props)
  }

  static navigationOptions = {
    title: "Connected Device",
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
        return error;
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <AppText style={styles.title}>
          Lightbar
        </AppText>
        <AppText style={styles.subText}>
          Connected
        </AppText>
        <AppButton onPress={() => BleHelper.sendCommand(this.props.deviceId, "On") }>
          On
        </AppButton>
        <AppButton onPress={() => BleHelper.sendCommand(this.props.deviceId, "Off") }>
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
    backgroundColor: gStyles.container.backgroundColor,
  },
  title: {
    fontSize: gStyles.title.fontSize,
    textAlign: 'center',
  },
  subText: {
    fontSize: 14,
    textAlign: 'center',
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

DeviceView.propTypes = {
  navigation: React.PropTypes.object,
  actions: React.PropTypes.object,
  deviceId: React.PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeviceView);
