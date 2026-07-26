import React, { useEffect, useState } from 'react';

import { ColorSchema } from './colorSchema';
import { ColorSchemaProvider } from './ColorSchemaContext';
import { schemaStore } from './schemaStore';
import { AssetSchema } from './assetSchema';
import { AssetProvider } from './AssetContext';
import { assetStore } from './assetStore';
import { CCPopupHost } from '../components/CCPopup/CCPopupHost';
import { CCAlertBannerHost } from '../components/CCAlertBanner/CCAlertBannerHost';

interface CraftedProviderProps {
  children: React.ReactNode;
  /** topOffset passed to the alert banner host */
  alertBannerTopOffset?: number;
  /** Whether tapping the backdrop dismisses the popup. Default true. */
  popupDismissOnBackdrop?: boolean;
}

export const CraftedProvider = ({
  children,
  alertBannerTopOffset = 0,
  popupDismissOnBackdrop = true,
}: CraftedProviderProps) => {
  const [schema, setSchema] = useState<ColorSchema>(schemaStore.getSchema());
  const [assets, setAssets] = useState<AssetSchema>(assetStore.getAssets());

  useEffect(() => schemaStore.subscribe(setSchema), []);
  useEffect(() => assetStore.subscribe(setAssets), []);

  return (
    <ColorSchemaProvider schema={schema}>
      <AssetProvider assets={assets}>
        <CCPopupHost dismissOnBackdrop={popupDismissOnBackdrop} />
        <CCAlertBannerHost topOffset={alertBannerTopOffset} />
        {children}
      </AssetProvider>
    </ColorSchemaProvider>
  );
};
