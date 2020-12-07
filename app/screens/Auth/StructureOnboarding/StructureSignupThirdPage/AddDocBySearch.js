import React, {FC, useState, useEffect, useCallback} from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  View,
  ScrollView,
  StyleSheet,
  FlatList,
} from 'react-native';
import axios from 'axios';
import MedicCard from './MedicCard';
import AddMedicDetailsModal from '../../../Modals/AddMedicDetails';
import ArrowLeft from '../../../../../assets/images/svg/Icons/ArrowLeft.svg';
import Search from '../../../../../assets/images/svg/Icons/Search.svg';
import {colors} from '../../../../constants';

const AddDocBySearch: FC = ({navigation}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [token, setToken] = useState('');
  const [medicList, setMedicList] = useState([]);

  useEffect(() => {
    axios
      .post('https://production.api-annuaire-sante.fr/login_check', {
        username: 'hyacinthe.hamon@gmail.com',
        password: 'YAYA1212',
      })
      .then(
        (response) => {
          console.log(response);
          setToken(response.data.token);
        },
        (error) => {
          console.log(error);
        },
      );
  }, []);

  const searchMedic = () => {
    setIsSearching(true);
    const isNumber = isNaN(searchText);
    //input is a number, trying rpps
    if (!isNumber) {
      axios
        .get(
          'https://production.api-annuaire-sante.fr/professionnel_de_santes?identifiantPP=' +
            searchText,
          {
            headers: {
              Authorization: 'Bearer ' + token,
              Accept: 'application/json',
            },
          },
        )
        .then((response) => {
          console.log(response);
          setIsSearching(false);

          const medicListArray = response.data.map((item) => ({
            firstName: item.prenom,
            lastName: item.nom,
            domain: item.libelleProfession,
            rpps: item.identificationNationalePP,
          }));
          setMedicList(medicListArray);
          console.log('medicListArray', medicListArray);
        })
        .catch((error) => {
          console.log(error);
          setIsSearching(false);
        });
    } else {
      //input is not a number, trying firstName
      axios
        .get(
          'https://production.api-annuaire-sante.fr/professionnel_de_santes?prenom=' +
            searchText,
          {
            headers: {
              Authorization: 'Bearer ' + token,
              Accept: 'application/json',
            },
          },
        )
        .then((response) => {
          if (response.data == []) {
            // Got empty response for firstName, trying lastName
            axios
              .get(
                'https://production.api-annuaire-sante.fr/professionnel_de_santes?nom=' +
                  searchText,
                {
                  headers: {
                    Authorization: 'Bearer ' + token,
                    Accept: 'application/json',
                  },
                },
              )
              .then((response) => {
                // lastName reponse
                console.log(response);
                setIsSearching(false);

                const medicListArray = response.data.map((item) => ({
                  firstName: item.prenom,
                  lastName: item.nom,
                  domain: item.libelleProfession,
                  rpps: item.identificationNationalePP,
                }));
                setMedicList(medicListArray);
                console.log('medicListArray', medicListArray);
              })
              .catch((error) => {
                console.log(error);
                setIsSearching(false);
              });
          } else {
            // Got response
            console.log(response);
            setIsSearching(false);

            const medicListArray = response.data.map((item) => ({
              firstName: item.prenom,
              lastName: item.nom,
              domain: item.libelleProfession,
              rpps: item.identificationNationalePP,
            }));
            setMedicList(medicListArray);
            console.log('medicListArray', medicListArray);
          }
        })
        .catch((error) => {
          console.log(error);
          setIsSearching(false);
        });
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <MedicCard
        key={item.name}
        name={item.firstName + ' ' + item.lastName}
        domain={item.domain}
        rpps={item.rpps}
        withButton
        onPress={() => {
          // Get information of selected object based on index
          setIsModalVisible(true);
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButtonView}
        onPress={() => navigation.goBack()}>
        <ArrowLeft width="40" />
      </TouchableOpacity>
      <View style={styles.headerView}>
        <View style={styles.headerTitleView}>
          <Text style={styles.headerTitle}>Ajouter un doc'</Text>
        </View>
      </View>
      <Text style={styles.title}>Informations du doc’</Text>
      <View style={styles.inputContainer}>
        {isSearching ? (
          <ActivityIndicator size="small" color="#000000" />
        ) : (
          <Search width={17} style={styles.searchIcon} />
        )}
        <TextInput
          style={styles.input}
          placeholder="Nom Prénom ou RPPS"
          placeholderStyle={styles.placeholderStyle}
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus={false}
          defaultValue={searchText}
          onChangeText={(value) => {
            setSearchText(value);
            //searchMedic();
            console.log(searchText);
          }}
          value={searchText}
        />
      </View>
      <View style={styles.separator} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {medicList.length != 0 && medicList != undefined ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={medicList}
            keyExtractor={(item) => item.rpps}
            renderItem={renderItem}
          />
        ) : null}
      </ScrollView>
      <AddMedicDetailsModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  row: {
    flexDirection: 'row',
  },
  headerView: {
    flexDirection: 'row',
    height: 80,
  },
  headerTitleView: {
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  headerTitle: {
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    fontSize: 14,
    color: colors.black,
  },
  backButtonView: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  scrollViewContent: {
    flex: 1,
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
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#EEF3FB',
    borderRadius: 32,
    padding: 10,
    height: 45,
    margin: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    fontFamily: 'Raleway',
    fontWeight: 'bold',
    fontSize: 14,
  },
  placeholderStyle: {
    fontFamily: 'Raleway',
    fontWeight: 'bold',
    fontSize: 14,
    color: colors.darkGray,
  },
});

export default AddDocBySearch;
