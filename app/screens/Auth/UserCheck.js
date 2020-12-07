import React, {FC, useState, useEffect} from 'react';
import {
  ActivityIndicator,
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
import {useForm} from 'react-hook-form';
import CustomInput from '../../components/CustomInput';
import Logo from '../../../assets/images/svg/Logo';
import auth from '@react-native-firebase/auth';
import {DarkPurpleButton, DarkPurpleButtonText} from '../../components/Styled';
import {colors} from '../../constants';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');

const UserCheck: FC = ({navigation}) => {
  const {navigate} = useNavigation();

  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);
  const [email, setEmail] = useRecoilState(emailState);
  const {register, handleSubmit, setValue, watch, errors, setError} = useForm();

  useEffect(() => {
    register('email', {
      required: '* Champ obligatoire',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: 'Veuillez entrer un email valide',
      },
    });
  }, [register]);

  const checkUserExists = (data) => {
    setLoading(true);
    setEmail(data.email);
    //Check if user exists in Database
    auth()
      .fetchSignInMethodsForEmail(data.email)
      .then((response) => {
        setLoading(false);
        console.log(response[0]);
        if (response[0] == 'password') {
          navigate('Login');
        } else {
          navigate('Signup');
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        navigate('Signup');
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={{alignItems: 'center'}}>
            <Logo width="150" />
          </View>
          <View style={{marginTop: 50}}>
            <Text style={styles.title}>Bonjour !</Text>
            <Text style={styles.subtitle}>
              Veuillez indiquer votre adresse e-mail
            </Text>
            <CustomInput
              style={{marginTop: 20}}
              placeholder="Adresse e-mail*"
              label="Adresse e-mail*"
              keyboardType="email-address"
              autoCompleteType="email"
              name="email"
              onChangeText={(text) => setValue('email', text)}
              height={60}
              error={errors.email ? errors.email?.message : null}
            />
          </View>
        </ScrollView>
        <View style={styles.bottomView}>
          <DarkPurpleButton onPress={handleSubmit(checkUserExists)}>
            {loading ? (
              <View style={styles.loader}>
                <ActivityIndicator size="small" color="#FFFFFF" />
              </View>
            ) : (
              <DarkPurpleButtonText>Suivant</DarkPurpleButtonText>
            )}
          </DarkPurpleButton>
        </View>
      </KeyboardAvoidingView>
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
    paddingVertical: 40,
    margin: 20,
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
    marginBottom: 20,
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
  loader: {
    paddingVertical: 5,
    alignItems: 'center',
  },
  bottomView: {
    marginLeft: 20,
    marginRight: 20,
    bottom: 40,
  },
});

export default UserCheck;
