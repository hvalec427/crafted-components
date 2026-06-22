import { StyleSheet } from 'react-native';

import colors from '../../tokens/colors.json';

export const CCMainButtonConstants: {
  [key in string]: {
    height: number;
    paddingHorizontal: number;
  };
} = {
  small: {
    height: 30,
    paddingHorizontal: 12,
  },
  medium: {
    height: 48,
    paddingHorizontal: 12,
  },
  large: {
    height: 54,
    paddingHorizontal: 16,
  },
};

export const CCMainButtonColorsConstants: {
  [key in string]: {
    mainTextColor: keyof typeof colors;
    pressedTextColor: keyof typeof colors;
    disabledTextColor: keyof typeof colors;
  };
} = {
  primary: {
    mainTextColor: 'textColorLight',
    pressedTextColor: 'textColorLight',
    disabledTextColor: 'textColorLight',
  },

  primaryLight: {
    mainTextColor: 'primaryBluePressed',
    pressedTextColor: 'primaryBluePressed',
    disabledTextColor: 'textColorLight',
  },

  fail: {
    mainTextColor: 'textColorLight',
    pressedTextColor: 'textColorLight',
    disabledTextColor: 'textColorLight',
  },

  success: {
    mainTextColor: 'textColorLight',
    pressedTextColor: 'textColorLight',
    disabledTextColor: 'mediumGray',
  },

  outline: {
    mainTextColor: 'primaryBlue',
    pressedTextColor: 'primaryBluePressed',
    disabledTextColor: 'lightGray',
  },

  outlineDark: {
    mainTextColor: 'darkGray',
    pressedTextColor: 'black',
    disabledTextColor: 'lightGray',
  },

  outlineError: {
    mainTextColor: 'error',
    pressedTextColor: 'errorDark',
    disabledTextColor: 'primaryPinkLight',
  },

  white: {
    mainTextColor: 'textColorDark',
    pressedTextColor: 'textColorDark',
    disabledTextColor: 'textColorDark',
  },
};

