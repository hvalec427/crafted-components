import { icons as defaultIcons } from '../assets/icons';
import { images as defaultImages } from '../assets/images';
import type { AssetSchema } from './assetSchema';

const _default: AssetSchema = {
  icons: { ...defaultIcons },
  images: { ...defaultImages },
};

let _current: AssetSchema = _default;

const _listeners = new Set<(assets: AssetSchema) => void>();

export const assetStore = {
  getAssets(): AssetSchema {
    return _current;
  },

  subscribe(fn: (assets: AssetSchema) => void): () => void {
    _listeners.add(fn);
    return () => _listeners.delete(fn);
  },
};

export function initCraftedAssets(
  assets: Partial<{ icons: Record<string, AssetSchema['icons'][string]>; images: Record<string, AssetSchema['images'][string]> }>
): void {
  _current = {
    icons: { ..._current.icons, ...assets.icons },
    images: { ..._current.images, ...assets.images },
  };
  _listeners.forEach(fn => fn(_current));
}
