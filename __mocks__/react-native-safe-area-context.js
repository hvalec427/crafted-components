const React = require('react');

const insets = { top: 0, right: 0, bottom: 0, left: 0 };

module.exports = {
  useSafeAreaInsets: () => insets,
  SafeAreaView: ({ children }) => React.createElement(React.Fragment, null, children),
  SafeAreaProvider: ({ children, initialMetrics: _m }) =>
    React.createElement(React.Fragment, null, children),
  SafeAreaInsetsContext: { Consumer: ({ children }) => children(insets) },
};
