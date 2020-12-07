import React, {FC} from 'react';
import {View, StyleSheet, Text} from 'react-native';

import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {colors} from '../constants';

const GooglePlacesAutocompleteInput = (props) => {
  return (
    <View style={{flex: 1}}>
      <GooglePlacesAutocomplete
        placeholder={props.placeholder}
        suppressDefaultStyles={true}
        minLength={3}
        autoFocus={false}
        returnKeyType={'default'}
        fetchDetails={true}
        enablePoweredByContainer={false}
        styles={{
          textInputContainer: styles.inputContainer,
          textInput: styles.input,
          predefinedPlacesDescription: styles.predefinedPlacesDescription,
          poweredContainer: styles.poweredContainer,
          powered: {},
          listView: {},
          row: {
            backgroundColor: '#FFFFFF',
            padding: 13,
            height: 44,
            flexDirection: 'row',
          },
          separator: styles.separator,
          description: {},
          loader: styles.loader,
        }}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
        }}
        ListEmptyComponent={() => (
          <Text
            style={{
              fontFamily: 'Montserrat-Medium',
              fontSize: 16,
              color: 'white',
              alignSelf: 'center',
              paddingVertical: 20,
            }}>
            Aucune addresse trouvée
          </Text>
        )}
        query={{
          key: 'AIzaSyCNJ7R7W5n-omNzKbVe_qWwnpQcHkn_QTQ',
          language: 'fr',
        }}
        onChangeText={(text) => setValue('address', text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  predefinedPlacesDescription: {
    backgroundColor: colors.white,
  },
  poweredContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderColor: '#c8c7cc',
    borderTopWidth: 0.5,
  },
  separator: {
    height: 0.5,
    backgroundColor: '#c8c7cc',
  },
  loader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 20,
  },
  inputContainer: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 12,
    paddingVertical: 20,
    padding: 10,
  },
  input: {
    backgroundColor: colors.white,
    fontFamily: 'Raleway',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 17,
    color: colors.black,
  },
  inputContainerFocused: {
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
});

export default GooglePlacesAutocompleteInput;