export const CCMainButtonStyle = StyleSheet.create({
  primaryWrapper: {
    backgroundColor: colors.primaryBlue,
    borderColor: colors.primaryBlue,
    borderWidth: 1,
  },
  primaryPressedWrapper: {
    backgroundColor: colors.primaryBluePressed,
    borderColor: colors.primaryBluePressed,
  },
  primaryDisabledWrapper: {
    backgroundColor: colors.primaryBlueLight,
    borderColor: colors.primaryBlueLight,
  },
  primaryWrapperProgress: {
    backgroundColor: colors.primaryBluePressed,
  },
  primaryText: {
    color: colors[CCMainButtonColorsConstants.primary.mainTextColor],
  },
  primaryPressedText: {
    color: colors[CCMainButtonColorsConstants.primary.pressedTextColor],
  },
  primaryDisabledText: {
    color: colors[CCMainButtonColorsConstants.primary.disabledTextColor],
  },

  primaryLightWrapper: {
    backgroundColor: colors.primaryBlueVeryLight,
    borderColor: colors.primaryBlueVeryLight,
    borderWidth: 1,
  },
  primaryLightPressedWrapper: {
    backgroundColor: colors.primaryLightPressed,
    borderColor: colors.primaryLightPressed,
  },
  primaryLightDisabledWrapper: {
    backgroundColor: colors.lightGray,
    borderColor: colors.lightGray,
  },
  primaryLightWrapperProgress: {
    backgroundColor: colors.primaryLightPressed,
  },
  primaryLightText: {
    color: colors[CCMainButtonColorsConstants.primaryLight.mainTextColor],
  },
  primaryLightPressedText: {
    color: colors[CCMainButtonColorsConstants.primaryLight.pressedTextColor],
  },
  primaryLightDisabledText: {
    color: colors[CCMainButtonColorsConstants.primaryLight.disabledTextColor],
  },

  failWrapper: {
    backgroundColor: colors.error,
    borderColor: colors.error,
    borderWidth: 1,
  },
  failPressedWrapper: {
    backgroundColor: colors.errorDark,
    borderColor: colors.errorDark,
  },
  failDisabledWrapper: {
    backgroundColor: colors.primaryPinkLight,
    borderColor: colors.primaryPinkLight,
  },
  failWrapperProgress: {
    backgroundColor: colors.errorDark,
  },
  failText: {
    color: colors[CCMainButtonColorsConstants.fail.mainTextColor],
  },
  failPressedText: {
    color: colors[CCMainButtonColorsConstants.fail.pressedTextColor],
  },
  failDisabledText: {
    color: colors[CCMainButtonColorsConstants.fail.disabledTextColor],
  },

  successWrapper: {
    backgroundColor: colors.success,
    borderColor: colors.success,
    borderWidth: 1,
  },
  successPressedWrapper: {
    backgroundColor: colors.successDark,
    borderColor: colors.successDark,
  },
  successDisabledWrapper: {
    backgroundColor: colors.successVeryLight,
    borderColor: colors.successVeryLight,
  },
  successWrapperProgress: {
    backgroundColor: colors.successDark,
  },
  successText: {
    color: colors[CCMainButtonColorsConstants.success.mainTextColor],
  },
  successPressedText: {
    color: colors[CCMainButtonColorsConstants.success.pressedTextColor],
  },
  successDisabledText: {
    color: colors[CCMainButtonColorsConstants.success.disabledTextColor],
  },

  outlineWrapper: {
    backgroundColor: colors.transparent,
    borderColor: colors.primaryBlue,
    borderWidth: 1,
  },
  outlinePressedWrapper: {
    backgroundColor: colors.transparent,
    borderColor: colors.primaryBluePressed,
  },
  outlineDisabledWrapper: {
    backgroundColor: colors.transparent,
    borderColor: colors.lightGray,
  },
  outlineWrapperProgress: {
    backgroundColor: colors.lightBlue,
  },
  outlineText: {
    color: colors[CCMainButtonColorsConstants.outline.mainTextColor],
  },
  outlinePressedText: {
    color: colors[CCMainButtonColorsConstants.outline.pressedTextColor],
  },
  outlineDisabledText: {
    color: colors[CCMainButtonColorsConstants.outline.disabledTextColor],
  },

  outlineDarkWrapper: {
    backgroundColor: colors.transparent,
    borderColor: colors.darkGray,
    borderWidth: 1,
  },
  outlineDarkPressedWrapper: {
    backgroundColor: colors.transparent,
    borderColor: colors.black,
  },
  outlineDarkDisabledWrapper: {
    backgroundColor: colors.transparent,
    borderColor: colors.lightGray,
  },
  outlineDarkWrapperProgress: {
    backgroundColor: colors.backgroundGray,
  },
  outlineDarkText: {
    color: colors[CCMainButtonColorsConstants.outlineDark.mainTextColor],
  },
  outlineDarkPressedText: {
    color: colors[CCMainButtonColorsConstants.outlineDark.pressedTextColor],
  },
  outlineDarkDisabledText: {
    color: colors[CCMainButtonColorsConstants.outlineDark.disabledTextColor],
  },

  outlineErrorWrapper: {
    backgroundColor: colors.transparent,
    borderColor: colors.error,
    borderWidth: 1,
  },
  outlineErrorPressedWrapper: {
    backgroundColor: colors.transparent,
    borderColor: colors.errorDark,
  },
  outlineErrorDisabledWrapper: {
    backgroundColor: colors.transparent,
    borderColor: colors.primaryPinkLight,
  },
  outlineErrorWrapperProgress: {
    backgroundColor: colors.primaryPinkLight,
  },
  outlineErrorText: {
    color: colors[CCMainButtonColorsConstants.outlineError.mainTextColor],
  },
  outlineErrorPressedText: {
    color: colors[CCMainButtonColorsConstants.outlineError.pressedTextColor],
  },
  outlineErrorDisabledText: {
    color: colors[CCMainButtonColorsConstants.outlineError.disabledTextColor],
  },

  whiteWrapper: {
    backgroundColor: colors.white,
    borderColor: colors.white,
    borderWidth: 1,
  },
  whitePressedWrapper: {
    backgroundColor: colors.border,
    borderColor: colors.border,
  },
  whiteDisabledWrapper: {
    backgroundColor: colors.border,
    borderColor: colors.border,
  },
  whiteWrapperProgress: {
    backgroundColor: colors.border,
  },
  whiteText: {
    color: colors[CCMainButtonColorsConstants.white.mainTextColor],
  },
  whitePressedText: {
    color: colors[CCMainButtonColorsConstants.white.pressedTextColor],
  },
  whiteDisabledText: {
    color: colors[CCMainButtonColorsConstants.white.disabledTextColor],
  },
});
