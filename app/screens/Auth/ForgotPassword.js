import React, {FC, useState, useEffect} from 'react';
import {
  Text,
  TextInput,
  View,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {useRecoilState} from 'recoil';
import {emailState} from '../../atoms';
import Logo from '../../../assets/images/svg/Logo';
import auth from '@react-native-firebase/auth';
import {DarkPurpleButton, DarkPurpleButtonText} from '../../components/Styled';
import MedicalReport from '../../../assets/images/svg/Illustrations/MedicalReport';
import {colors} from '../../constants';
import {useNavigation} from '@react-navigation/native';

const ForgotPassword: FC = ({navigation}) => {
  const {navigate} = useNavigation();
  const [email, setEmail] = useRecoilState(emailState);

  useEffect(() => {
    // Get email from Recoil state
    // Send email to user
    auth()
      .sendPasswordResetEmail(email)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentView}>
        <Logo width="150" />
        <View style={styles.mainView}>
          <Text style={styles.title}>Mot de passe envoyé !</Text>
          <MedicalReport width="97" height="97" />
          <Text style={styles.subtitle}>
            Un e-mail contenant votre mot de passe vous a été envoyé à l’adresse
            suivante :
          </Text>
          <Text style={styles.email}>{email}</Text>
          <DarkPurpleButton onPress={() => navigate('UserCheck')}>
            <DarkPurpleButtonText>Retour à l’accueil</DarkPurpleButtonText>
          </DarkPurpleButton>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grayBackground,
  },
  contentView: {
    flex: 1,
    backgroundColor: colors.grayBackground,
    alignItems: 'center',
    marginTop: 80,
  },
  mainView: {
    marginTop: 50,
    alignItems: 'center',
    marginLeft: 60,
    marginRight: 60,
  },
  title: {
    fontFamily: 'Montserrat',
    fontWeight: '600',
    fontSize: 18,
    alignItems: 'center',
    textAlign: 'center',
    color: colors.black,
    marginBottom: 30,
  },
  subtitle: {
    fontFamily: 'Raleway',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 24,
    alignItems: 'center',
    textAlign: 'center',
    color: colors.darkGray,
    marginTop: 30,
  },
  email: {
    fontFamily: 'Raleway',
    fontWeight: 'bold',
    fontSize: 14,
    alignItems: 'center',
    textAlign: 'center',
    color: colors.black,
    marginTop: 30,
    marginBottom: 30,
  },
});

export default ForgotPassword;
