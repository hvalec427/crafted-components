import type { TextStyle } from 'react-native';
import type { typography } from './typography';

interface CCMainButtonSizeConfig {
  height?: number;
  paddingHorizontal?: number;
  borderRadius?: number;
}

interface CCBoxBorderRadiusConfig {
  small?: number;
  mid?: number;
  large?: number;
}

export interface ComponentSchema {
  CCMainButton?: {
    sizes?: {
      medium?: CCMainButtonSizeConfig;
      large?: CCMainButtonSizeConfig;
    };
    /** Offset "pressed-3D" shadow depths for the primary button, in px. Both default to 0 (no shadow). */
    shadow?: {
      restDepth?: number;
      pressedDepth?: number;
    };
  };
  CCBox?: {
    borderRadius?: CCBoxBorderRadiusConfig;
  };
  CCPill?: {
    height?: number;
    paddingHorizontal?: number;
    borderRadius?: number;
  };
  /** Per-token overrides (e.g. fontFamily) merged into the shared `typography` object. */
  typography?: Partial<Record<keyof typeof typography, Partial<TextStyle>>>;
}
