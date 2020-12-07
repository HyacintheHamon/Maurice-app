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
import {colors} from '../../constants';
import Close from '../../../assets/images/svg/Icons/Close.svg';
import TextArea from '../../components/TextArea';
import MedicCard from '../Auth/StructureOnboarding/StructureSignupThirdPage/MedicCard';
import {DarkPurpleButton, DarkPurpleButtonText} from '../../components/Styled';
const {width, height} = Dimensions.get('window');

const AddMedicDetailsModal: FC = (props) => {
  const {isModalVisible, setIsModalVisible} = props;

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
            <Text style={styles.headerTitle}>Ajouter un doc’</Text>
          </View>
        </View>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={0}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Text style={styles.title}>Informations du doc’</Text>
            <MedicCard
              key="Julien Peignet"
              name="Julien Peignet"
              domain="Psychiatrie"
              rpps="23345698049"
              sex={1}
            />
            <Text style={styles.sectionTitle}>SON CHAMP D’ACTION</Text>
            <TextArea
              placeholder="ex: soigner les bobos du quotidien"
              name="notes"
              height={120}
            />
            <DarkPurpleButton>
              <DarkPurpleButtonText>Ajouter un doc'</DarkPurpleButtonText>
            </DarkPurpleButton>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
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
    backgroundColor: colors.white,
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

export default AddMedicDetailsModal;
