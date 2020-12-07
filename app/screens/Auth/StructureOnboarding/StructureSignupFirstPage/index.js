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
import {structureOptionsState} from '../../../../atoms';
import DropDownPicker from 'react-native-dropdown-picker';
import Close from '../../../../../assets/images/svg/Icons/Close.svg';
import HomePurple from '../../../../../assets/images/svg/Icons/HomePurple.svg';
import MapPinPurple from '../../../../../assets/images/svg/Icons/MapPinPurple.svg';
import CustomInput from '../../../../components/CustomInput';
import {useForm} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import {
  DarkPurpleButton,
  DarkPurpleButtonText,
} from '../../../../components/Styled';
import {colors} from '../../../../constants';
import StepIndicator from '../../../../components/StepIndicator';

const StructureSignupFirstPage: FC = ({navigation}) => {
  const {navigate} = useNavigation();

  const {register, handleSubmit, setValue, watch, errors, setError} = useForm();

  const [structureTypePickerValue, setStructureTypeValue] = useState('');
  const [structureTypeOptions, setStructureTypeOptions] = useRecoilState(
    structureOptionsState,
  );

  useEffect(() => {
    register('structureType', {
      required: '* Champ obligatoire',
    });
    register('structureName', {
      required: '* Champ obligatoire',
    });
    register('address', {
      required: '* Champ obligatoire',
    });
    register('additionalAddress', {
      //required: '* Champ obligatoire',
    });
    register('city', {
      required: '* Champ obligatoire',
    });
    register('postalCode', {
      required: '* Champ obligatoire',
    });
  }, [register]);

  useEffect(() => {
    const getStructureTypes = async () => {
      await firestore()
        .collection('structureTypes')
        .get()
        .then((response) => {
          console.log('types:', response._docs);

          const structureTypesArray = response._docs.map((item) => ({
            label: item._data.name,
            value: item.id,
          }));
          setStructureTypeOptions(structureTypesArray);
          console.log('structureTypesArray', structureTypesArray);
        });
    };
    getStructureTypes();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.closeButtonView}>
        <Close />
      </TouchableOpacity>
      <View style={styles.headerView}>
        <View style={styles.titleView}>
          <Text style={styles.headerTitle}>Inscription 1/3</Text>
        </View>
      </View>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <StepIndicator
            titleOne="Ma structure"
            titleTwo="Mon petit plus"
            titleThree="Mes doc'"
            currentIcon={1}
          />
          <Text style={styles.title}>Ma structure</Text>
          <View
            style={[
              styles.row,
              {
                ...(Platform.OS !== 'android' && {
                  zIndex: 1,
                }),
              },
            ]}>
            <View style={styles.inlineTextView}>
              <HomePurple width="20" />
            </View>
            <View style={{flex: 1}}>
              <DropDownPicker
                placeholder="Type de structure*"
                items={structureTypeOptions}
                defaultValue={structureTypePickerValue}
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
                onChangeItem={(item) => setStructureTypeValue(item.value)}
              />
            </View>
            {errors.specialty ? (
              <Text style={styles.error}>{errors.specialty?.message}</Text>
            ) : null}
          </View>
          <View style={{marginLeft: 40}}>
            <CustomInput
              style={{marginTop: 20}}
              placeholder={'Nom de la structure | Service*'}
              label={'Nom de la structure | Service*'}
              name={'structureName'}
              onChangeText={(text) => setValue('structureName', text)}
              height={60}
              error={
                errors.structureName ? errors.structureName?.message : null
              }
            />
          </View>
          <Text style={styles.sectionTitle}>LOCALISATION</Text>
          <View style={[styles.row, {marginTop: 20}]}>
            <View style={styles.inlineTextView}>
              <MapPinPurple width="20" />
            </View>
            <View style={{flex: 1}}>
              <CustomInput
                style={{marginTop: 20}}
                placeholder={'Adresse'}
                label={'Adresse'}
                name={'address'}
                onChangeText={(text) => setValue('address', text)}
                height={60}
                error={errors.address ? errors.address?.message : null}
              />
            </View>
          </View>
          <View style={{marginLeft: 40}}>
            <CustomInput
              style={{marginTop: 20}}
              placeholder={'Complément d’adresse'}
              label={'Complément d’adresse'}
              name={'additionalAddress'}
              onChangeText={(text) => setValue('additionalAddress', text)}
              height={60}
              error={
                errors.additionalAddress
                  ? errors.additionalAddress?.address
                  : null
              }
            />
            <CustomInput
              style={{marginTop: 20}}
              placeholder={'Ville*'}
              label={'Ville*'}
              name={'city'}
              onChangeText={(text) => setValue('city', text)}
              height={60}
              error={errors.city ? errors.city?.message : null}
            />
            <CustomInput
              style={{marginTop: 20}}
              placeholder={'Code postal*'}
              label={'Code postal*'}
              name={'postalCode'}
              onChangeText={(text) => setValue('postalCode', text)}
              height={60}
              error={errors.postalCode ? errors.postalCode?.message : null}
            />
          </View>
        </ScrollView>
        <DarkPurpleButton
          style={{marginBottom: 40, marginLeft: 20, marginRight: 20}}
          onPress={() => navigate('StructureSignupSecondPage')}>
          <DarkPurpleButtonText>Suivant</DarkPurpleButtonText>
        </DarkPurpleButton>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grayBackground,
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
  closeButtonView: {
    position: 'absolute',
    top: 50,
    right: 40,
    zIndex: 1,
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

export default StructureSignupFirstPage;
