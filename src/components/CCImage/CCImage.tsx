import * as React from 'react';
import { DimensionValue, Image, ImageResizeMode } from 'react-native';

export interface CCImageProps {
  url: string;
  width?: DimensionValue;
  height?: DimensionValue;
  aspectRatio?: number;
  resizeMode?: ImageResizeMode;
  /** Hex color string for the image tint */
  tintColor?: string;
  opacity?: number;
}

export const CCImage = ({
  url,
  width,
  height,
  aspectRatio,
  tintColor,
  resizeMode = 'contain',
  opacity = 1,
}: CCImageProps) => (
  <Image
    source={{ uri: url }}
    resizeMode={resizeMode}
    style={[
      width ? { width } : {},
      aspectRatio ? { aspectRatio } : {},
      height ? { height } : {},
      opacity !== 1 ? { opacity } : {},
      tintColor ? { tintColor } : {},
    ]}
  />
);
