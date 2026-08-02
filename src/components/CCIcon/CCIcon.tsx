import * as React from 'react';
import {
  DimensionValue,
  Image,
  ImageResizeMode,
  ImageStyle,
  StyleProp,
} from 'react-native';

import { CCIconSource, isCCVectorIconComponent, normalizeCCImageSource } from '../../utils/CCImageSource';
import type { ThemeColor } from '../../tokens/colorSchema';

export interface CCIconProps {
  source: CCIconSource;
  width?: DimensionValue;
  height?: DimensionValue;
  resizeMode?: ImageResizeMode;
  tintColor?: ThemeColor;
  style?: StyleProp<ImageStyle>;
}

export const CCIcon = ({
  source,
  width,
  height,
  resizeMode = 'contain',
  tintColor,
  style,
}: CCIconProps) => {
  if (isCCVectorIconComponent(source)) {
    const VectorIcon = source;
    return (
      <VectorIcon
        width={typeof width === 'number' ? width : undefined}
        height={typeof height === 'number' ? height : undefined}
        color={tintColor}
      />
    );
  }

  return (
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
};
