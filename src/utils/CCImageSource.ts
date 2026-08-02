import type { ComponentType } from 'react';
import { ImageSourcePropType } from 'react-native';

/**
 * Unified image/icon source that accepts either a local asset (require())
 * or a remote URL string — use normalizeCCImageSource() to convert to
 * ImageSourcePropType before passing to React Native's <Image />.
 */
export type CCImageSource = ImageSourcePropType | string;

/** A vector icon rendered directly (e.g. via react-native-svg) instead of through <Image>. */
export type CCVectorIconComponent = ComponentType<{
  width?: number;
  height?: number;
  color?: string;
}>;

/** Anything CCIcon can render — a raster/URL source or a vector icon component. */
export type CCIconSource = CCImageSource | CCVectorIconComponent;

export function isCCVectorIconComponent(source: CCIconSource): source is CCVectorIconComponent {
  return typeof source === 'function';
}

export function normalizeCCImageSource(source: CCImageSource): ImageSourcePropType {
  if (typeof source === 'string') {
    return { uri: source };
  }
  return source;
}
