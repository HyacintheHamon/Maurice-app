import React, {FC} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors} from '../constants';

const Separator = () => {
  return <View style={styles.separator} />;
};

const styles = StyleSheet.create({
  separator: {
    backgroundColor: '#FAFAFC',
    height: 2,
    width: '100%',
  },
});

export default Separator;
