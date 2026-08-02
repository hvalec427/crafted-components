import type { TextStyle } from 'react-native';
import type { typography } from './typography';

interface CCMainButtonSizeConfig {
  height?: number;
  paddingHorizontal?: number;
}

interface CCBoxBorderRadiusConfig {
  small?: number;
  mid?: number;
  large?: number;
}

export interface ComponentSchema {
  CCMainButton?: {
    sizes?: {
      small?: CCMainButtonSizeConfig;
      medium?: CCMainButtonSizeConfig;
      large?: CCMainButtonSizeConfig;
    };
  };
  CCBox?: {
    borderRadius?: CCBoxBorderRadiusConfig;
  };
  /** Per-token overrides (e.g. fontFamily) merged into the shared `typography` object. */
  typography?: Partial<Record<keyof typeof typography, Partial<TextStyle>>>;
}
