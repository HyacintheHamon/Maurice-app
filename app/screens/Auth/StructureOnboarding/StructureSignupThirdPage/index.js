import React, {FC, useEffect, useState} from 'react';
import {FlatList, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {useRecoilState} from 'recoil';
import {medicListState} from '../../../../atoms';
import {useNavigation} from '@react-navigation/native';
import EmptyView from './EmptyView';
import MedicRow from './MedicRow';
import {PinkButton, PinkButtonText} from '../../../../components/Styled';
import PlusPurple from '../../../../../assets/images/svg/Icons/PlusPurple.svg';
import StepIndicator from '../../../../components/StepIndicator';
import {colors} from '../../../../constants';

const StructureSignupThirdPage: FC = ({route}) => {
  const {navigate} = useNavigation();
  const [emptyList, setEmptyList] = useState(false);
  const [medicList, setMedicList] = useRecoilState(medicListState);

  const showEmptyView = () => {
    return <EmptyView />;
  };

  const renderItem = ({item}) => {
    return (
      <MedicRow
        name={item.name}
        domain={item.domain}
        specialty={item.specialty}
      />
    );
  };

  const addMedic = () => {
    const medicObject = {
      name: 'Dr Jean-Eudes de la Ruits-Picard',
      domain: 'Néphrologie',
      specialty: 'Médecine générale',
    };
    const newArray = [...medicList];
    newArray.push(medicObject);
    console.log('newArray', newArray);
    setMedicList(newArray);
  };

  return (
    <View style={{flex: 1}}>
      {emptyList ? (
        showEmptyView()
      ) : (
        <View style={styles.container}>
          <View style={styles.headerView}>
            <View style={styles.titleView}>
              <Text style={styles.headerTitle}>Inscription 3/3</Text>
            </View>
          </View>
          <StepIndicator
            titleOne="Ma structure"
            titleTwo="Mon petit plus"
            titleThree="Mes doc'"
            currentIcon={3}
          />
          <Text style={styles.title}>Mes Doc'</Text>
          <View style={styles.mainViewContent}>
            <Text style={styles.mainViewTitle}>LISTE DES MÉDECINS (1)</Text>
            {medicList.length != 0 && medicList != undefined ? (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={medicList}
                keyExtractor={(item) => item.rpps}
                renderItem={renderItem}
              />
            ) : null}
            <TouchableOpacity
              style={styles.addDocButton}
              onPress={() => navigate('AddDocBySearch')}>
              <View style={styles.row}>
                <PlusPurple width={20} />
                <Text style={styles.addDocButtonTitle}>Ajouter un doc'</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.bottomView}>
            <PinkButton onPress={() => addMedic()}>
              <PinkButtonText>Créer mon compte</PinkButtonText>
            </PinkButton>
          </View>
        </View>
      )}
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
  mainViewContent: {
    flex: 1,
    backgroundColor: colors.white,
    marginTop: 10,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingVertical: 40,
    padding: 10,
  },
  mainViewTitle: {
    fontFamily: 'Raleway',
    fontWeight: 'bold',
    fontSize: 10,
    color: '#7C93B3',
    marginLeft: 10,
  },
  title: {
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    fontSize: 24,
    color: colors.black,
    marginTop: 40,
    marginBottom: 20,
    textAlign: 'center',
  },
  medicList: {
    flex: 1,
  },
  addDocButton: {
    alignItems: 'center',
    marginTop: 20,
  },
  addDocButtonTitle: {
    fontFamily: 'Raleway',
    fontWeight: 'bold',
    fontSize: 14,
    color: colors.purple,
    marginTop: 2,
    marginLeft: 5,
  },
  row: {
    flexDirection: 'row',
  },
  bottomView: {
    marginLeft: 20,
    marginRight: 20,
    bottom: 40,
  },
});

export default StructureSignupThirdPage;
