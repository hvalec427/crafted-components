import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import { CCRow } from '../CCLayout/CCRow';
import { useTheme } from '../../tokens/ColorSchemaContext';
import type { ThemeColor } from '../../tokens/colorSchema';

export interface CCStepDotsProps {
  count: number;
  activeIndex: number;
  dotSize?: number;
  gap?: number;
  activeColor?: ThemeColor;
  inactiveColor?: ThemeColor;
  style?: StyleProp<ViewStyle>;
  id?: string;
}

export const CCStepDots = ({
  count,
  activeIndex,
  dotSize = 8,
  gap = 8,
  activeColor,
  inactiveColor,
  style,
  id,
}: CCStepDotsProps) => {
  const theme = useTheme();
  const active = activeColor ?? theme.primary;
  const inactive = inactiveColor ?? theme.border;

  return (
    <CCRow id={id} align="center" gap={gap} style={style}>
      {Array.from({ length: count }, (_, index) => (
        <View
          key={index}
          testID={id ? `${id}-dot-${index}` : undefined}
          style={{
            width: dotSize,
            height: dotSize,
            borderRadius: dotSize / 2,
            backgroundColor: index === activeIndex ? active : inactive,
          }}
        />
      ))}
    </CCRow>
  );
};
