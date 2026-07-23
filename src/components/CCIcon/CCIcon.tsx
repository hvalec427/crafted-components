import * as React from 'react';
import {
  DimensionValue,
  Image,
  ImageResizeMode,
  ImageStyle,
  StyleProp,
} from 'react-native';

import { CCImageSource, normalizeCCImageSource } from '../../utils/CCImageSource';

export interface CCIconProps {
  source: CCImageSource;
  width?: DimensionValue;
  height?: DimensionValue;
  resizeMode?: ImageResizeMode;
  /** Hex color string for the icon tint */
  tintColor?: string;
  style?: StyleProp<ImageStyle>;
}

export const CCIcon = ({
  source,
  width,
  height,
  resizeMode = 'contain',
  tintColor,
  style,
}: CCIconProps) => (
  <Image
    resizeMode={resizeMode}
    source={normalizeCCImageSource(source)}
    style={[
      tintColor ? { tintColor } : {},
      width ? { width } : {},
      height ? { height } : {},
      style,
    ]}
  />
);
