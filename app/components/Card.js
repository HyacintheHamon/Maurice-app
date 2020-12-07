import React, {FC} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors} from '../constants';

const Card = (props) => {
  return <View style={[styles.card, props.style]} {...props}></View>;
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 24,
    shadowOpacity: 0.11,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 13,
    margin: 10,
  },
});

export default Card;
