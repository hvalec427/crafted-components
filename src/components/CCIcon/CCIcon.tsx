import * as React from 'react';
import {
  DimensionValue,
  Image,
  ImageResizeMode,
  ImageStyle,
  StyleProp,
  StyleSheet,
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
    // Vector icons size/color themselves via width/height/color props, not
    // style, so a caller that only sets those through `style` (as
    // CCRoundButton does for its fixed icon size and tint) would otherwise
    // render at the vector icon's own defaults — fall back to reading them
    // off the flattened style when the explicit props aren't given.
    const flatStyle = StyleSheet.flatten(style) as
      | { width?: number; height?: number; tintColor?: string }
      | undefined;
    const resolvedWidth = typeof width === 'number' ? width : flatStyle?.width;
    const resolvedHeight = typeof height === 'number' ? height : flatStyle?.height;
    const resolvedColor = tintColor ?? flatStyle?.tintColor;
    return (
      <VectorIcon
        width={typeof resolvedWidth === 'number' ? resolvedWidth : undefined}
        height={typeof resolvedHeight === 'number' ? resolvedHeight : undefined}
        color={resolvedColor}
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
