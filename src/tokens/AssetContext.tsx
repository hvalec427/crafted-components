import React, { createContext, useContext } from 'react';

import type { AssetSchema } from './assetSchema';
import { assetStore } from './assetStore';

const AssetContext = createContext<AssetSchema>(assetStore.getAssets());

interface AssetProviderProps {
  assets: AssetSchema;
  children: React.ReactNode;
}

export const AssetProvider = ({ assets, children }: AssetProviderProps) => (
  <AssetContext.Provider value={assets}>
    {children}
  </AssetContext.Provider>
);

export const useAssets = (): AssetSchema => useContext(AssetContext);
