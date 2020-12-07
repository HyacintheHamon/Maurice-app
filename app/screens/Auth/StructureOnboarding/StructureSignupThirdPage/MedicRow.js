import React, {FC} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import BlueLabel from '../../../../components/BlueLabel';
import Separator from '../../../../components/Separator';
import {colors} from '../../../../constants';

const {width} = Dimensions.get('window');

const MedicRow = (props) => {
  const showActionSheet = () => {
    this.ActionSheet.show();
  };

  return (
    <View style={styles.medicRow}>
      <View style={{flexDirection: 'row'}}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.medicName}>
          {props.name}
        </Text>
        <BlueLabel label={props.domain} />
        <TouchableOpacity style={styles.actionView} onPress={showActionSheet}>
          <FontAwesome5
            style={styles.dots}
            name="ellipsis-v"
            size={15}
            color={'#4863F5'}
          />
          <ActionSheet
            ref={(o) => (this.ActionSheet = o)}
            title={'Action'}
            options={['Editer', 'Supprimer', 'cancel']}
            cancelButtonIndex={2}
            destructiveButtonIndex={1}
            onPress={(index) => {
              /* do something */
            }}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.medicSpecialty}>{props.specialty}</Text>
      <View style={{marginTop: 10}}>
        <Separator />
      </View>
    </View>
  );
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
  medicRow: {
    padding: 10,
    height: 80,
  },
  medicName: {
    marginTop: 10,
    marginRight: 10,
    fontFamily: 'Raleway',
    fontWeight: '500',
    fontSize: 14,
    color: '#000000',
    maxWidth: 160,
  },
  medicSpecialty: {
    fontFamily: 'Raleway',
    fontWeight: '500',
    color: colors.darkGray,
  },
  actionView: {
    position: 'absolute',
    right: 0,
    top: 10,
    width: 20,
    height: 20,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dots: {
    textAlign: 'center',
  },
});

export default MedicRow;
