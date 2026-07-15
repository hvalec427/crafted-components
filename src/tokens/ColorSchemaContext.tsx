import React, { createContext, useContext } from 'react';

import { ColorSchema } from './colorSchema';
import { schemaStore } from './schemaStore';

const ColorSchemaContext = createContext<ColorSchema>(schemaStore.getSchema());

interface ColorSchemaProviderProps {
  schema: ColorSchema;
  children: React.ReactNode;
}

export const ColorSchemaProvider = ({ schema, children }: ColorSchemaProviderProps) => (
  <ColorSchemaContext.Provider value={schema}>
    {children}
  </ColorSchemaContext.Provider>
);

export const useColorSchema = (): ColorSchema => useContext(ColorSchemaContext);
