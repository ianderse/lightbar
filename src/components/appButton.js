import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Text,
} from 'react-native';

import gStyles from '../styles/global.json';

export default class AppButton extends Component {
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress} style={[styles.defaultButton, this.props.style]}>
        <Text style={styles.defaultButtonText}>{this.props.children}</Text>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  defaultButton: {
    alignSelf: 'center',
    height: 65,
    width: 140,
    borderWidth: 1,
    borderColor: gStyles.button.borderColor,
    backgroundColor: gStyles.button.backgroundColor,
    borderRadius: 8,
    shadowColor: gStyles.button.shadowColor,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 50,
    shadowRadius: 2,
    marginTop: 15,
  },
  defaultButtonText: {
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'AvenirNextCondensed-Bold',
    color: gStyles.button.textColor,
    marginTop: 14,
  },
});
