import React from 'react';
import { Insets, Platform, StyleProp, ViewStyle } from 'react-native';
import { Pressable } from 'react-native-gesture-handler';

import { testProps } from '../../utils/CCTestingId';

type CCPointerEvents = 'box-none' | 'none' | 'box-only' | 'auto' | undefined;

export interface CCPressableOpacityProps {
  onPress: (() => void) | undefined;
  onPressWhenDisabled?: (() => void) | undefined;
  children: React.ReactNode;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  hitSlop?: Insets | undefined;
  pointerEvents?: CCPointerEvents;
  id?: string;
}

export const CCPressableOpacity = ({
  onPress,
  onPressWhenDisabled,
  children,
  disabled = false,
  style,
  hitSlop,
  pointerEvents,
  id,
}: CCPressableOpacityProps) => {
  const currentHitSlop = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    ...hitSlop,
  };

  const onButtonPress = () => {
    if (disabled && onPressWhenDisabled) {
      onPressWhenDisabled();
    } else if (!disabled && onPress) {
      onPress();
    }
  };

  return (
    <Pressable
      {...testProps(id)}
      pointerEvents={pointerEvents}
      disabled={disabled && !onPressWhenDisabled}
      hitSlop={currentHitSlop}
      style={({ pressed }) => [
        pressed && !!onPress && !disabled ? { opacity: 0.5 } : { opacity: 1 },
        style,
      ]}
      onTouchEnd={() => {
        if (Platform.OS === 'ios') {
          return;
        }
        onButtonPress();
      }}
      onPress={() => {
        if (Platform.OS === 'android') {
          return;
        }
        onButtonPress();
      }}>
      {children}
    </Pressable>
  );
};
