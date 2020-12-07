import React, {FC, useState, useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useRecoilState} from 'recoil';
import {specialtyOptionsState} from '../../../../atoms';
import DropDownPicker from 'react-native-dropdown-picker';
import MenuPurple from '../../../../../assets/images/svg/Icons/MenuPurple.svg';
import UserPurple from '../../../../../assets/images/svg/Icons/UserPurple.svg';
import ArrowLeft from '../../../../../assets/images/svg/Icons/ArrowLeft.svg';
import MapPinPurple from '../../../../../assets/images/svg/Icons/MapPinPurple.svg';
import CustomInput from '../../../../components/CustomInput';
import TextArea from '../../../../components/TextArea';
import {useForm} from 'react-hook-form';
import {
  DarkPurpleButton,
  DarkPurpleButtonText,
} from '../../../../components/Styled';
import {colors} from '../../../../constants';
import {useNavigation} from '@react-navigation/native';

const AddDocByForm: FC = () => {
  const {navigate} = useNavigation();

  const {register, handleSubmit, setValue, watch, errors, setError} = useForm();

  const [specialtyPickerValue, setSpecialtyValue] = useState(specialtyOptions);
  const [specialtyOptions, setSpecialtyOptions] = useRecoilState(
    specialtyOptionsState,
  );

  useEffect(() => {
    register('rpps', {
      required: '* Champ obligatoire',
    });
    register('specialty', {
      required: '* Champ obligatoire',
    });
    register('lastName', {
      required: '* Champ obligatoire',
    });
    register('firstName', {
      required: '* Champ obligatoire',
    });
  }, [register]);

  useEffect(() => {
    const getSpecialtyOptions = async () => {
      await firestore()
        .collection('specialties')
        .get()
        .then((response) => {
          console.log('specialties:', response._docs);

          const specialtyOptionsArray = response._docs.map((item) => ({
            label: item._data.name,
            value: item.id,
          }));
          setSpecialtyOptions(specialtyOptionsArray);
          console.log('specialtyOptionsArray', specialtyOptionsArray);
        });
    };
    getSpecialtyOptions();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButtonView}
        onPress={() => navigation.goBack()}>
        <ArrowLeft width="40" />
      </TouchableOpacity>
      <View style={styles.headerView}>
        <View style={styles.titleView}>
          <Text style={styles.headerTitle}>Ajouter un doc’</Text>
        </View>
      </View>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Text style={styles.title}>Informations du doc’</Text>
          <View style={styles.row}>
            <View style={styles.inlineTextView}>
              <MenuPurple width="20" />
            </View>
            <View style={{flex: 1}}>
              <CustomInput
                style={{marginTop: 20}}
                placeholder={'N° RPPS'}
                label={'N° RPPS'}
                name={'rpps'}
                onChangeText={(text) => setValue('rpps', text)}
                height={60}
                error={errors.rpps ? errors.rpps?.message : null}
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.inlineTextView}>
              <UserPurple width="20" />
            </View>
            <View style={{flex: 1}}>
              <CustomInput
                style={{marginTop: 20}}
                placeholder={'Nom*'}
                label={'nom*'}
                name={'lastName'}
                onChangeText={(text) => setValue('lastName', text)}
                height={60}
                error={errors.lastName ? errors.lastName?.message : null}
              />
            </View>
          </View>
          <View style={{marginLeft: 40}}>
            <CustomInput
              style={{marginTop: 20}}
              placeholder={'Prénom*'}
              label={'Prénom*'}
              name={'firstName'}
              onChangeText={(text) => setValue('firstName', text)}
              height={60}
              error={errors.firstName ? errors.firstName?.message : null}
            />
          </View>
          <View
            style={[
              styles.row,
              {
                marginLeft: 40,
                ...(Platform.OS !== 'android' && {
                  zIndex: 1,
                }),
              },
            ]}>
            <View style={{flex: 1}}>
              <DropDownPicker
                placeholder="Choisir la spécialité*"
                items={specialtyOptions}
                defaultValue={specialtyPickerValue}
                containerStyle={styles.dropDownContainer}
                style={styles.dropDownPicker}
                itemStyle={{
                  justifyContent: 'flex-start',
                }}
                labelStyle={{
                  fontSize: 14,
                  textAlign: 'left',
                  color: colors.darkGray,
                }}
                dropDownStyle={styles.dropDownStyle}
                onChangeItem={(item) => setSpecialtyValue(item.value)}
              />
            </View>
            {errors.specialty ? (
              <Text style={styles.error}>{errors.specialty?.message}</Text>
            ) : null}
          </View>
          <Text style={styles.sectionTitle}>SON CHAMP D’ACTION</Text>
          <TextArea
            placeholder="ex: soigner les bobos du quotidien"
            name="notes"
          />
          <DarkPurpleButton
            style={{marginTop: 40}}
            onPress={() =>
              navigate('StructureSignupThirdPage', {
                empty: false,
              })
            }>
            <DarkPurpleButtonText>Suivant</DarkPurpleButtonText>
          </DarkPurpleButton>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grayBackground,
  },
  backButtonView: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  headerView: {
    height: 80,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleView: {
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    fontSize: 14,
    color: colors.black,
    marginTop: 40,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollViewContent: {
    flex: 1,
    backgroundColor: colors.grayBackground,
    paddingVertical: 40,
    margin: 20,
  },
  title: {
    textAlign: 'center',
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    fontSize: 24,
    color: colors.black,
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: 'Raleway',
    fontWeight: 'bold',
    fontSize: 10,
    textAlign: 'left',
    color: colors.darkGray,
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
  },
  inlineTextView: {
    justifyContent: 'center',
    width: 40,
    marginTop: 15,
  },
  dropDownContainer: {
    marginTop: 20,
    height: 60,
    backgroundColor: colors.white,
    color: colors.black,
    borderColor: colors.lightGray,
    borderRadius: 12,
    borderWidth: 1,
  },
  dropDownPicker: {
    paddingVertical: 10,
    borderWidth: 0,
    borderColor: 'red',
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  dropDownStyle: {
    backgroundColor: '#FFFFFF',
    shadowColor: 'grey',
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 2,
  },
});

export default AddDocByForm;
