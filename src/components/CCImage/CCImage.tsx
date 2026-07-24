import * as React from 'react';
import { DimensionValue, Image, ImageResizeMode } from 'react-native';

import { CCImageSource, normalizeCCImageSource } from '../../utils/CCImageSource';
import type { ThemeColor } from '../../tokens/colorSchema';

export interface CCImageProps {
  /** Local asset (require()) or remote URL string. Takes priority over `url`. */
  source?: CCImageSource;
  /** @deprecated Use `source` instead. */
  url?: string;
  width?: DimensionValue;
  height?: DimensionValue;
  aspectRatio?: number;
  resizeMode?: ImageResizeMode;
  tintColor?: ThemeColor;
  opacity?: number;
}

export const CCImage = ({
  source,
  url,
  width,
  height,
  aspectRatio,
  tintColor,
  resizeMode = 'contain',
  opacity = 1,
}: CCImageProps) => {
  const resolvedSource = source != null ? normalizeCCImageSource(source) : { uri: url };

  return (
    <Image
      source={resolvedSource}
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
};
