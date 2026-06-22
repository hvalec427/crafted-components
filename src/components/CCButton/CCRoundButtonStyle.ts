import { StyleSheet } from 'react-native';

import colors from '../../tokens/colors.json';

export const RoundButtonSizes = StyleSheet.create({
  small: {
    height: 32,
    width: 32,
  },
  medium: {
    height: 40,
    width: 40,
  },
  large: {
    height: 56,
    width: 56,
  },
});

export const RoundButtonStyle = StyleSheet.create({
  primaryWrapper: {
    backgroundColor: colors.primaryBlue,
    borderColor: colors.primaryBlue,
    borderWidth: 1,
  },
  primaryWrapperDisabled: {
    backgroundColor: colors.primaryBlueLight,
    borderColor: colors.primaryBlueLight,
    borderWidth: 1,
  },
  primaryTint: {
    tintColor: colors.textColorLight,
  },

  primaryLightWrapper: {
    backgroundColor: colors.primaryBlueLight,
    borderColor: colors.primaryBlueLight,
    borderWidth: 1,
  },
  primaryLightWrapperDisabled: {
    backgroundColor: colors.primaryBlueLight,
    borderColor: colors.primaryBlueLight,
    borderWidth: 1,
  },
  primaryLightTint: {
    tintColor: colors.primaryBlue,
  },

  primaryOutlinedWrapper: {
    backgroundColor: colors.white,
    borderColor: colors.primaryBlue,
    borderWidth: 1,
  },
  primaryOutlinedWrapperDisabled: {
    backgroundColor: colors.white,
    borderColor: colors.primaryBlueLight,
    borderWidth: 1,
  },
  primaryOutlinedTint: {
    tintColor: colors.primaryBlue,
  },

  errorOutlinedWrapper: {
    backgroundColor: colors.white,
    borderColor: colors.error,
    borderWidth: 1,
  },
  errorOutlinedWrapperDisabled: {
    backgroundColor: colors.lightGray,
    borderColor: colors.error,
    borderWidth: 1,
  },
  errorOutlinedTint: {
    tintColor: colors.error,
  },

  outlinedDarkWrapper: {
    backgroundColor: colors.white,
    borderColor: colors.darkGray,
    borderWidth: 1,
  },
  outlinedDarkWrapperDisabled: {
    backgroundColor: colors.lightGray,
    borderColor: colors.lightGray,
    borderWidth: 1,
  },
  outlinedDarkTint: {
    tintColor: colors.darkGray,
  },
});
