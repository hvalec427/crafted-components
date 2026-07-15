export interface BaseColors {
  primary:    string;
  secondary:  string;
  success:    string;
  error:      string;
  warning:    string;
  info:       string;
  background: string;
  surface:    string;
  text:       string;
  border:     string;
}

export interface ColorSchema extends BaseColors {
  button: {
    primaryBg:                    string;
    primaryPressedBg:             string;
    primaryDisabledBg:            string;
    primaryBorder:                string;
    primaryText:                  string;
    primaryTextDisabled:          string;
    primaryLightBg:               string;
    primaryLightPressedBg:        string;
    primaryLightDisabledBg:       string;
    primaryLightBorder:           string;
    primaryLightPressedBorder:    string;
    primaryLightText:             string;
    primaryLightTextDisabled:     string;
    failBg:                       string;
    failPressedBg:                string;
    failDisabledBg:               string;
    failBorder:                   string;
    failText:                     string;
    successBg:                    string;
    successPressedBg:             string;
    successDisabledBg:            string;
    successBorder:                string;
    successText:                  string;
    successTextDisabled:          string;
    outlineBg:                    string;
    outlinePressedBg:             string;
    outlineBorder:                string;
    outlinePressedBorder:         string;
    outlineDisabledBorder:        string;
    outlineProgressBg:            string;
    outlineText:                  string;
    outlinePressedText:           string;
    outlineTextDisabled:          string;
    outlineDarkBg:                string;
    outlineDarkBorder:            string;
    outlineDarkPressedBorder:     string;
    outlineDarkDisabledBorder:    string;
    outlineDarkProgressBg:        string;
    outlineDarkText:              string;
    outlineDarkPressedText:       string;
    outlineDarkTextDisabled:      string;
    outlineErrorBg:               string;
    outlineErrorBorder:           string;
    outlineErrorPressedBorder:    string;
    outlineErrorDisabledBorder:   string;
    outlineErrorProgressBg:       string;
    outlineErrorText:             string;
    outlineErrorPressedText:      string;
    outlineErrorTextDisabled:     string;
    whiteBg:                      string;
    whitePressedBg:               string;
    whiteDisabledBg:              string;
    whiteBorder:                  string;
    whitePressedBorder:           string;
    whiteText:                    string;
    loadingIndicator:             string;
  };
  roundButton: {
    primaryBg:                    string;
    primaryBorder:                string;
    primaryDisabledBg:            string;
    primaryDisabledBorder:        string;
    primaryIcon:                  string;
    primaryLightBg:               string;
    primaryLightBorder:           string;
    primaryLightIcon:             string;
    primaryOutlinedBg:            string;
    primaryOutlinedBorder:        string;
    primaryOutlinedDisabledBorder: string;
    primaryOutlinedIcon:          string;
    errorOutlinedBg:              string;
    errorOutlinedBorder:          string;
    errorOutlinedDisabledBg:      string;
    errorOutlinedIcon:            string;
    outlinedDarkBg:               string;
    outlinedDarkBorder:           string;
    outlinedDarkDisabledBg:       string;
    outlinedDarkDisabledBorder:   string;
    outlinedDarkIcon:             string;
  };
  input: {
    background:     string;
    border:         string;
    borderFocused:  string;
    borderError:    string;
    borderWarning:  string;
    text:           string;
    textDisabled:   string;
    placeholder:    string;
    label:          string;
    labelSecondary: string;
    errorText:      string;
    warningText:    string;
    cursorColor:    string;
  };
  codeInput: {
    background:    string;
    border:        string;
    borderFocused: string;
    borderSuccess: string;
    borderError:   string;
    successText:   string;
    errorText:     string;
    loadingText:   string;
  };
  textColor: {
    primary:     string;
    secondary:   string;
    tertiary:    string;
    disabled:    string;
    link:        string;
    linkPressed: string;
    inverse:     string;
    error:       string;
    success:     string;
    warning:     string;
    info:        string;
  };
  header: {
    background: string;
    border:     string;
    title:      string;
    subtitle:   string;
    icon:       string;
    iconActive: string;
    backIcon:   string;
  };
  pressable: {
    overlay:       string;
    overlayStrong: string;
  };
  screenWrapper: {
    background: string;
    safeArea:   string;
  };
  buttonGroup: {
    background: string;
  };
  badge: {
    successText:       string;
    successBackground: string;
    errorText:         string;
    errorBackground:   string;
    warningText:       string;
    warningBackground: string;
    infoText:          string;
    infoBackground:    string;
  };
  neutral: {
    lightGray:  string;
    mediumGray: string;
    darkGray:   string;
  };
}

export type ColorSchemaName = 'default' | 'ocean' | 'sunset';
