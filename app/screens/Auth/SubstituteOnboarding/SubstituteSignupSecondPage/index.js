import React, {FC, useState} from 'react';
import {FlatList, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {useRecoilState} from 'recoil';
import {substituteExperiencesListState} from '../../../../atoms';
import {useNavigation} from '@react-navigation/native';
import EmptyView from './EmptyView';
import {colors} from '../../../../constants';
import {
  LightPurpleButton,
  LightPurpleButtonText,
  PinkButton,
  PinkButtonText,
} from '../../../../components/Styled';
import PlusPurple from '../../../../../assets/images/svg/Icons/PlusPurple.svg';
import AddExperienceModal from '../../../Modals/AddExperienceModal';
import ExperienceCard from '../../../../components/ExperienceCard';

const SubstituteSignupSecondPage: FC = () => {
  const {navigate} = useNavigation();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [emptyList, setEmptyList] = useState(false);
  const [experienceList, setExperienceList] = useRecoilState(
    substituteExperiencesListState,
  );

  const showEmptyView = () => {
    return <EmptyView />;
  };

  const AddExperience = () => {
    const experienceObject = {
      monthYear: 'Juin 2020',
      structureNameTitle: 'CHU de Perpan',
      missionDescription:
        'Médecine générale et ceci est une description des missions',
    };
    const newArray = [...experienceList];
    newArray.push(experienceObject);
    console.log('newArray', newArray);
    setExperienceList(newArray);
  };

  const renderItem = (props, ...rest) => {
    const {item} = props;
    console.log({props, rest});
    if (item.isLast == true) {
      return (
        <ExperienceCard
          monthYear={item.monthYear}
          structureNameTitle={item.structureNameTitle}
          missionDescription={item.missionDescription}
          lastItem
        />
      );
    } else {
      return (
        <ExperienceCard
          monthYear={item.monthYear}
          structureNameTitle={item.structureNameTitle}
          missionDescription={item.missionDescription}
        />
      );
    }
  };

  return (
    <View style={{flex: 1}}>
      {emptyList ? (
        showEmptyView()
      ) : (
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => navigate('Tabs')}
            style={styles.skipButtonView}>
            <Text style={styles.skip}>Ignorer</Text>
          </TouchableOpacity>
          <View style={styles.headerView}>
            <View style={styles.titleView}>
              <Text style={styles.headerTitle}>Inscription 2/3</Text>
            </View>
          </View>
          <Text style={styles.title}>Mes expériences</Text>
          <View style={styles.scrollViewContent}>
            {experienceList.length != 0 && experienceList != undefined ? (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={experienceList.map(
                  (item, i, arr) =>
                    i === arr.length - 1
                      ? {...item, isLast: true}
                      : {...item, isLast: false},
                  // arr.length == 1
                  //  ? {...item, oneItem: true}
                  //  : {...item, oneItem: false},
                )}
                keyExtractor={(item) => item.structureNameTitle}
                renderItem={renderItem}
              />
            ) : null}
          </View>
          <View style={styles.bottomView}>
            <LightPurpleButton
              style={{marginTop: 20}}
              //onPress={() => setIsModalVisible(true)}
              onPress={() => AddExperience()}>
              <View style={styles.row}>
                <PlusPurple width={20} />
                <LightPurpleButtonText style={{marginTop: 2, marginLeft: 5}}>
                  Ajouter une expérience
                </LightPurpleButtonText>
              </View>
            </LightPurpleButton>
            <PinkButton style={{marginTop: 20}} onPress={() => {}}>
              <PinkButtonText>Créer mon compte</PinkButtonText>
            </PinkButton>
          </View>
        </View>
      )}
      <AddExperienceModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
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
  row: {
    flexDirection: 'row',
  },
  scrollViewContent: {
    flex: 1,
    backgroundColor: colors.white,
    marginTop: 20,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingVertical: 40,
    padding: 10,
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
    marginTop: 40,
    marginBottom: 20,
    textAlign: 'center',
  },
  bottomView: {
    marginLeft: 20,
    marginRight: 20,
    bottom: 40,
  },
});

export default SubstituteSignupSecondPage;
