import { TextStyle } from 'react-native';

export const typography = {
  displayLarge:       { fontWeight: '700', fontSize: 40, lineHeight: 48 } as TextStyle,
  displayMedium:      { fontWeight: '700', fontSize: 32, lineHeight: 40 } as TextStyle,
  h1:                 { fontWeight: '700', fontSize: 28, lineHeight: 36 } as TextStyle,
  h2:                 { fontWeight: '600', fontSize: 24, lineHeight: 32 } as TextStyle,
  h3:                 { fontWeight: '600', fontSize: 20, lineHeight: 28 } as TextStyle,
  title:              { fontWeight: '600', fontSize: 18, lineHeight: 26 } as TextStyle,
  bodyLarge:          { fontWeight: '400', fontSize: 16, lineHeight: 24 } as TextStyle,
  body:               { fontWeight: '400', fontSize: 14, lineHeight: 20 } as TextStyle,
  bodySmall:          { fontWeight: '400', fontSize: 12, lineHeight: 18 } as TextStyle,
  labelLarge:         { fontWeight: '500', fontSize: 14, lineHeight: 20 } as TextStyle,
  label:              { fontWeight: '500', fontSize: 12, lineHeight: 16 } as TextStyle,
  caption:            { fontWeight: '400', fontSize: 11, lineHeight: 16 } as TextStyle,
  tiny:               { fontWeight: '400', fontSize: 10, lineHeight: 14 } as TextStyle,
  bodyReg:            { fontWeight: '400', fontSize: 14, lineHeight: 20 } as TextStyle,
  bodyRegItalic:      { fontWeight: '400', fontStyle: 'italic', fontSize: 14, lineHeight: 20 } as TextStyle,
  bodySemiBold:       { fontWeight: '600', fontSize: 14, lineHeight: 20 } as TextStyle,
  bodySemiBoldItalic: { fontWeight: '600', fontStyle: 'italic', fontSize: 14, lineHeight: 20 } as TextStyle,
  h3Bold:             { fontWeight: '700', fontSize: 20, lineHeight: 28 } as TextStyle,
  buttonMedium:       { fontWeight: '600', fontSize: 14, lineHeight: 20 } as TextStyle,
} as const;
