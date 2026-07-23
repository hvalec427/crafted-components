import { ImageSourcePropType } from 'react-native';

/**
 * Unified image/icon source that accepts either a local asset (require())
 * or a remote URL string — use normalizeCCImageSource() to convert to
 * ImageSourcePropType before passing to React Native's <Image />.
 */
export type CCImageSource = ImageSourcePropType | string;

export function normalizeCCImageSource(source: CCImageSource): ImageSourcePropType {
  if (typeof source === 'string') {
    return { uri: source };
  }
  return source;
}
