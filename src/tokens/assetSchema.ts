import { CCImageSource } from '../utils/CCImageSource';

export interface BuiltInIcons {
  arrow: CCImageSource;
}

export interface BuiltInImages {}

export interface AssetSchema {
  icons: BuiltInIcons & Record<string, CCImageSource>;
  images: BuiltInImages & Record<string, CCImageSource>;
}
