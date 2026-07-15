import type { Preview } from '@storybook/react-native';
import React, { useEffect, useState } from 'react';

import { ColorSchemaProvider } from '../../src/tokens/ColorSchemaContext';
import type { ColorSchema } from '../../src/tokens/colorSchema';
import { schemaStore } from '../../src/tokens/schemaStore';

const SchemaDecorator = ({ children }: { children: React.ReactNode }) => {
  const [schema, setSchema] = useState<ColorSchema>(schemaStore.getSchema());

  useEffect(() => schemaStore.subscribe(setSchema), []);

  return (
    <ColorSchemaProvider schema={schema}>
      {children}
    </ColorSchemaProvider>
  );
};

const preview: Preview = {
  decorators: [
    (Story) => (
      <SchemaDecorator>
        <Story />
      </SchemaDecorator>
    ),
  ],
  parameters: {
    options: {
      storySort: {
        order: ['Global', '*'],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
