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
} from 'react-native';

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
    BleManager.write(this.props.device.id, '6e400001-b5a3-f393-e0a9-e50e24dcca9e', '6e400002-b5a3-f393-e0a9-e50e24dcca9e', data)
      .then(() => {
        console.log('Write: ' + data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        {Object.keys(this.props.device).map((e) =>
         <Text>
           {e + " : " + this.props.device[e]}
         </Text>
        )}
        <TouchableHighlight style={{padding:20, backgroundColor:'#ccc'}} onPress={() => this.sendCommand("On") }>
          <Text>On</Text>
        </TouchableHighlight>
        <TouchableHighlight style={{padding:20, backgroundColor:'#ccc'}} onPress={() => this.sendCommand("Off") }>
          <Text>Off</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

function mapStateToProps(state) {
  return {
    device: state.bluetooth.device
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DeviceView);
