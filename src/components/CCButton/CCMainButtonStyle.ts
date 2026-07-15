import type { ColorSchema } from '../../tokens/colorSchema';

export const CCMainButtonConstants: {
  [key in string]: { height: number; paddingHorizontal: number };
} = {
  small:  { height: 30, paddingHorizontal: 12 },
  medium: { height: 48, paddingHorizontal: 12 },
  large:  { height: 54, paddingHorizontal: 16 },
};

export const makeMainButtonColors = (schema: ColorSchema) => {
  const b = schema.button;
  return {
    primary: {
      mainTextColor:     b.primaryText,
      pressedTextColor:  b.primaryText,
      disabledTextColor: b.primaryTextDisabled,
    },
    primaryLight: {
      mainTextColor:     b.primaryLightText,
      pressedTextColor:  b.primaryLightText,
      disabledTextColor: b.primaryLightTextDisabled,
    },
    fail: {
      mainTextColor:     b.failText,
      pressedTextColor:  b.failText,
      disabledTextColor: b.failText,
    },
    success: {
      mainTextColor:     b.successText,
      pressedTextColor:  b.successText,
      disabledTextColor: b.successTextDisabled,
    },
    outline: {
      mainTextColor:     b.outlineText,
      pressedTextColor:  b.outlinePressedText,
      disabledTextColor: b.outlineTextDisabled,
    },
    outlineDark: {
      mainTextColor:     b.outlineDarkText,
      pressedTextColor:  b.outlineDarkPressedText,
      disabledTextColor: b.outlineDarkTextDisabled,
    },
    outlineError: {
      mainTextColor:     b.outlineErrorText,
      pressedTextColor:  b.outlineErrorPressedText,
      disabledTextColor: b.outlineErrorTextDisabled,
    },
    white: {
      mainTextColor:     b.whiteText,
      pressedTextColor:  b.whiteText,
      disabledTextColor: b.whiteText,
    },
  };
};

export const makeMainButtonStyle = (schema: ColorSchema): Record<string, object> => {
  const b = schema.button;
  return {
    primaryWrapper:         { backgroundColor: b.primaryBg,             borderColor: b.primaryBorder,             borderWidth: 1 },
    primaryPressedWrapper:  { backgroundColor: b.primaryPressedBg,      borderColor: b.primaryPressedBg },
    primaryDisabledWrapper: { backgroundColor: b.primaryDisabledBg,     borderColor: b.primaryDisabledBg },
    primaryWrapperProgress: { backgroundColor: b.primaryPressedBg },
    primaryText:            { color: b.primaryText },
    primaryPressedText:     { color: b.primaryText },
    primaryDisabledText:    { color: b.primaryTextDisabled },

    primaryLightWrapper:         { backgroundColor: b.primaryLightBg,            borderColor: b.primaryLightBorder,            borderWidth: 1 },
    primaryLightPressedWrapper:  { backgroundColor: b.primaryLightPressedBg,     borderColor: b.primaryLightPressedBorder },
    primaryLightDisabledWrapper: { backgroundColor: b.primaryLightDisabledBg,    borderColor: b.primaryLightDisabledBg },
    primaryLightWrapperProgress: { backgroundColor: b.primaryLightPressedBg },
    primaryLightText:            { color: b.primaryLightText },
    primaryLightPressedText:     { color: b.primaryLightText },
    primaryLightDisabledText:    { color: b.primaryLightTextDisabled },

    failWrapper:         { backgroundColor: b.failBg,          borderColor: b.failBorder,        borderWidth: 1 },
    failPressedWrapper:  { backgroundColor: b.failPressedBg,   borderColor: b.failPressedBg },
    failDisabledWrapper: { backgroundColor: b.failDisabledBg,  borderColor: b.failDisabledBg },
    failWrapperProgress: { backgroundColor: b.failPressedBg },
    failText:            { color: b.failText },
    failPressedText:     { color: b.failText },
    failDisabledText:    { color: b.failText },

    successWrapper:         { backgroundColor: b.successBg,          borderColor: b.successBorder,       borderWidth: 1 },
    successPressedWrapper:  { backgroundColor: b.successPressedBg,   borderColor: b.successPressedBg },
    successDisabledWrapper: { backgroundColor: b.successDisabledBg,  borderColor: b.successDisabledBg },
    successWrapperProgress: { backgroundColor: b.successPressedBg },
    successText:            { color: b.successText },
    successPressedText:     { color: b.successText },
    successDisabledText:    { color: b.successTextDisabled },

    outlineWrapper:         { backgroundColor: b.outlineBg,        borderColor: b.outlineBorder,           borderWidth: 1 },
    outlinePressedWrapper:  { backgroundColor: b.outlinePressedBg, borderColor: b.outlinePressedBorder },
    outlineDisabledWrapper: { backgroundColor: b.outlineBg,        borderColor: b.outlineDisabledBorder },
    outlineWrapperProgress: { backgroundColor: b.outlineProgressBg },
    outlineText:            { color: b.outlineText },
    outlinePressedText:     { color: b.outlinePressedText },
    outlineDisabledText:    { color: b.outlineTextDisabled },

    outlineDarkWrapper:         { backgroundColor: b.outlineDarkBg, borderColor: b.outlineDarkBorder,          borderWidth: 1 },
    outlineDarkPressedWrapper:  { backgroundColor: b.outlineDarkBg, borderColor: b.outlineDarkPressedBorder },
    outlineDarkDisabledWrapper: { backgroundColor: b.outlineDarkBg, borderColor: b.outlineDarkDisabledBorder },
    outlineDarkWrapperProgress: { backgroundColor: b.outlineDarkProgressBg },
    outlineDarkText:            { color: b.outlineDarkText },
    outlineDarkPressedText:     { color: b.outlineDarkPressedText },
    outlineDarkDisabledText:    { color: b.outlineDarkTextDisabled },

    outlineErrorWrapper:         { backgroundColor: b.outlineErrorBg, borderColor: b.outlineErrorBorder,          borderWidth: 1 },
    outlineErrorPressedWrapper:  { backgroundColor: b.outlineErrorBg, borderColor: b.outlineErrorPressedBorder },
    outlineErrorDisabledWrapper: { backgroundColor: b.outlineErrorBg, borderColor: b.outlineErrorDisabledBorder },
    outlineErrorWrapperProgress: { backgroundColor: b.outlineErrorProgressBg },
    outlineErrorText:            { color: b.outlineErrorText },
    outlineErrorPressedText:     { color: b.outlineErrorPressedText },
    outlineErrorDisabledText:    { color: b.outlineErrorTextDisabled },

    whiteWrapper:         { backgroundColor: b.whiteBg,         borderColor: b.whiteBorder,        borderWidth: 1 },
    whitePressedWrapper:  { backgroundColor: b.whitePressedBg,  borderColor: b.whitePressedBorder },
    whiteDisabledWrapper: { backgroundColor: b.whiteDisabledBg, borderColor: b.whiteDisabledBg },
    whiteWrapperProgress: { backgroundColor: b.whitePressedBg },
    whiteText:            { color: b.whiteText },
    whitePressedText:     { color: b.whiteText },
    whiteDisabledText:    { color: b.whiteText },
  };
};
