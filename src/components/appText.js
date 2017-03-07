import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
} from 'react-native';

import gStyles from '../styles/global.json';

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
    fontFamily: gStyles.global.fontFamily,
  }
});

AppText.propTypes = {
  style: React.PropTypes.number,
  children: React.PropTypes.string,
}
