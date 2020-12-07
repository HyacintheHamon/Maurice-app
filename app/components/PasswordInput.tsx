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

const PasswordInput = (props) => {
  const [value, onChangeText] = useState(props.value);
  const [visible, setVisibility] = useState(false);
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
        secureTextEntry={!visible}
        placeholderTextColor="#7C93B3"
        textContentType="none"
        autoCompleteType="off"
        autoCapitalize="none"
        autoCorrect={false}
        autoFocus={false}
        style={focused ? [styles.input, styles.inputFocused] : styles.input}
      />
      {focused ? <Text style={styles.onFocusLabel}>{props.label}</Text> : null}
      <TouchableOpacity
        onPress={() => setVisibility(!visible)}
        style={styles.inputIcon}>
        {visible ? (
          <EyeOff width="24" height="24" />
        ) : (
          <EyeOn width="24" height="24" />
        )}
      </TouchableOpacity>
    </View>
  );
};

PasswordInput.defaultProps = {
  label: '',
  height: 20,
};

const styles = StyleSheet.create({
  inputContainer: {
    display: 'flex',
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
    width: width - 60,
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
  inputIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
});

export default PasswordInput;
