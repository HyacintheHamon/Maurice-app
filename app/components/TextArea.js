import React, {FC, useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {colors} from '../constants';

const TextArea = (props) => {
  const [textAreaFocused, setTextAreaFocused] = useState(false);
  return (
    <View>
      <View
        style={
          props.error
            ? styles.textAreaContainerError
            : textAreaFocused
            ? styles.textAreaContainerFocused
            : styles.textAreaContainer
        }>
        <TextInput
          style={styles.textArea}
          underlineColorAndroid="transparent"
          placeholder={props.placeholder}
          placeholderTextColor="grey"
          placeholderTextColor="#7C93B3"
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus={false}
          name={props.name}
          numberOfLines={10}
          multiline={true}
          onFocus={() => {
            setTextAreaFocused(true);
          }}
          onBlur={() => {
            setTextAreaFocused(false);
          }}
        />
      </View>
      {props.error ? <Text style={styles.error}>{props.error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  textAreaContainer: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.lightGray,
    padding: 5,
    lineHeight: 17,
    borderRadius: 12,
    marginTop: 20,
    marginBottom: 20,
  },
  textArea: {
    height: 150,
    justifyContent: 'flex-start',
    color: colors.black,
    fontFamily: 'Raleway',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 17,
    margin: 10,
  },
  textAreaContainerFocused: {
    marginTop: 20,
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
  textAreaContainerError: {
    marginTop: 20,
    borderWidth: 2,
    borderColor: colors.pink,
    borderRadius: 12,
  },
  error: {
    marginTop: 10,
    marginLeft: 10,
    fontFamily: 'Raleway',
    fontWeight: '500',
    fontSize: 12,
    color: colors.pink,
  },
});

export default TextArea;
