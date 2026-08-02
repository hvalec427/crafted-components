import { CCIconSource, CCImageSource } from '../utils/CCImageSource';

export interface BuiltInIcons {
  arrow: CCIconSource;
}

export interface BuiltInImages {}

export interface AssetSchema {
  icons: BuiltInIcons & Record<string, CCIconSource>;
  images: BuiltInImages & Record<string, CCImageSource>;
}
