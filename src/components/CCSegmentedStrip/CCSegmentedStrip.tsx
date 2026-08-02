import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import { CCRow } from '../CCLayout/CCRow';
import { useTheme } from '../../tokens/ColorSchemaContext';
import type { ThemeColor } from '../../tokens/colorSchema';

export interface CCSegmentedStripProps {
  segments: number;
  filled: number;
  height?: number;
  gap?: number;
  filledColor?: ThemeColor;
  emptyColor?: ThemeColor;
  style?: StyleProp<ViewStyle>;
  id?: string;
}

export const CCSegmentedStrip = ({
  segments,
  filled,
  height = 26,
  gap = 8,
  filledColor,
  emptyColor,
  style,
  id,
}: CCSegmentedStripProps) => {
  const theme = useTheme();
  const filledBg = filledColor ?? theme.warning;
  const emptyBg = emptyColor ?? theme.border;

  return (
    <CCRow id={id} gap={gap} style={style}>
      {Array.from({ length: segments }, (_, index) => (
        <View
          key={index}
          testID={id ? `${id}-segment-${index}` : undefined}
          style={{
            flex: 1,
            height,
            borderRadius: 8,
            backgroundColor: index < filled ? filledBg : emptyBg,
          }}
        />
      ))}
    </CCRow>
  );
};
