import React, { useEffect, useState } from 'react';

import { ColorSchema } from './colorSchema';
import { ColorSchemaProvider } from './ColorSchemaContext';
import { schemaStore } from './schemaStore';

interface CraftedProviderProps {
  children: React.ReactNode;
}

export const CraftedProvider = ({ children }: CraftedProviderProps) => {
  const [schema, setSchema] = useState<ColorSchema>(schemaStore.getSchema());

  useEffect(() => schemaStore.subscribe(setSchema), []);

  return (
    <ColorSchemaProvider schema={schema}>
      {children}
    </ColorSchemaProvider>
  );
};
