import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
} from 'react-native';

export default class AppText extends Component {
  render() {
    return (
      <Text style={[styles.defaultText, this.props.style]}>
        {this.props.children}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  defaultText: {
    fontSize: 24,
    fontFamily: 'AvenirNextCondensed-Bold',
    color: '#FFF',
  }
});
