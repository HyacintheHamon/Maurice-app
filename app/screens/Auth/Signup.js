import React, {FC, useState, useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import {useRecoilState} from 'recoil';
import {emailState} from '../../atoms';
import {useForm} from 'react-hook-form';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import ArrowLeft from '../../../assets/images/svg/Icons/ArrowLeft';
import {DarkPurpleButton, DarkPurpleButtonText} from '../../components/Styled';
import {colors} from '../../constants';
import PasswordInput from '../../components/PasswordInput';
import FlatCard from '../../components/FlatCard';
import Structure from '../../../assets/images/svg/Illustrations/Structure';
import Substitute from '../../../assets/images/svg/Illustrations/Substitute';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');

const Signup: FC = ({navigation}) => {
  const [structureSelected, setStructureSelected] = useState(false);
  const [substituteSelected, setSubstituteSelected] = useState(false);
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
      validate: (value) =>
        value === watch('repeatPassword') ||
        'les mots de passe ne correspondent pas',
    });
    register('repeatPassword', {
      required: '* Champ obligatoire',
      //minLength: {
      //  value: 8,
      //  message: "Le mot de passe doit être d'au moins 8 caractères",
      //},
      validate: (value) =>
        value === watch('password') || 'les mots de passe ne correspondent pas',
    });
  }, [register]);

  const toggleStructure = () => {
    if (structureSelected == true) {
      return null;
    }
    if (structureSelected == false && substituteSelected == false) {
      setStructureSelected(!structureSelected);
    } else {
      setStructureSelected(!structureSelected);
      setSubstituteSelected(!substituteSelected);
    }
  };

  const toggleSubstitute = () => {
    if (substituteSelected == true) {
      return null;
    }
    if (substituteSelected == false && structureSelected == false) {
      setSubstituteSelected(!substituteSelected);
    } else {
      setSubstituteSelected(!substituteSelected);
      setStructureSelected(!structureSelected);
    }
  };

  const signUp = (data) => {
    console.log('Data: ', data);
    if (substituteSelected == false && structureSelected == false) {
      Alert.alert('Veuillez sélectionner un type de compte');
    } else {
      auth()
        .createUserWithEmailAndPassword(email, data.password)
        .then((registeredUser) => {
          if (!substituteSelected) {
            Alert.alert('substitute selected');
            firestore
              .collection('users')
              .add({
                uid: registeredUser.user.uid,
                type: 'substitute',
              })
              .then((response) => {
                console.log(response);
                navigate('SubstituteSignupFirstPage');
              })
              .catch((error) => console.log(error));
          } else if (!structureSelected) {
            Alert.alert('structure selected');
            firestore
              .collection('users')
              .add({
                uid: registeredUser.user.uid,
                type: 'structure',
              })
              .then((response) => {
                console.log(response);
                navigate('StructureSignupFirstPage');
              })
              .catch((error) => console.log(error));
          }
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
        });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={{marginTop: 50}}>
            <Text style={styles.title}>Inscription</Text>
            <Text style={styles.subtitle}>Sélectionnez un type de compte</Text>
            <View style={styles.row}>
              <FlatCard
                onPress={() => toggleStructure()}
                selected={structureSelected}>
                <View style={styles.cardContent}>
                  <Substitute />
                  <Text style={styles.cardTitle}>Remplaçant</Text>
                </View>
              </FlatCard>
              <FlatCard
                onPress={() => toggleSubstitute()}
                selected={substituteSelected}>
                <View style={styles.cardContent}>
                  <Structure />
                  <Text style={styles.cardTitle}>Structure</Text>
                </View>
              </FlatCard>
            </View>
            <PasswordInput
              style={{marginBottom: 10, marginTop: 10}}
              placeholder={'Mot de passe'}
              label={'Mot de passe'}
              onChangeText={(text) => setValue('password', text)}
              height={60}
              error={errors.password ? errors.password?.message : null}
            />
            <PasswordInput
              placeholder={'Confirmer mot de passe'}
              label={'Confirmer mot de passe'}
              onChangeText={(text) => setValue('repeatPassword', text)}
              height={60}
              error={
                errors.repeatPassword ? errors.repeatPassword?.message : null
              }
            />
            <DarkPurpleButton
              onPress={handleSubmit(signUp)}
              style={{marginTop: 30}}>
              <DarkPurpleButtonText>Créer un compte</DarkPurpleButtonText>
            </DarkPurpleButton>
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
  row: {
    flexDirection: 'row',
    marginTop: 20,
  },
  cardContent: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  cardTitle: {
    fontFamily: 'Raleway',
    fontWeight: 'bold',
    fontSize: 14,
    color: colors.black,
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
});

export default Signup;
