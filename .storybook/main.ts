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
    '@storybook/addon-interactions',
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
          // Map react-native → react-native-web for browser rendering
          'react-native': 'react-native-web',
          // Stub native-only packages
          'lottie-react-native': path.resolve(__dirname, './__mocks__/lottie-react-native.tsx'),
          'react-native-actions-sheet': path.resolve(__dirname, './__mocks__/react-native-actions-sheet.ts'),
          'react-native-vision-camera': path.resolve(__dirname, './__mocks__/react-native-vision-camera.ts'),
          'react-native-permissions': path.resolve(__dirname, './__mocks__/react-native-permissions.ts'),
          'react-native-background-geolocation': path.resolve(__dirname, './__mocks__/react-native-background-geolocation.ts'),
          // Stub native-only packages (continued)
          'react-native-safe-area-context': path.resolve(__dirname, './__mocks__/react-native-safe-area-context.ts'),
          'react-native-keyboard-aware-scroll-view': path.resolve(__dirname, './__mocks__/react-native-keyboard-aware-scroll-view.ts'),
          'react-native-gesture-handler': path.resolve(__dirname, './__mocks__/react-native-gesture-handler.ts'),
          'react-native-fast-image': path.resolve(__dirname, './__mocks__/react-native-fast-image.ts'),
          'react-native-skeleton-placeholder': path.resolve(__dirname, './__mocks__/react-native-skeleton-placeholder.ts'),
          'react-native-haptic-feedback': path.resolve(__dirname, './__mocks__/react-native-haptic-feedback.ts'),
          'react-native-keyboard-accessory': path.resolve(__dirname, './__mocks__/react-native-keyboard-accessory.ts'),
          'react-native-config': path.resolve(__dirname, './__mocks__/react-native-config.ts'),
          'react-native-compressor': path.resolve(__dirname, './__mocks__/react-native-compressor.ts'),
          'react-native-compressor/lib/typescript/Image': path.resolve(__dirname, './__mocks__/react-native-compressor.ts'),
          'react-native-fs': path.resolve(__dirname, './__mocks__/react-native-fs.ts'),
          'react-native-image-picker': path.resolve(__dirname, './__mocks__/react-native-image-picker.ts'),
          // App-internal paths that components may still reference
          '../../../store/rootStore': path.resolve(__dirname, './__mocks__/rootStore.ts'),
          '../../store/rootStore': path.resolve(__dirname, './__mocks__/rootStore.ts'),
          '../store/rootStore': path.resolve(__dirname, './__mocks__/rootStore.ts'),
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
        exclude: ['lottie-react-native'],
      },
    });
  },
};

export default config;
