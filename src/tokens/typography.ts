import { TextStyle } from 'react-native';

import colors from './colors.json';

export enum CCFontFamilies {
  Black = 'Inter-Black',
  Bold = 'Inter-Bold',
  BoldItalic = 'Inter-BoldItalic',
  ExtraBold = 'Inter-ExtraBold',
  ExtraBoldItalic = 'Inter-ExtraBoldItalic',
  ExtraLight = 'Inter-ExtraLight-BETA',
  ExtraLightItalic = 'Inter-ExtraLightItalic-BETA',
  Italic = 'Inter-Italic',
  Light = 'Inter-Light-BETA',
  LightItalic = 'Inter-LightItalic-BETA',
  Medium = 'Inter-Medium',
  MediumItalic = 'Inter-MediumItalic',
  Regular = 'Inter-Regular',
  SemiBold = 'Inter-SemiBold',
  SemiBoldItalic = 'Inter-SemiBoldItalic',
  Thin = 'Inter-Thin-BETA',
  ThinItalic = 'Inter-ThinItalic-BETA',
}

export const typography = {
  displayLarge: {
    fontFamily: CCFontFamilies.Bold,
    fontSize: 40,
    lineHeight: 48,
    color: colors.textColorDark,
  } as TextStyle,

  displayMedium: {
    fontFamily: CCFontFamilies.Bold,
    fontSize: 32,
    lineHeight: 40,
    color: colors.textColorDark,
  } as TextStyle,

  h1: {
    fontFamily: CCFontFamilies.Bold,
    fontSize: 28,
    lineHeight: 36,
    color: colors.textColorDark,
  } as TextStyle,

  h2: {
    fontFamily: CCFontFamilies.SemiBold,
    fontSize: 24,
    lineHeight: 32,
    color: colors.textColorDark,
  } as TextStyle,

  h3: {
    fontFamily: CCFontFamilies.SemiBold,
    fontSize: 20,
    lineHeight: 28,
    color: colors.textColorDark,
  } as TextStyle,

  title: {
    fontFamily: CCFontFamilies.SemiBold,
    fontSize: 18,
    lineHeight: 26,
    color: colors.textColorDark,
  } as TextStyle,

  bodyLarge: {
    fontFamily: CCFontFamilies.Regular,
    fontSize: 16,
    lineHeight: 24,
    color: colors.textColorDark,
  } as TextStyle,

  body: {
    fontFamily: CCFontFamilies.Regular,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textColorDark,
  } as TextStyle,

  bodySmall: {
    fontFamily: CCFontFamilies.Regular,
    fontSize: 12,
    lineHeight: 18,
    color: colors.textColorDark,
  } as TextStyle,

  labelLarge: {
    fontFamily: CCFontFamilies.Medium,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textColorDark,
  } as TextStyle,

  label: {
    fontFamily: CCFontFamilies.Medium,
    fontSize: 12,
    lineHeight: 16,
    color: colors.textColorDark,
  } as TextStyle,

  caption: {
    fontFamily: CCFontFamilies.Regular,
    fontSize: 11,
    lineHeight: 16,
    color: colors.textColorDark,
  } as TextStyle,

  tiny: {
    fontFamily: CCFontFamilies.Regular,
    fontSize: 10,
    lineHeight: 14,
    color: colors.textColorDark,
  } as TextStyle,
} as const;
