import React, {FC} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import MedicalReport from '../../../assets/images/svg/Illustrations/MedicalReport';
import {
  LightPurpleButton,
  LightPurpleButtonText,
} from '../../components/Styled';
import {colors} from '../../constants';

const EmptyView: FC = () => {
  return (
    <View style={styles.purpleWrapper}>
      <View style={styles.container}>
        <Text style={styles.title}>Aucune annonce n’a été publiée</Text>
        <MedicalReport width="97" height="97" />
        <Text style={styles.subtitle}>
          Vous n’avez publié aucune annonce. Créez votre première annonce
        </Text>
        <LightPurpleButton onPress={() => {}}>
          <LightPurpleButtonText>Publier une annonce</LightPurpleButtonText>
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
    backgroundColor: '#FFFFFF',
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
