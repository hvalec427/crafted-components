import { StyleSheet } from 'react-native';

import type { ColorSchema } from '../../tokens/colorSchema';

export const RoundButtonSizes = StyleSheet.create({
  small:  { height: 32, width: 32 },
  medium: { height: 40, width: 40 },
  large:  { height: 56, width: 56 },
});

export const makeRoundButtonStyle = (schema: ColorSchema): Record<string, object> => {
  const b = schema.roundButton;
  return {
    primaryWrapper:         { backgroundColor: b.primaryBg,            borderColor: b.primaryBorder,              borderWidth: 1 },
    primaryWrapperDisabled: { backgroundColor: b.primaryDisabledBg,    borderColor: b.primaryDisabledBorder,      borderWidth: 1 },
    primaryTint:            { tintColor: b.primaryIcon },

    primaryLightWrapper:         { backgroundColor: b.primaryLightBg,   borderColor: b.primaryLightBorder,  borderWidth: 1 },
    primaryLightWrapperDisabled: { backgroundColor: b.primaryLightBg,   borderColor: b.primaryLightBorder,  borderWidth: 1 },
    primaryLightTint:            { tintColor: b.primaryLightIcon },

    primaryOutlinedWrapper:         { backgroundColor: b.primaryOutlinedBg,  borderColor: b.primaryOutlinedBorder,         borderWidth: 1 },
    primaryOutlinedWrapperDisabled: { backgroundColor: b.primaryOutlinedBg,  borderColor: b.primaryOutlinedDisabledBorder, borderWidth: 1 },
    primaryOutlinedTint:            { tintColor: b.primaryOutlinedIcon },

    errorOutlinedWrapper:         { backgroundColor: b.errorOutlinedBg,       borderColor: b.errorOutlinedBorder, borderWidth: 1 },
    errorOutlinedWrapperDisabled: { backgroundColor: b.errorOutlinedDisabledBg, borderColor: b.errorOutlinedBorder, borderWidth: 1 },
    errorOutlinedTint:            { tintColor: b.errorOutlinedIcon },

    outlinedDarkWrapper:         { backgroundColor: b.outlinedDarkBg,        borderColor: b.outlinedDarkBorder,         borderWidth: 1 },
    outlinedDarkWrapperDisabled: { backgroundColor: b.outlinedDarkDisabledBg, borderColor: b.outlinedDarkDisabledBorder, borderWidth: 1 },
    outlinedDarkTint:            { tintColor: b.outlinedDarkIcon },
  };
};
