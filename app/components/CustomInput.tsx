import React, {useState} from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {colors} from '../constants';
import EyeOn from '../../assets/images/svg/Icons/EyeOn.svg';
import EyeOff from '../../assets/images/svg/Icons/EyeOff.svg';

const {width} = Dimensions.get('window');

const CustomInput = (props) => {
  const [value, onChangeText] = useState(props.value);
  const [focused, setFocused] = useState(false);
  const [placeholder, setPlaceholder] = useState(props.placeholder);

  return (
    <View style={styles.inputContainer} {...props}>
      <TextInput
        onChangeText={(text) => {
          onChangeText(text);
          props.onChangeText(text);
        }}
        onFocus={() => {
          setFocused(true), setPlaceholder('');
        }}
        onBlur={() => {
          setFocused(false), setPlaceholder(props.placeholder);
        }}
        value={value}
        placeholder={placeholder}
        name={props.name}
        placeholderTextColor="#7C93B3"
        keyboardType={props.keyboardType}
        autoCompleteType={props.autoCompleteType}
        autoCapitalize="none"
        autoCorrect={false}
        autoFocus={false}
        style={
          props.error
            ? [styles.input, styles.inputError]
            : focused
            ? [styles.input, styles.inputFocused]
            : styles.input
        }
      />
      {props.error ? (
        <Text style={styles.errorLabel}>{props.label}</Text>
      ) : focused ? (
        <Text style={styles.onFocusLabel}>{props.label}</Text>
      ) : null}
      {props.error ? <Text style={styles.error}>{props.error}</Text> : null}
    </View>
  );
};

CustomInput.defaultProps = {
  label: '',
  height: 20,
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 12,
    paddingVertical: 20,
    fontFamily: 'Raleway',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 17,
    color: colors.black,
    padding: 10,
  },
  inputFocused: {
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
  onFocusLabel: {
    fontFamily: 'Raleway',
    fontWeight: '600',
    fontSize: 12,
    color: colors.purple,
    position: 'absolute',
    top: 10,
    left: 10,
  },
  inputError: {
    borderWidth: 2,
    borderColor: colors.pink,
  },
  errorLabel: {
    fontFamily: 'Raleway',
    fontWeight: '600',
    fontSize: 12,
    color: colors.pink,
    position: 'absolute',
    top: 10,
    left: 10,
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

export default CustomInput;
