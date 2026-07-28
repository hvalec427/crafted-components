const React = require('react');
const { Pressable, ScrollView, View } = require('react-native');

const State = {
  UNDETERMINED: 0,
  FAILED: 1,
  BEGAN: 2,
  CANCELLED: 3,
  ACTIVE: 4,
  END: 5,
};

const TapGestureHandler = ({ children }) =>
  React.createElement(React.Fragment, null, children);

module.exports = {
  Pressable,
  ScrollView,
  GestureHandlerRootView: ({ children }) =>
    React.createElement(React.Fragment, null, children),
  GestureDetector: ({ children }) =>
    React.createElement(React.Fragment, null, children),
  TapGestureHandler,
  State,
};
