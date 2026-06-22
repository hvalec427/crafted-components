import React from 'react';
import type { Preview } from '@storybook/react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  resources: { en: { translation: {} } },
  interpolation: { escapeValue: false },
  returnNull: false,
});

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'white',
      values: [
        { name: 'white', value: '#ffffff' },
        { name: 'surface', value: '#F7FAFC' },
        { name: 'dark', value: '#1C2026' },
      ],
    },
    layout: 'centered',
    controls: { matchers: { color: /(color|background)$/i } },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 24, minWidth: 360, fontFamily: 'Inter-Regular, system-ui, sans-serif' }}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
