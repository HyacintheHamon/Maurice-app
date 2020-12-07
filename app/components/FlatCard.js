import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors} from '../constants';
import CheckFilled from '../../assets/images/svg/Icons/CheckFilled.svg';

const FlatCard = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={props.selected ? styles.cardSelected : styles.card}
        {...props}></TouchableOpacity>
      {props.selected ? <CheckFilled style={styles.checkFilled} /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#C2CAE7',
    borderRadius: 24,
    margin: 10,
  },
  cardSelected: {
    backgroundColor: 'rgba(72, 99, 245, 0.12)',
    borderWidth: 2,
    borderColor: colors.purple,
    shadowColor: 'grey',
    shadowOpacity: 0.5,
    shadowRadius: 3,
    borderRadius: 24,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 2,
    margin: 10,
  },
  checkFilled: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
});

export default FlatCard;
