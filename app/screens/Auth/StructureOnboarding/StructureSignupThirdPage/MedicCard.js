import React, {FC} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import BlueLabel from '../../../../components/BlueLabel';
import Separator from '../../../../components/Separator';
import PlusCirclePurple from '../../../../../assets/images/svg/Icons/PlusCirclePurple.svg';
import MaleDoctor from '../../../../../assets/images/svg/Illustrations/MaleDoctor.svg';
import FemaleDoctor from '../../../../../assets/images/svg/Illustrations/FemaleDoctor.svg';
import {colors} from '../../../../constants';

const MedicCard = (props) => {
  const {onPress} = props;
  return (
    <View style={styles.card}>
      <View style={{flexDirection: 'row', padding: 20}}>
        <View style={styles.cardLabel}>
          <BlueLabel label={props.domain} />
        </View>
        <View style={styles.image}>
          <MaleDoctor width={50} />
        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
            {props.name}
          </Text>
          <Text style={styles.rpps}>{props.rpps}</Text>
        </View>
      </View>
      {props.withButton ? (
        <View>
          <Separator />
          <TouchableOpacity style={styles.addDocButton} onPress={onPress}>
            <View style={styles.row}>
              <PlusCirclePurple width={15} />
              <Text style={styles.addDocButtonTitle}>Ajouter à mes Doc’</Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  card: {
    marginTop: 15,
    borderRadius: 24,
    backgroundColor: colors.white,
    shadowOpacity: 0.08,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
  },
  cardLabel: {
    position: 'absolute',
    top: 20,
    right: 10,
  },
  cardInfo: {
    flexDirection: 'column',
    marginTop: 5,
  },
  image: {
    backgroundColor: '#EEF3FB',
    paddingVertical: 10,
    borderRadius: 64,
    marginRight: 10,
  },
  name: {
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.black,
    maxWidth: 200,
  },
  rpps: {
    fontFamily: 'Raleway',
    fontWeight: '500',
    fontSize: 16,
    color: colors.darkGray,
    marginTop: 5,
  },
  addDocButton: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  addDocButtonTitle: {
    fontFamily: 'Raleway',
    fontWeight: 'bold',
    fontSize: 14,
    color: colors.purple,
    marginTop: 2,
    marginLeft: 5,
  },
});

export default MedicCard;
