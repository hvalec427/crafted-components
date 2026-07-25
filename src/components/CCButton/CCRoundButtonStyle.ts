import { StyleSheet } from 'react-native';

import type { ColorSchema } from '../../tokens/colorSchema';

export const RoundButtonSizes = StyleSheet.create({
  small:  { height: 32, width: 32 },
  medium: { height: 40, width: 40 },
  large:  { height: 56, width: 56 },
});

export const makeRoundButtonStyle = (theme: ColorSchema): Record<string, object> => {
  const colors = theme.roundButton;
  return {
    primaryWrapper:         { backgroundColor: colors.primaryBg,            borderColor: colors.primaryBorder,              borderWidth: 1 },
    primaryWrapperDisabled: { backgroundColor: colors.primaryDisabledBg,    borderColor: colors.primaryDisabledBorder,      borderWidth: 1 },
    primaryTint:            { tintColor: colors.primaryIcon },

    primaryLightWrapper:         { backgroundColor: colors.primaryLightBg,   borderColor: colors.primaryLightBorder,  borderWidth: 1 },
    primaryLightWrapperDisabled: { backgroundColor: colors.primaryLightBg,   borderColor: colors.primaryLightBorder,  borderWidth: 1 },
    primaryLightTint:            { tintColor: colors.primaryLightIcon },

    primaryOutlinedWrapper:         { backgroundColor: colors.primaryOutlinedBg,  borderColor: colors.primaryOutlinedBorder,         borderWidth: 1 },
    primaryOutlinedWrapperDisabled: { backgroundColor: colors.primaryOutlinedBg,  borderColor: colors.primaryOutlinedDisabledBorder, borderWidth: 1 },
    primaryOutlinedTint:            { tintColor: colors.primaryOutlinedIcon },

    errorOutlinedWrapper:         { backgroundColor: colors.errorOutlinedBg,       borderColor: colors.errorOutlinedBorder, borderWidth: 1 },
    errorOutlinedWrapperDisabled: { backgroundColor: colors.errorOutlinedDisabledBg, borderColor: colors.errorOutlinedBorder, borderWidth: 1 },
    errorOutlinedTint:            { tintColor: colors.errorOutlinedIcon },

    outlinedDarkWrapper:         { backgroundColor: colors.outlinedDarkBg,        borderColor: colors.outlinedDarkBorder,         borderWidth: 1 },
    outlinedDarkWrapperDisabled: { backgroundColor: colors.outlinedDarkDisabledBg, borderColor: colors.outlinedDarkDisabledBorder, borderWidth: 1 },
    outlinedDarkTint:            { tintColor: colors.outlinedDarkIcon },
  };
};
