export type DeepPartial<T> = { [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K] };

declare const __themeColor__: unique symbol;
/** A color value that originates from the active theme schema. Prevents arbitrary hex strings in component color props. */
export type ThemeColor = string & { readonly [__themeColor__]: true };

type Stringify<T> = T extends ThemeColor
  ? string
  : T extends object
  ? { [K in keyof T]: Stringify<T[K]> }
  : T;
/** ColorSchema with all ThemeColor leaves replaced by plain string — used for the colors input in initCraftedComponents. */
export type RawColorSchema = Stringify<ColorSchema>;

export interface BaseColors {
  primary:    ThemeColor;
  secondary:  ThemeColor;
  success:    ThemeColor;
  error:      ThemeColor;
  warning:    ThemeColor;
  info:       ThemeColor;
  background: ThemeColor;
  surface:    ThemeColor;
  text:       ThemeColor;
  border:     ThemeColor;
}

export interface ColorSchema extends BaseColors {
  button: {
    primaryBg:                    ThemeColor;
    primaryPressedBg:             ThemeColor;
    primaryDisabledBg:            ThemeColor;
    primaryBorder:                ThemeColor;
    primaryText:                  ThemeColor;
    primaryTextDisabled:          ThemeColor;
    primaryLightBg:               ThemeColor;
    primaryLightPressedBg:        ThemeColor;
    primaryLightDisabledBg:       ThemeColor;
    primaryLightBorder:           ThemeColor;
    primaryLightPressedBorder:    ThemeColor;
    primaryLightText:             ThemeColor;
    primaryLightTextDisabled:     ThemeColor;
    failBg:                       ThemeColor;
    failPressedBg:                ThemeColor;
    failDisabledBg:               ThemeColor;
    failBorder:                   ThemeColor;
    failText:                     ThemeColor;
    successBg:                    ThemeColor;
    successPressedBg:             ThemeColor;
    successDisabledBg:            ThemeColor;
    successBorder:                ThemeColor;
    successText:                  ThemeColor;
    successTextDisabled:          ThemeColor;
    outlineBg:                    ThemeColor;
    outlinePressedBg:             ThemeColor;
    outlineBorder:                ThemeColor;
    outlinePressedBorder:         ThemeColor;
    outlineDisabledBorder:        ThemeColor;
    outlineProgressBg:            ThemeColor;
    outlineText:                  ThemeColor;
    outlinePressedText:           ThemeColor;
    outlineTextDisabled:          ThemeColor;
    outlineDarkBg:                ThemeColor;
    outlineDarkBorder:            ThemeColor;
    outlineDarkPressedBorder:     ThemeColor;
    outlineDarkDisabledBorder:    ThemeColor;
    outlineDarkProgressBg:        ThemeColor;
    outlineDarkText:              ThemeColor;
    outlineDarkPressedText:       ThemeColor;
    outlineDarkTextDisabled:      ThemeColor;
    outlineErrorBg:               ThemeColor;
    outlineErrorBorder:           ThemeColor;
    outlineErrorPressedBorder:    ThemeColor;
    outlineErrorDisabledBorder:   string;
    outlineErrorProgressBg:       ThemeColor;
    outlineErrorText:             ThemeColor;
    outlineErrorPressedText:      ThemeColor;
    outlineErrorTextDisabled:     ThemeColor;
    whiteBg:                      ThemeColor;
    whitePressedBg:               ThemeColor;
    whiteDisabledBg:              ThemeColor;
    whiteBorder:                  ThemeColor;
    whitePressedBorder:           ThemeColor;
    whiteText:                    ThemeColor;
    secondaryBg:                  ThemeColor;
    secondaryPressedBg:           ThemeColor;
    secondaryDisabledBg:          ThemeColor;
    secondaryBorder:              ThemeColor;
    secondaryPressedBorder:       ThemeColor;
    secondaryText:                ThemeColor;
    secondaryTextDisabled:        ThemeColor;
    loadingIndicator:             ThemeColor;
  };
  roundButton: {
    primaryBg:                    ThemeColor;
    primaryBorder:                ThemeColor;
    primaryDisabledBg:            ThemeColor;
    primaryDisabledBorder:        ThemeColor;
    primaryIcon:                  ThemeColor;
    primaryLightBg:               ThemeColor;
    primaryLightBorder:           ThemeColor;
    primaryLightIcon:             ThemeColor;
    primaryOutlinedBg:            ThemeColor;
    primaryOutlinedBorder:        ThemeColor;
    primaryOutlinedDisabledBorder: ThemeColor;
    primaryOutlinedIcon:          ThemeColor;
    errorOutlinedBg:              ThemeColor;
    errorOutlinedBorder:          ThemeColor;
    errorOutlinedDisabledBg:      ThemeColor;
    errorOutlinedIcon:            ThemeColor;
    outlinedDarkBg:               ThemeColor;
    outlinedDarkBorder:           ThemeColor;
    outlinedDarkDisabledBg:       ThemeColor;
    outlinedDarkDisabledBorder:   string;
    outlinedDarkIcon:             ThemeColor;
    neutralBg:                    ThemeColor;
    neutralBorder:                ThemeColor;
    neutralDisabledBg:            ThemeColor;
    neutralDisabledBorder:        ThemeColor;
    neutralIcon:                  ThemeColor;
  };
  input: {
    background:     ThemeColor;
    border:         ThemeColor;
    borderFocused:  string;
    borderError:    ThemeColor;
    borderWarning:  string;
    text:           ThemeColor;
    textDisabled:   string;
    placeholder:    ThemeColor;
    label:          ThemeColor;
    labelSecondary: ThemeColor;
    errorText:      ThemeColor;
    warningText:    ThemeColor;
    cursorColor:    ThemeColor;
  };
  codeInput: {
    background:    ThemeColor;
    border:        ThemeColor;
    borderFocused: ThemeColor;
    borderSuccess: ThemeColor;
    borderError:   string;
    successText:   string;
    errorText:     ThemeColor;
    loadingText:   string;
  };
  textColor: {
    primary:     ThemeColor;
    secondary:   string;
    tertiary:    ThemeColor;
    disabled:    ThemeColor;
    link:        ThemeColor;
    linkPressed: ThemeColor;
    inverse:     ThemeColor;
    error:       ThemeColor;
    success:     ThemeColor;
    warning:     ThemeColor;
    info:        ThemeColor;
  };
  header: {
    background: ThemeColor;
    border:     ThemeColor;
    title:      ThemeColor;
    subtitle:   string;
    icon:       ThemeColor;
    iconActive: ThemeColor;
    backIcon:   string;
  };
  pressable: {
    overlay:       ThemeColor;
    overlayStrong: ThemeColor;
  };
  screenWrapper: {
    background: ThemeColor;
    safeArea:   string;
  };
  buttonGroup: {
    background: ThemeColor;
  };
  badge: {
    successText:       ThemeColor;
    successBackground: ThemeColor;
    errorText:         ThemeColor;
    errorBackground:   string;
    warningText:       ThemeColor;
    warningBackground: ThemeColor;
    infoText:          ThemeColor;
    infoBackground:    ThemeColor;
  };
  neutral: {
    lightGray:  string;
    mediumGray: ThemeColor;
    darkGray:   string;
  };
}

export type ColorSchemaName = 'default' | 'ocean' | 'sunset';

type BrandColors<T> = T extends string
  ? ThemeColor
  : T extends object
  ? { [K in keyof T]: BrandColors<T[K]> }
  : T;

export type ExtraColors<T> = BrandColors<{ [K in keyof T as K extends keyof ColorSchema ? never : K]: T[K] }>;
