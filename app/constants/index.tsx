export interface ColorPalette {
  main: string;
  light: string;
  veryLight: string;
  extraLight: string;
}

const createPalette = (r: number, v: number, b: number): ColorPalette => ({
  main: `rgba(${r}, ${v}, ${b}, 1)`,
  light: `rgba(${r}, ${v}, ${b}, 0.6)`,
  veryLight: `rgba(${r}, ${v}, ${b}, 0.16)`,
  extraLight: `rgba(${r}, ${v}, ${b}, 0.12)`,
});

export const colors = {
  grayBackground: '#FAFAFC',
  background: '#EEF3FB',
  purple: '#4863F5',
  mauve: '#FF3C88',
  green: '#39EEC9',
  black: '#0F283B',
  white: '#FFFFFF',
  blue: '#58C2FE',
  yellow: '#F8D764',
  darkGray: '#7C93B3',
  lightGray: '#C2CAE7',
  pink: '#ED4B9E',
  warmBlue: createPalette(59, 99, 223),
};

export const fonts = {
  MontserratRegular: 'Montserrat',
  MontserratBold: 'Montserrat-Bold',
  MontserratExtraBold: 'Montserrat-ExtraBold',
  MontserratLight: 'Montserrat-Light',
  MontserratThin: 'Montserrat-Thin',
  RalewayRegular: 'Raleway',
  RalewayBold: 'Raleway-Bold',
  RalewayExtraBold: 'Raleway-ExtraBold',
  RalewayLight: 'Raleway-Light',
  RalewayThin: 'Raleway-Thin',
};
