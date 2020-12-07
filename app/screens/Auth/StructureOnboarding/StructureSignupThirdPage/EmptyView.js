import React, {FC, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import MesDoc from '../../../../../assets/images/svg/Illustrations/MesDoc';
import {
  DarkPurpleButton,
  DarkPurpleButtonText,
} from '../../../../components/Styled';
import StepIndicator from '../../../../components/StepIndicator';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../../../constants';

const {width} = Dimensions.get('window');

const EmptyView: FC = () => {
  const {navigate} = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigate('Tabs')}
        style={styles.skipButtonView}>
        <Text style={styles.skip}>Ignorer</Text>
      </TouchableOpacity>
      <View style={styles.headerView}>
        <View style={styles.titleView}>
          <Text style={styles.headerTitle}>Inscription 3/3</Text>
        </View>
      </View>
      <View style={{marginTop: 20}}>
        <StepIndicator
          titleOne="Ma structure"
          titleTwo="Mon petit plus"
          titleThree="Mes doc'"
          currentIcon={3}
        />
      </View>
      <View style={styles.mainContent}>
        <Text style={styles.title}>Mes Doc’</Text>
        <MesDoc />
        <Text style={styles.subtitle}>
          Ajoutez les médecins de votre structure afin de facilité la création
          de vos futures annonces
        </Text>
      </View>
      <View style={styles.buttonView}>
        <DarkPurpleButton onPress={() => navigate('AddDocByForm')}>
          <DarkPurpleButtonText>Ajouter un doc'</DarkPurpleButtonText>
        </DarkPurpleButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grayBackground,
  },
  skipButtonView: {
    position: 'absolute',
    top: 50,
    right: 40,
    zIndex: 1,
  },
  skip: {
    fontFamily: 'Raleway',
    fontWeight: '600',
    fontSize: 12,
    color: colors.purple,
  },
  mainContent: {
    flex: 1,
    backgroundColor: colors.grayBackground,
    marginTop: 60,
    alignItems: 'center',
  },
  buttonView: {
    flex: 1,
    backgroundColor: colors.grayBackground,
    margin: 20,
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
  title: {
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    fontSize: 24,
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
    width: width - 80,
    marginBottom: 40,
  },
});

export default EmptyView;
