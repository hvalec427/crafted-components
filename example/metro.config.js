const path = require('path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { withStorybook } = require('@storybook/react-native/metro/withStorybook');

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '..');

const defaultConfig = getDefaultConfig(projectRoot);

const config = {
  watchFolders: [monorepoRoot],
  resolver: {
    // Ensure packages from src/ (outside this project root) always resolve
    // to this app's node_modules first, not the root's older versions.
    nodeModulesPaths: [
      path.resolve(projectRoot, 'node_modules'),
      path.resolve(monorepoRoot, 'node_modules'),
    ],
    disableHierarchicalLookup: true,
  },
};

const mergedConfig = mergeConfig(defaultConfig, config);

module.exports = withStorybook(mergedConfig, {
  enabled: true,
  configPath: path.resolve(__dirname, './.rnstorybook'),
});
