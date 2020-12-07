import React, {FC} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {colors} from '../constants';
import {useNavigation} from '@react-navigation/native';

const Header: FC = (props) => {
  const {navigate} = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.title}>{props.title}</Text>
        <TouchableOpacity onPress={() => navigate('Profile')}>
          <FastImage
            style={styles.profilePicture}
            source={{
              uri: 'https://unsplash.it/400/400?image=1',
              headers: {Authorization: 'someAuthToken'},
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 90,
    backgroundColor: colors.purple,
  },
  title: {
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    fontSize: 24,
    color: colors.white,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
    marginTop: 35,
    alignItems: 'center',
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#EEF3FB',
  },
});

export default Header;
