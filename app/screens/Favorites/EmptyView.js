import React, {FC} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import HeartSearch from '../../../assets/images/svg/Illustrations/HeartSearch';
import {
  LightPurpleButton,
  LightPurpleButtonText,
} from '../../components/Styled';
import {colors} from '../../constants';

const EmptyView: FC = () => {
  return (
    <View style={styles.purpleWrapper}>
      <View style={styles.container}>
        <Text style={styles.title}>
          Aucun remplaçant favoris n’a été ajouté
        </Text>
        <HeartSearch />
        <Text style={styles.subtitle}>
          Terminez une première misison avec un remplaçant afin de pouvoir
          l’ajouter à vos favoris
        </Text>
        <LightPurpleButton onPress={() => {}}>
          <LightPurpleButtonText>Ajouter un favori</LightPurpleButtonText>
        </LightPurpleButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  purpleWrapper: {
    flex: 1,
    backgroundColor: colors.purple,
  },
  container: {
    flex: 1,
    backgroundColor: colors.grayBackground,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  title: {
    fontFamily: 'Montserrat',
    fontWeight: '600',
    fontSize: 18,
    alignItems: 'center',
    textAlign: 'center',
    color: colors.black,
    marginBottom: 20,
    marginLeft: 80,
    marginRight: 80,
  },
  subtitle: {
    fontFamily: 'Raleway',
    fontWeight: '500',
    fontSize: 14,
    alignItems: 'center',
    textAlign: 'center',
    color: colors.darkGray,
    lineHeight: 25,
    marginTop: 10,
    marginLeft: 60,
    marginRight: 60,
    marginBottom: 40,
  },
});

export default EmptyView;
