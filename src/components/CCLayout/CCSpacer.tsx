import React from 'react';
import { View } from 'react-native';

interface CCSpacerProps {
  height?: number;
  width?: number;
}

export const CCSpacer = (props: CCSpacerProps) => {
  const { height = 0, width = 0 } = props;

  return (
    <View
      style={{
        height,
        width,
      }}
    />
  );
};
