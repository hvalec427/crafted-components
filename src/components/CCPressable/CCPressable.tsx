import React, { useState } from 'react';
import { Animated, Easing, StyleProp, ViewStyle } from 'react-native';
import { State, TapGestureHandler } from 'react-native-gesture-handler';

import { testProps } from '../../utils/CCTestingId';
import { useColorSchema } from '../../tokens/ColorSchemaContext';

export interface CCPressableProps {
  onPress: (() => void) | null;
  disabled?: boolean;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle> | ((pressed: boolean) => StyleProp<ViewStyle>);
  hitSlop?: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
  id?: string;
  type?: 'normal' | 'scale' | 'background_overlay_primary' | undefined;
  /** Hex color string for the unpressed overlay background */
  overlayPrimaryInitialColor?: string;
  pointerEvents?: 'none' | 'auto' | 'box-none' | 'box-only' | undefined;
}

const CCPressable = (props: CCPressableProps) => {
  const schema = useColorSchema();

  const {
    onPress = null,
    disabled = false,
    children,
    style,
    id,
    type = undefined,
    pointerEvents,
    overlayPrimaryInitialColor = schema.surface,
  } = props;

  let { hitSlop } = props;

  hitSlop = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    ...hitSlop,
  };

  const [progress] = useState(new Animated.Value(0));
  const [isPressed, setIsPressed] = useState(false);

  const resetProgress = () => {
    Animated.timing(progress, {
      easing: Easing.cubic,
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const startProgress = () => {
    Animated.timing(progress, {
      easing: Easing.cubic,
      toValue: 5,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handleProgress = (state: unknown) => {
    if (state === State.BEGAN) {
      if (disabled) return;
      if (type === 'scale') startProgress();
      setIsPressed(true);
    } else if (state === State.END) {
      if (disabled || !onPress) return;
      onPress();
      if (type === 'scale') resetProgress();
      setIsPressed(false);
    } else if (state === State.CANCELLED || state === State.FAILED) {
      if (disabled) return;
      if (type === 'scale') resetProgress();
      setIsPressed(false);
    }
  };

  const scale = progress?.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.995],
  });

  return (
    <TapGestureHandler
      {...testProps(id)}
      maxDurationMs={999999}
      onHandlerStateChange={(e: { nativeEvent: { state: number } }) => {
        handleProgress(e.nativeEvent.state);
      }}
      hitSlop={hitSlop}
      enabled={!disabled}>
      <Animated.View
        pointerEvents={pointerEvents}
        style={[
          typeof style === 'function' ? style(isPressed) : style,
          type === 'scale' && { transform: [{ scale }] },
          type === 'background_overlay_primary' && {
            backgroundColor: isPressed
              ? schema.button.primaryLightBg
              : overlayPrimaryInitialColor,
          },
        ]}>
        {children}
      </Animated.View>
    </TapGestureHandler>
  );
};

export default CCPressable;
