import React from 'react';
import { render, type RenderOptions } from '@testing-library/react-native';
import { ColorSchemaProvider } from '../tokens/ColorSchemaContext';
import { schemaStore } from '../tokens/schemaStore';

export async function renderWithTheme(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, {
    wrapper: ({ children }) => (
      <ColorSchemaProvider schema={schemaStore.getSchema()}>
        {children}
      </ColorSchemaProvider>
    ),
    ...options,
  });
}
