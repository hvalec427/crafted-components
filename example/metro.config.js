const path = require('path');
const fs = require('fs');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { withStorybook } = require('@storybook/react-native/metro/withStorybook');

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '..');

// With disableHierarchicalLookup, Metro won't walk up directories, so packages
// that ship their own nested node_modules won't find them automatically.
// Scan example/node_modules one level deep and expose every nested node_modules
// dir explicitly so those deps still resolve.
function getNestedNodeModulesPaths(nodeModulesDir) {
  const paths = [];
  if (!fs.existsSync(nodeModulesDir)) return paths;
  for (const entry of fs.readdirSync(nodeModulesDir)) {
    try {
      const pkgPath = path.join(nodeModulesDir, entry);
      if (entry.startsWith('@')) {
        for (const scoped of fs.readdirSync(pkgPath)) {
          const nested = path.join(pkgPath, scoped, 'node_modules');
          if (fs.existsSync(nested)) paths.push(nested);
        }
      } else {
        const nested = path.join(pkgPath, 'node_modules');
        if (fs.existsSync(nested)) paths.push(nested);
      }
    } catch (_) {}
  }
  return paths;
}

const projectNodeModules = path.resolve(projectRoot, 'node_modules');

const defaultConfig = getDefaultConfig(projectRoot);

const config = {
  watchFolders: [monorepoRoot],
  resolver: {
    // Prevent src/ files (outside this project root) from walking up to the
    // monorepo root's node_modules and loading a second React/RN instance.
    disableHierarchicalLookup: true,
    nodeModulesPaths: [
      projectNodeModules,
      // Expose every package's own nested node_modules so they resolve even
      // when hierarchical lookup is disabled.
      ...getNestedNodeModulesPaths(projectNodeModules),
      path.resolve(monorepoRoot, 'node_modules'),
    ],
  },
};

const mergedConfig = mergeConfig(defaultConfig, config);

module.exports = withStorybook(mergedConfig, {
  enabled: true,
  configPath: path.resolve(__dirname, './.rnstorybook'),
});
