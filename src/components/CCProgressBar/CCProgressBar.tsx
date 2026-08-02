import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import { useTheme } from '../../tokens/ColorSchemaContext';
import type { ThemeColor } from '../../tokens/colorSchema';

export interface CCProgressBarProps {
  /** 0–1 */
  progress: number;
  height?: number;
  fillColor?: ThemeColor;
  trackColor?: ThemeColor;
  style?: StyleProp<ViewStyle>;
  id?: string;
}

export const CCProgressBar = ({ progress, height = 14, fillColor, trackColor, style, id }: CCProgressBarProps) => {
  const theme = useTheme();
  const clamped = Math.max(0, Math.min(1, progress));

  return (
    <View
      testID={id}
      style={[{ width: '100%', height, borderRadius: 8, backgroundColor: trackColor ?? theme.border }, style]}>
      <View
        style={{
          height: '100%',
          width: `${clamped * 100}%`,
          borderRadius: 8,
          backgroundColor: fillColor ?? theme.primary,
        }}
      />
    </View>
  );
};
