import type { ColorSchema } from '../../tokens/colorSchema';

export const CCMainButtonConstants: {
  [key in string]: { height: number; paddingHorizontal: number; borderRadius: number };
} = {
  medium: { height: 48, paddingHorizontal: 12, borderRadius: 5 },
  large:  { height: 54, paddingHorizontal: 16, borderRadius: 5 },
};

/**
 * Offset "pressed-3D" shadow for the primary button (rest depth → depth on
 * press). Zero by default so consumers who don't opt in via
 * `initCraftedComponents({ components: { CCMainButton: { shadow } } })` see
 * no layout/visual change.
 */
export const CCMainButtonShadowConstants: { restDepth: number; pressedDepth: number } = {
  restDepth: 0,
  pressedDepth: 0,
};

export const makeMainButtonColors = (theme: ColorSchema) => {
  const colors = theme.button;
  return {
    primary: {
      mainTextColor:     colors.primaryText,
      pressedTextColor:  colors.primaryText,
      disabledTextColor: colors.primaryTextDisabled,
    },
    primaryLight: {
      mainTextColor:     colors.primaryLightText,
      pressedTextColor:  colors.primaryLightText,
      disabledTextColor: colors.primaryLightTextDisabled,
    },
    fail: {
      mainTextColor:     colors.failText,
      pressedTextColor:  colors.failText,
      disabledTextColor: colors.failText,
    },
    success: {
      mainTextColor:     colors.successText,
      pressedTextColor:  colors.successText,
      disabledTextColor: colors.successTextDisabled,
    },
    outline: {
      mainTextColor:     colors.outlineText,
      pressedTextColor:  colors.outlinePressedText,
      disabledTextColor: colors.outlineTextDisabled,
    },
    outlineDark: {
      mainTextColor:     colors.outlineDarkText,
      pressedTextColor:  colors.outlineDarkPressedText,
      disabledTextColor: colors.outlineDarkTextDisabled,
    },
    outlineError: {
      mainTextColor:     colors.outlineErrorText,
      pressedTextColor:  colors.outlineErrorPressedText,
      disabledTextColor: colors.outlineErrorTextDisabled,
    },
    white: {
      mainTextColor:     colors.whiteText,
      pressedTextColor:  colors.whiteText,
      disabledTextColor: colors.whiteText,
    },
    secondary: {
      mainTextColor:     colors.secondaryText,
      pressedTextColor:  colors.secondaryText,
      disabledTextColor: colors.secondaryTextDisabled,
    },
  };
};

