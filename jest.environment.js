// Extends jest-environment-node from the top-level install (matching Jest 30)
// rather than the one bundled inside @react-native/jest-preset (Jest 29).
// The customExportConditions adds 'react-native' so RN module resolution works.
const { TestEnvironment } = require('jest-environment-node');

module.exports = class ReactNativeEnv extends TestEnvironment {
  customExportConditions = ['require', 'react-native'];
};
