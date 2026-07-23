import React, { useEffect, useState } from 'react';

import { ColorSchema } from './colorSchema';
import { ColorSchemaProvider } from './ColorSchemaContext';
import { schemaStore } from './schemaStore';
import { AssetSchema } from './assetSchema';
import { AssetProvider } from './AssetContext';
import { assetStore } from './assetStore';

interface CraftedProviderProps {
  children: React.ReactNode;
}

export const CraftedProvider = ({ children }: CraftedProviderProps) => {
  const [schema, setSchema] = useState<ColorSchema>(schemaStore.getSchema());
  const [assets, setAssets] = useState<AssetSchema>(assetStore.getAssets());

  useEffect(() => schemaStore.subscribe(setSchema), []);
  useEffect(() => assetStore.subscribe(setAssets), []);

  return (
    <ColorSchemaProvider schema={schema}>
      <AssetProvider assets={assets}>
        {children}
      </AssetProvider>
    </ColorSchemaProvider>
  );
};
