import React from 'react';
import { View } from 'react-native';

const SkeletonPlaceholder = ({ children }: { children?: React.ReactNode }) =>
  React.createElement(View, null, children);

SkeletonPlaceholder.Item = (props: any) => React.createElement(View, props);

export default SkeletonPlaceholder;
