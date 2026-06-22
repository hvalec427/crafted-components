import React from 'react';
import { View, ViewStyle, StyleProp } from 'react-native';

export const SafeAreaView = ({ children, style, ...rest }: { children?: React.ReactNode; style?: StyleProp<ViewStyle>; [key: string]: unknown }) =>
  React.createElement(View, { style, ...rest }, children);

export const SafeAreaProvider = ({ children }: { children?: React.ReactNode }) => children;

export const useSafeAreaInsets = () => ({ top: 0, bottom: 0, left: 0, right: 0 });

export const useSafeAreaFrame = () => ({ x: 0, y: 0, width: 375, height: 812 });

export type Edge = 'top' | 'bottom' | 'left' | 'right';
