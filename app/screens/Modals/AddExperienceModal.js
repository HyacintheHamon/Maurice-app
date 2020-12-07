import React, {FC, useState, useEffect, useCallback} from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Modal from 'react-native-modal';
import MonthPicker from 'react-native-month-year-picker';
import CustomInput from '../../components/CustomInput';
import {useForm} from 'react-hook-form';
import {colors} from '../../constants';
import Close from '../../../assets/images/svg/Icons/Close.svg';
import CalendarPurple from '../../../assets/images/svg/Icons/CalendarPurple.svg';
import {PinkButton, PinkButtonText} from '../../components/Styled';
import TextArea from '../../components/TextArea';

const {width, height} = Dimensions.get('window');

const AddExperienceModal: FC = (props) => {
  const {register, handleSubmit, setValue, watch, errors, setError} = useForm();
  const [startDate, setStartDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [endDate, setEndDate] = useState(new Date());
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const {isModalVisible, setIsModalVisible} = props;

  const monthNames = [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
  ];

  useEffect(() => {
    register('structureName', {
      required: '* Champ obligatoire',
    });
  }, [register]);

  const showStartPicker = useCallback(
    (value) => setShowStartDatePicker(value),
    [],
  );

  const onStartDateValueChange = useCallback(
    (event, newDate) => {
      const selectedDate = newDate || startDate;

      showStartPicker(false);
      setStartDate(selectedDate);
    },
    [startDate, showStartPicker],
  );

  const showEndPicker = useCallback((value) => setShowEndDatePicker(value), []);

  const onEndDateValueChange = useCallback(
    (event, newDate) => {
      const selectedDate = newDate || endDate;

      showEndPicker(false);
      setEndDate(selectedDate);
    },
    [endDate, showStartPicker],
  );

  return (
    <Modal
      style={styles.modal}
      animationIn="fadeIn"
      animationOut="fadeOut"
      isVisible={isModalVisible}
      coverScreen={true}
      deviceWidth={width}
      deviceHeight={height}
      useNativeDriver={true}>
      <TouchableOpacity
        onPress={() => setIsModalVisible(false)}
        style={styles.closeButtonView}>
        <Close />
      </TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.headerView}>
          <View style={styles.titleView}>
            <Text style={styles.headerTitle}>Ajouter une expérience</Text>
          </View>
        </View>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={0}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Text style={styles.title}>Expérience</Text>
            <CustomInput
              style={{marginTop: 20}}
              placeholder={'Nom de la structure*'}
              label={'Nom de la structure*'}
              name={'structureName'}
              onChangeText={(text) => setValue('structureName', text)}
              height={60}
              error={
                errors.structureName ? errors.structureName?.message : null
              }
            />
            <Text style={styles.sectionTitle}>DURÉE</Text>
            <View style={styles.row}>
              <View style={styles.inlineTextView}>
                <Text style={styles.inlineText}>DE</Text>
              </View>
              <TouchableOpacity
                onPress={() => showStartPicker(true)}
                style={styles.monthYearSelectorButton}>
                <Text style={styles.monthYearSelectorButtonText}>
                  {monthNames[startDate.getMonth()]} {startDate.getFullYear()}
                </Text>
                <CalendarPurple />
              </TouchableOpacity>
            </View>
            <View style={[styles.row, {marginTop: 10}]}>
              <View style={styles.inlineTextView}>
                <Text style={styles.inlineText}>À</Text>
              </View>
              <TouchableOpacity
                onPress={() => showEndPicker(true)}
                style={styles.monthYearSelectorButton}>
                <Text style={styles.monthYearSelectorButtonText}>
                  {monthNames[endDate.getMonth()]} {endDate.getFullYear()}
                </Text>
                <CalendarPurple />
              </TouchableOpacity>
            </View>
            <TextArea placeholder="Description de la mission" name="notes" />
            <PinkButton>
              <PinkButtonText>Ajouter</PinkButtonText>
            </PinkButton>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
      {showStartDatePicker && (
        <MonthPicker
          onChange={onStartDateValueChange}
          value={startDate}
          minimumDate={new Date(1900, 1)}
          maximumDate={new Date()}
          locale="fr"
        />
      )}
      {showEndDatePicker && (
        <MonthPicker
          onChange={onEndDateValueChange}
          value={endDate}
          minimumDate={startDate}
          maximumDate={new Date()}
          locale="fr"
        />
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    backgroundColor: colors.grayBackground,
  },
  container: {
    flex: 1,
    backgroundColor: colors.grayBackground,
  },
  closeButtonView: {
    position: 'absolute',
    top: 50,
    right: 40,
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
  },
  inlineText: {
    fontFamily: 'Raleway',
    fontWeight: 'bold',
    fontSize: 10,
    textAlign: 'left',
    color: colors.darkGray,
  },
  monthYearSelectorButton: {
    flex: 1,
    height: 60,
    backgroundColor: '#EEF3FB',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  monthYearSelectorButtonText: {
    fontFamily: 'Raleway',
    fontWeight: 'bold',
    fontSize: 14,
    color: colors.purple,
  },
});

export default AddExperienceModal;
