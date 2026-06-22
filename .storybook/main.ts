import path from 'path';
import type { StorybookConfig } from '@storybook/react-vite';
import type { Plugin } from 'vite';

const requireToImportPlugin: Plugin = {
  name: 'require-to-esm-assets',
  transform(code, id) {
    if (!id.endsWith('index.js')) return;
    if (!id.includes('/assets/icons/') && !id.includes('/assets/images/')) return;
    let idx = 0;
    const imports: string[] = [];
    const transformed = code.replace(/require\((['"])([^'"]+)['"]\)/g, (_match, quote, p) => {
      const varName = `__asset_${idx++}`;
      imports.push(`import ${varName} from ${quote}${p}${quote};`);
      return varName;
    });
    return { code: imports.join('\n') + '\n' + transformed, map: null };
  },
};

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: { autodocs: 'tag' },
  async viteFinal(config) {
    const { mergeConfig } = await import('vite');
    return mergeConfig(config, {
      plugins: [requireToImportPlugin],
      resolve: {
        alias: {
          'react-native': 'react-native-web',
          'react-native-safe-area-context': path.resolve(__dirname, './__mocks__/react-native-safe-area-context.ts'),
          'react-native-keyboard-aware-scroll-view': path.resolve(__dirname, './__mocks__/react-native-keyboard-aware-scroll-view.ts'),
          'react-native-gesture-handler': path.resolve(__dirname, './__mocks__/react-native-gesture-handler.ts'),
        },
        extensions: [
          '.web.tsx', '.web.ts', '.web.jsx', '.web.js',
          '.tsx', '.ts', '.jsx', '.js',
        ],
      },
      define: {
        global: 'globalThis',
        __DEV__: JSON.stringify(false),
        'process.env.NODE_ENV': JSON.stringify('development'),
      },
      optimizeDeps: {
        include: ['react-native-web'],
      },
    });
  },
};

export default config;
