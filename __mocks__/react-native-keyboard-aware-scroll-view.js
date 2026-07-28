const React = require('react');
const { ScrollView } = require('react-native');

const KeyboardAwareScrollView = ({ children, ...rest }) =>
  React.createElement(ScrollView, rest, children);

module.exports = { KeyboardAwareScrollView };
module.exports.default = KeyboardAwareScrollView;
