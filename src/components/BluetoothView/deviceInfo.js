import React from 'react';
import AppText from '../appText';
import AppButton from '../appButton';
import { View, StyleSheet } from 'react-native';

import gStyles from '../../styles/global.json';

function buildDeviceInfo(props) {
  let deviceInfo;
  if (props.devices > 0) {
    deviceInfo = (
      <View>
        {props.devices.map((e) =>
          <View key={e.id}>
            <AppText>
              {`Device ID: ${e.id}`}
            </AppText>
            <AppText>
              Lightbar Found
            </AppText>
            <AppButton onPress={() => props.connect(e.id)}>
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

const DeviceInfo = (props) => (
  <View>
    {buildDeviceInfo(props)}
  </View>
);

const styles = StyleSheet.create({
  error: {
    color: gStyles.error.color,
    fontSize: gStyles.error.fontSize,
  }
});
export default DeviceInfo;
