import React, {FC} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

const BlueLabel = (props) => {
  return (
    <View style={styles.domainLabel}>
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        style={styles.domainLabelTitle}>
        {props.label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  domainLabel: {
    backgroundColor: 'rgba(88, 194, 254, 0.08)',
    borderRadius: 24,
    alignItems: 'center',
    padding: 10,
    paddingVertical: 5,
    maxWidth: 100,
  },
  domainLabelTitle: {
    fontFamily: 'Raleway',
    fontWeight: 'bold',
    fontSize: 12,
    color: '#58C2FE',
  },
});

export default BlueLabel;
