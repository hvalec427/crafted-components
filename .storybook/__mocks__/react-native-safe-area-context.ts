import React from 'react';
import { View } from 'react-native';

export const SafeAreaView = ({ children, style, edges, ...rest }: any) =>
  React.createElement(View, { style, ...rest }, children);

export const SafeAreaProvider = ({ children }: any) => children;

export const useSafeAreaInsets = () => ({ top: 0, bottom: 0, left: 0, right: 0 });

export const useSafeAreaFrame = () => ({ x: 0, y: 0, width: 375, height: 812 });

export type Edge = 'top' | 'bottom' | 'left' | 'right';
