import React, {FC} from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import RadioButtonFilledPurple from '../../assets/images/svg/Icons/RadioButtonFilledPurple.svg';
import RadioButtonFilledGray from '../../assets/images/svg/Icons/RadioButtonFilledGray.svg';
import RadioButtonCheck from '../../assets/images/svg/Icons/RadioButtonCheck.svg';
import {colors} from '../constants';

const {width} = Dimensions.get('window');

const StepIndicator = (props) => {
  const renderIndicatorIconOne = () => {
    if (props.currentIcon == 1) {
      return <RadioButtonFilledPurple width={30} />;
    } else if (props.currentIcon == 2) {
      return <RadioButtonCheck width={30} />;
    } else if (props.currentIcon == 3) {
      return <RadioButtonCheck width={30} />;
    } else {
      <RadioButtonFilledGray width={30} />;
    }
  };

  const renderIndicatorIconTwo = () => {
    if (props.currentIcon == 1) {
      return <RadioButtonFilledGray width={30} />;
    } else if (props.currentIcon == 2) {
      return <RadioButtonFilledPurple width={30} />;
    } else if (props.currentIcon == 3) {
      return <RadioButtonCheck width={30} />;
    } else {
      <RadioButtonFilledGray width={30} />;
    }
  };

  const renderIndicatorIconThree = () => {
    if (props.currentIcon == 1) {
      return <RadioButtonFilledGray width={30} />;
    } else if (props.currentIcon == 2) {
      return <RadioButtonFilledGray width={30} />;
    } else if (props.currentIcon == 3) {
      return <RadioButtonFilledPurple width={30} />;
    } else {
      <RadioButtonFilledGray width={30} />;
    }
  };

  return (
    <View style={styles.stepIndicatorWrapper}>
      <View style={styles.stepIndicatorContainer}>
        <View style={styles.stepIndicator}>
          {renderIndicatorIconOne()}
          <View style={styles.horizontalLine} />
          {renderIndicatorIconTwo()}
          <View style={styles.horizontalLine} />
          {renderIndicatorIconThree()}
        </View>
        <View style={styles.stepIndicatorTitleView}>
          <View style={styles.indicator}>
            <Text
              style={
                props.currentIcon == 1
                  ? styles.hightlightedTitle
                  : styles.grayTitle
              }>
              {props.titleOne}
            </Text>
          </View>
          <View style={styles.indicator}>
            <Text
              style={
                props.currentIcon == 2
                  ? styles.hightlightedTitle
                  : styles.grayTitle
              }>
              {props.titleTwo}
            </Text>
          </View>
          <View style={styles.indicator}>
            <Text
              style={
                props.currentIcon == 3
                  ? styles.hightlightedTitle
                  : styles.grayTitle
              }>
              {props.titleThree}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  stepIndicatorWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  stepIndicatorContainer: {
    justifyContent: 'center',
  },
  stepIndicator: {
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  stepIndicatorTitleView: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  indicator: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicatorTitle: {
    textAlign: 'center',
  },
  horizontalLine: {
    borderWidth: 1,
    borderColor: colors.lightGray,
    //width: '100%',
    width: width / 6,
    height: 2,
    marginLeft: 5,
    marginRight: 5,
  },
  hightlightedTitle: {
    fontFamily: 'Raleway',
    fontWeight: 'bold',
    fontSize: 14,
    color: colors.black,
  },
  grayTitle: {
    fontFamily: 'Raleway',
    fontWeight: '500',
    fontSize: 12,
    color: colors.darkGray,
  },
});

export default StepIndicator;
