const React = require('react');
const { View } = require('react-native');

const LinearGradient = ({ children, ...rest }) =>
  React.createElement(View, rest, children);

module.exports = LinearGradient;
module.exports.default = LinearGradient;