export const makeMainButtonStyle = (theme: ColorSchema): Record<string, object> => {
  const colors = theme.button;
  return {
    primaryWrapper:         { backgroundColor: colors.primaryBg,             borderColor: colors.primaryBorder,             borderWidth: 1 },
    primaryPressedWrapper:  { backgroundColor: colors.primaryLight,         borderColor: colors.primaryLight },
    primaryDisabledWrapper: { backgroundColor: colors.primaryDisabledBg,     borderColor: colors.primaryDisabledBg },
    primaryWrapperProgress: { backgroundColor: colors.primaryPressedBg },
    primaryText:            { color: colors.primaryText },
    primaryPressedText:     { color: colors.primaryText },
    primaryDisabledText:    { color: colors.primaryTextDisabled },

    primaryLightWrapper:         { backgroundColor: colors.primaryLightBg,            borderColor: colors.primaryLightBorder,            borderWidth: 1 },
    primaryLightPressedWrapper:  { backgroundColor: colors.primaryLightPressedBg,     borderColor: colors.primaryLightPressedBorder },
    primaryLightDisabledWrapper: { backgroundColor: colors.primaryLightDisabledBg,    borderColor: colors.primaryLightDisabledBg },
    primaryLightWrapperProgress: { backgroundColor: colors.primaryLightPressedBg },
    primaryLightText:            { color: colors.primaryLightText },
    primaryLightPressedText:     { color: colors.primaryLightText },
    primaryLightDisabledText:    { color: colors.primaryLightTextDisabled },

    failWrapper:         { backgroundColor: colors.failBg,          borderColor: colors.failBorder,        borderWidth: 1 },
    failPressedWrapper:  { backgroundColor: colors.failPressedBg,   borderColor: colors.failPressedBg },
    failDisabledWrapper: { backgroundColor: colors.failDisabledBg,  borderColor: colors.failDisabledBg },
    failWrapperProgress: { backgroundColor: colors.failPressedBg },
    failText:            { color: colors.failText },
    failPressedText:     { color: colors.failText },
    failDisabledText:    { color: colors.failText },

    successWrapper:         { backgroundColor: colors.successBg,          borderColor: colors.successBorder,       borderWidth: 1 },
    successPressedWrapper:  { backgroundColor: colors.successPressedBg,   borderColor: colors.successPressedBg },
    successDisabledWrapper: { backgroundColor: colors.successDisabledBg,  borderColor: colors.successDisabledBg },
    successWrapperProgress: { backgroundColor: colors.successPressedBg },
    successText:            { color: colors.successText },
    successPressedText:     { color: colors.successText },
    successDisabledText:    { color: colors.successTextDisabled },

    outlineWrapper:         { backgroundColor: colors.outlineBg,        borderColor: colors.outlineBorder,           borderWidth: 1 },
    outlinePressedWrapper:  { backgroundColor: colors.outlinePressedBg, borderColor: colors.outlinePressedBorder },
    outlineDisabledWrapper: { backgroundColor: colors.outlineBg,        borderColor: colors.outlineDisabledBorder },
    outlineWrapperProgress: { backgroundColor: colors.outlineProgressBg },
    outlineText:            { color: colors.outlineText },
    outlinePressedText:     { color: colors.outlinePressedText },
    outlineDisabledText:    { color: colors.outlineTextDisabled },

    outlineDarkWrapper:         { backgroundColor: colors.outlineDarkBg, borderColor: colors.outlineDarkBorder,          borderWidth: 1 },
    outlineDarkPressedWrapper:  { backgroundColor: colors.outlineDarkBg, borderColor: colors.outlineDarkPressedBorder },
    outlineDarkDisabledWrapper: { backgroundColor: colors.outlineDarkBg, borderColor: colors.outlineDarkDisabledBorder },
    outlineDarkWrapperProgress: { backgroundColor: colors.outlineDarkProgressBg },
    outlineDarkText:            { color: colors.outlineDarkText },
    outlineDarkPressedText:     { color: colors.outlineDarkPressedText },
    outlineDarkDisabledText:    { color: colors.outlineDarkTextDisabled },

    outlineErrorWrapper:         { backgroundColor: colors.outlineErrorBg, borderColor: colors.outlineErrorBorder,          borderWidth: 1 },
    outlineErrorPressedWrapper:  { backgroundColor: colors.outlineErrorBg, borderColor: colors.outlineErrorPressedBorder },
    outlineErrorDisabledWrapper: { backgroundColor: colors.outlineErrorBg, borderColor: colors.outlineErrorDisabledBorder },
    outlineErrorWrapperProgress: { backgroundColor: colors.outlineErrorProgressBg },
    outlineErrorText:            { color: colors.outlineErrorText },
    outlineErrorPressedText:     { color: colors.outlineErrorPressedText },
    outlineErrorDisabledText:    { color: colors.outlineErrorTextDisabled },

    whiteWrapper:         { backgroundColor: colors.whiteBg,         borderColor: colors.whiteBorder,        borderWidth: 1 },
    whitePressedWrapper:  { backgroundColor: colors.whitePressedBg,  borderColor: colors.whitePressedBorder },
    whiteDisabledWrapper: { backgroundColor: colors.whiteDisabledBg, borderColor: colors.whiteDisabledBg },
    whiteWrapperProgress: { backgroundColor: colors.whitePressedBg },
    whiteText:            { color: colors.whiteText },
    whitePressedText:     { color: colors.whiteText },
    whiteDisabledText:    { color: colors.whiteText },

    secondaryWrapper:         { backgroundColor: colors.secondaryBg,         borderColor: colors.secondaryBorder,         borderWidth: 1 },
    secondaryPressedWrapper:  { backgroundColor: colors.secondaryPressedBg,  borderColor: colors.secondaryPressedBorder },
    secondaryDisabledWrapper: { backgroundColor: colors.secondaryDisabledBg, borderColor: colors.secondaryDisabledBg },
    secondaryWrapperProgress: { backgroundColor: colors.secondaryPressedBg },
    secondaryText:            { color: colors.secondaryText },
    secondaryPressedText:     { color: colors.secondaryText },
    secondaryDisabledText:    { color: colors.secondaryTextDisabled },
  };
};
