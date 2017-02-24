import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Text,
} from 'react-native';

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
    height: 65,
    width: 140,
    borderWidth: 1,
    borderColor: '#57BC90',
    backgroundColor: '#015249',
    borderRadius: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 50,
    shadowRadius: 2,
    marginTop: 15,
  },
  defaultButtonText: {
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'AvenirNextCondensed-Bold',
    color: '#FFF',
    marginTop: 14,
  },
});
