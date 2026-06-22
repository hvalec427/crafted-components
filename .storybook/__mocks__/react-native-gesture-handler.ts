import React from 'react';
import { Pressable as RNPressable, TouchableOpacity as RNTouchableOpacity, TouchableWithoutFeedback as RNTouchableWithoutFeedback } from 'react-native';

export const Pressable = RNPressable;
export const TouchableOpacity = RNTouchableOpacity;
export const TouchableWithoutFeedback = RNTouchableWithoutFeedback;

export const GestureHandlerRootView = ({ children }: { children: React.ReactNode }) => children;
export const GestureDetector = ({ children }: { children: React.ReactNode }) => children;

export const TapGestureHandler = ({ children }: { children: React.ReactNode }) => children;

export const State = {
  UNDETERMINED: 0,
  FAILED: 1,
  BEGAN: 2,
  CANCELLED: 3,
  ACTIVE: 4,
  END: 5,
};

export const Gesture = {
  Tap: () => ({ onStart: () => ({}) }),
  Pan: () => ({ onStart: () => ({}) }),
};
