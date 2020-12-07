import React from 'react';
import {View} from 'react-native';
import {color} from 'react-native-reanimated';
import Svg, {Ellipse} from 'react-native-svg';
import {colors} from '../constants';

export default function RoundedBackground({
  customStyles,
  customHeight,
  customTop,
}) {
  return (
    <View style={customStyles}>
      <View style={{height: customHeight}}>
        <Svg
          viewBox="0 0 360 255"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{position: 'absolute', top: customTop}}>
          <Ellipse
            cx="180"
            cy="81.5"
            rx="370"
            ry="173.5"
            fill={colors.purple}
          />
        </Svg>
      </View>
    </View>
  );
}
