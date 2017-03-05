import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  StyleSheet,
  Slider,
} from 'react-native';

import AppText from '../components/appText';
import AppButton from '../components/appButton';
import * as bluetoothActions from '../actions/bluetoothActions';
import BleHelper from '../helpers/bleHelper.js';
import gStyles from '../styles/global.json';

class AppSlider extends Component {
  onSliderChange(value) {
    this.props.actions.updateSlider(value);
    BleHelper.sendCommand(this.props.deviceId, "SP" + value);
  }

  render() {
    return (
      <Slider
        value={this.props.value}
        minimumValue={this.props.minValue}
        maximumValue={this.props.maxValue}
        step={this.props.step}
        onSlidingComplete={(value) => this.onSliderChange(value)}
      />
    );
  }
}

const styles = StyleSheet.create({
  defaultSlider: {
    alignSelf: 'center',
  },
});

AppButton.propTypes = {
  value: React.PropTypes.number,
  minValue: React.PropTypes.number,
  maxValue: React.PropTypes.number,
  step: React.PropTypes.number,
};

function mapStateToProps(state) {
  return {
    sliderValue: state.bluetooth.sliderValue,
    deviceId: state.bluetooth.deviceId,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(bluetoothActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppSlider);
