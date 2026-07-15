const alpha = (hex: string, pct: number): string => {
  const a = Math.round(pct * 255)
    .toString(16)
    .padStart(2, '0')
    .toUpperCase();
  return `${hex}${a}`;
};

// ─── 10 base colors ───────────────────────────────────────────────────────────
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

// ─── Component color sections ─────────────────────────────────────────────────
const makeComponentColors = (b: BaseColors) => ({
  button: {
    primaryBg:              b.primary,
    primaryPressedBg:       alpha(b.primary, 0.82),
    primaryDisabledBg:      alpha(b.primary, 0.28),
    primaryBorder:          b.primary,
    primaryText:            b.surface,
    primaryTextDisabled:    alpha(b.surface, 0.65),

    primaryLightBg:             alpha(b.primary, 0.12),
    primaryLightPressedBg:      alpha(b.primary, 0.32),
    primaryLightDisabledBg:     alpha(b.text, 0.22),
    primaryLightBorder:         alpha(b.primary, 0.12),
    primaryLightPressedBorder:  alpha(b.primary, 0.32),
    primaryLightText:           alpha(b.primary, 0.85),
    primaryLightTextDisabled:   alpha(b.surface, 0.65),

    failBg:             b.error,
    failPressedBg:      alpha(b.error, 0.82),
    failDisabledBg:     alpha(b.error, 0.28),
    failBorder:         b.error,
    failText:           b.surface,

    successBg:              b.success,
    successPressedBg:       alpha(b.success, 0.82),
    successDisabledBg:      alpha(b.success, 0.18),
    successBorder:          b.success,
    successText:            b.surface,
    successTextDisabled:    alpha(b.text, 0.55),

    outlineBg:              alpha(b.surface, 0),
    outlinePressedBg:       alpha(b.primary, 0.10),
    outlineBorder:          b.primary,
    outlinePressedBorder:   alpha(b.primary, 0.82),
    outlineDisabledBorder:  alpha(b.text, 0.22),
    outlineProgressBg:      b.background,
    outlineText:            b.primary,
    outlinePressedText:     alpha(b.primary, 0.82),
    outlineTextDisabled:    alpha(b.text, 0.22),

    outlineDarkBg:              alpha(b.surface, 0),
    outlineDarkBorder:          alpha(b.text, 0.78),
    outlineDarkPressedBorder:   b.text,
    outlineDarkDisabledBorder:  alpha(b.text, 0.22),
    outlineDarkProgressBg:      b.background,
    outlineDarkText:            alpha(b.text, 0.78),
    outlineDarkPressedText:     b.text,
    outlineDarkTextDisabled:    alpha(b.text, 0.22),

    outlineErrorBg:               alpha(b.surface, 0),
    outlineErrorBorder:           b.error,
    outlineErrorPressedBorder:    alpha(b.error, 0.82),
    outlineErrorDisabledBorder:   alpha(b.error, 0.28),
    outlineErrorProgressBg:       alpha(b.error, 0.10),
    outlineErrorText:             b.error,
    outlineErrorPressedText:      alpha(b.error, 0.82),
    outlineErrorTextDisabled:     alpha(b.error, 0.28),

    whiteBg:              b.surface,
    whitePressedBg:       b.border,
    whiteDisabledBg:      b.border,
    whiteBorder:          b.surface,
    whitePressedBorder:   b.border,
    whiteText:            b.text,

    loadingIndicator:     b.surface,
  },

  roundButton: {
    primaryBg:              b.primary,
    primaryBorder:          b.primary,
    primaryDisabledBg:      alpha(b.primary, 0.28),
    primaryDisabledBorder:  alpha(b.primary, 0.28),
    primaryIcon:            b.surface,

    primaryLightBg:         alpha(b.primary, 0.28),
    primaryLightBorder:     alpha(b.primary, 0.28),
    primaryLightIcon:       b.primary,

    primaryOutlinedBg:               b.surface,
    primaryOutlinedBorder:           b.primary,
    primaryOutlinedDisabledBorder:   alpha(b.primary, 0.28),
    primaryOutlinedIcon:             b.primary,

    errorOutlinedBg:          b.surface,
    errorOutlinedBorder:      b.error,
    errorOutlinedDisabledBg:  alpha(b.text, 0.22),
    errorOutlinedIcon:        b.error,

    outlinedDarkBg:             b.surface,
    outlinedDarkBorder:         alpha(b.text, 0.78),
    outlinedDarkDisabledBg:     alpha(b.text, 0.22),
    outlinedDarkDisabledBorder: alpha(b.text, 0.22),
    outlinedDarkIcon:           alpha(b.text, 0.78),
  },

  input: {
    background:         b.surface,
    border:             b.border,
    borderFocused:      b.primary,
    borderError:        b.error,
    borderWarning:      b.warning,
    text:               b.text,
    textDisabled:       alpha(b.text, 0.40),
    placeholder:        alpha(b.text, 0.45),
    label:              b.text,
    labelSecondary:     alpha(b.text, 0.60),
    errorText:          b.error,
    warningText:        b.warning,
    cursorColor:        b.primary,
  },

  codeInput: {
    background:      b.surface,
    border:          b.border,
    borderFocused:   b.primary,
    borderSuccess:   b.success,
    borderError:     b.error,
    successText:     b.success,
    errorText:       b.error,
    loadingText:     alpha(b.text, 0.55),
  },

  text: {
    primary:        b.text,
    secondary:      alpha(b.text, 0.60),
    tertiary:       alpha(b.text, 0.40),
    disabled:       alpha(b.text, 0.30),
    link:           b.primary,
    linkPressed:    alpha(b.primary, 0.82),
    inverse:        b.surface,
    error:          b.error,
    success:        b.success,
    warning:        b.warning,
    info:           b.info,
  },

  header: {
    background:     b.surface,
    border:         b.border,
    title:          b.text,
    subtitle:       alpha(b.text, 0.60),
    icon:           b.text,
    iconActive:     b.primary,
    backIcon:       b.text,
  },

  pressable: {
    overlay:        alpha(b.text, 0.07),
    overlayStrong:  alpha(b.text, 0.14),
  },

  screenWrapper: {
    background:     b.background,
    safeArea:       b.background,
  },

  buttonGroup: {
    background:     b.surface,
  },

  badge: {
    successText:        b.success,
    successBackground:  alpha(b.success, 0.14),
    errorText:          b.error,
    errorBackground:    alpha(b.error, 0.14),
    warningText:        b.warning,
    warningBackground:  alpha(b.warning, 0.14),
    infoText:           b.info,
    infoBackground:     alpha(b.info, 0.14),
  },

  neutral: {
    lightGray:  alpha(b.text, 0.22),
    mediumGray: alpha(b.text, 0.55),
    darkGray:   alpha(b.text, 0.78),
  },
});

// ─── ColorSchema shape ────────────────────────────────────────────────────────
export interface ColorSchema extends BaseColors {
  components: ReturnType<typeof makeComponentColors>;
}

export const makeSchema = (b: BaseColors): ColorSchema => ({
  ...b,
  components: makeComponentColors(b),
});

// ─── Schema names ─────────────────────────────────────────────────────────────
export type ColorSchemaName = 'default' | 'ocean' | 'sunset';
