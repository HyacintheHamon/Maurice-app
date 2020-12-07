import React, {FC, useState, useEffect} from 'react';
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
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
import {useForm} from 'react-hook-form';
import Logo from '../../../assets/images/svg/Logo';
import auth from '@react-native-firebase/auth';
import ArrowLeft from '../../../assets/images/svg/Icons/ArrowLeft';
import {DarkPurpleButton, DarkPurpleButtonText} from '../../components/Styled';
import {colors} from '../../constants';
import PasswordInput from '../../components/PasswordInput';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');

const Login: FC = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useRecoilState(emailState);
  const {register, handleSubmit, setValue, watch, errors, setError} = useForm();

  const {navigate} = useNavigation();

  useEffect(() => {
    register('password', {
      required: '* Champ obligatoire',
      //pattern: {
      //  value: /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/g,
      //  message:
      //    'le mot de passe doit comporter des chiffres et des lettres uniquement, et un caractère spécial',
      //},
      //minLength: {
      //  value: 8,
      //  message: "Le mot de passe doit être d'au moins 8 caractères",
      //},
    });
  }, [register]);

  const signIn = (data) => {
    setLoading(true);
    auth()
      .signInWithEmailAndPassword(email, data.password)
      .then((response) => {
        setLoading(false);
        console.log('User account created & signed in!');
        navigate('Tabs');
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        if (error.code === 'auth/wrong-password') {
          // existing user
        }

        if (error.code === 'auth/user-not-found') {
          // new user
        }
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Logo width="150" />
          <View style={{marginTop: 50}}>
            <Text style={styles.title}>Bon retour !</Text>
            <Text style={styles.subtitle}>Indiquez votre mot de passe</Text>
            <PasswordInput
              style={{marginTop: 30}}
              placeholder={'Mot de passe'}
              label={'Mot de passe'}
              onChangeText={(text) => setValue('password', text)}
              height={60}
              error={errors.password ? errors.password?.message : null}
            />
            <DarkPurpleButton
              onPress={handleSubmit(signIn)}
              style={{marginTop: 30}}>
              {loading ? (
                <View style={styles.loader}>
                  <ActivityIndicator size="small" color="#FFFFFF" />
                </View>
              ) : (
                <DarkPurpleButtonText>Connexion</DarkPurpleButtonText>
              )}
            </DarkPurpleButton>
            <TouchableOpacity onPress={() => navigate('ForgotPassword')}>
              <Text style={styles.forgotPassword}>Mot de passe oublié ?</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <TouchableOpacity
        style={styles.goBackView}
        onPress={() => navigation.goBack()}>
        <ArrowLeft width="20" />
        <Text style={styles.goBackText}>Retour</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grayBackground,
  },
  scrollViewContent: {
    flex: 1,
    backgroundColor: colors.grayBackground,
    alignItems: 'center',
    marginTop: 80,
  },
  title: {
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    fontSize: 24,
    alignItems: 'center',
    textAlign: 'center',
    color: colors.black,
  },
  subtitle: {
    fontFamily: 'Raleway',
    fontWeight: '500',
    fontSize: 14,
    alignItems: 'center',
    textAlign: 'center',
    color: colors.lightGray,
    marginTop: 10,
  },
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 12,
    paddingVertical: 20,
    width: width - 60,
    marginTop: 50,
    fontFamily: 'Raleway',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 17,
    color: colors.black,
    padding: 10,
  },
  inputFocused: {
    borderWidth: 2,
    borderColor: colors.purple,
    borderRadius: 12,
    shadowColor: 'grey',
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 2,
  },
  error: {
    fontSize: 10,
    color: 'red',
    marginTop: 5,
    marginBottom: 5,
  },
  forgotPassword: {
    fontFamily: 'Raleway',
    fontWeight: '500',
    color: colors.green,
    textAlign: 'center',
    marginTop: 10,
  },
  goBackView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  goBackText: {
    marginLeft: 5,
    fontFamily: 'Raleway',
    fontWeight: '700',
    color: colors.purple,
  },
  loader: {
    paddingVertical: 5,
    alignItems: 'center',
  },
});

export default Login;
