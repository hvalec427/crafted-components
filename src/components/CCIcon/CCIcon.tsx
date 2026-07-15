import * as React from 'react';
import {
  DimensionValue,
  Image,
  ImageResizeMode,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
} from 'react-native';

export interface CCIconProps {
  source: ImageSourcePropType;
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
    source={source}
    style={[
      tintColor ? { tintColor } : {},
      width ? { width } : {},
      height ? { height } : {},
      style,
    ]}
  />
);
