import * as React from 'react';
import {
  DimensionValue,
  Image,
  ImageResizeMode,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
} from 'react-native';

import colors from '../../tokens/colors.json';

export interface CCIconProps {
  source: ImageSourcePropType;
  width?: DimensionValue;
  height?: DimensionValue;
  resizeMode?: ImageResizeMode;
  tintColor?: keyof typeof colors;
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
      tintColor && { tintColor: colors[tintColor] },
      width ? { width } : {},
      height ? { height } : {},
      style,
    ]}
  />
);
