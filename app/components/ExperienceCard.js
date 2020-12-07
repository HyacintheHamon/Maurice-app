import React, {FC} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {colors} from '../constants';
import {useNavigation} from '@react-navigation/native';
import EditPurple from '../../assets/images/svg/Icons/EditPurple.svg';

const {width} = Dimensions.get('window');

const ExperienceCard = (props) => {
  const {navigate} = useNavigation();

  return (
    <View style={styles.experienceCard}>
      <View style={styles.dot} />
      {props.lastItem ? null : <View style={styles.verticalLine} />}
      <TouchableOpacity
        onPress={() => navigate('EditExperience')}
        style={styles.editView}>
        <EditPurple width={15} />
      </TouchableOpacity>
      <View style={styles.textContent}>
        <Text style={styles.monthYear}>{props.monthYear}</Text>
        <Text style={styles.structureNameTitle}>
          {props.structureNameTitle}
        </Text>
        <Text style={styles.missionDescription}>
          {props.missionDescription}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  experienceCard: {
    paddingBottom: 20,
  },
  dot: {
    position: 'absolute',
    width: 10,
    height: 10,
    left: 0,
    top: 5,
    borderWidth: 2,
    borderColor: '#4863F5',
    borderRadius: 50,
  },
  verticalLine: {
    position: 'absolute',
    left: 4,
    top: 20,
    borderWidth: 1,
    borderColor: colors.pink,
    height: '100%',
  },
  textContent: {
    width: width - 110,
    marginLeft: 20,
  },
  editView: {
    position: 'absolute',
    width: 30,
    height: 30,
    right: 10,
    top: 10,
    backgroundColor: '#EEF3FB',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthYear: {
    fontFamily: 'Raleway',
    color: colors.lightGray,
    textAlign: 'left',
    fontWeight: '500',
    fontSize: 14,
  },
  structureNameTitle: {
    fontFamily: 'Raleway',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'left',
    color: colors.black,
    marginTop: 20,
    marginBottom: 20,
  },
  missionDescription: {
    textAlign: 'left',
    color: colors.darkGray,
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 22,
  },
});

export default ExperienceCard;
