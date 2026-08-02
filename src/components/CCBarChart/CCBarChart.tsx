import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import { CCRow } from '../CCLayout/CCRow';
import { CCColumn } from '../CCLayout/CCColumn';
import { CCText } from '../CCText/CCText';
import { useTheme } from '../../tokens/ColorSchemaContext';
import type { ThemeColor } from '../../tokens/colorSchema';

export interface CCBarChartDatum {
  label: string;
  /** Bar height as a fraction of `height`, 0–1. */
  value: number;
  color?: ThemeColor;
  opacity?: number;
}

export interface CCBarChartProps {
  data: CCBarChartDatum[];
  height?: number;
  gap?: number;
  style?: StyleProp<ViewStyle>;
  id?: string;
}

export const CCBarChart = ({ data, height = 90, gap = 8, style, id }: CCBarChartProps) => {
  const theme = useTheme();

  return (
    <CCRow id={id} align="flex-end" gap={gap} style={style}>
      {data.map((datum, index) => (
        <CCColumn key={index} flex={1} align="center" gap={6}>
          <View
            style={{
              width: '100%',
              height: Math.max(0, Math.min(1, datum.value)) * height,
              borderRadius: 6,
              backgroundColor: datum.color ?? theme.info,
              opacity: datum.opacity ?? 1,
            }}
          />
          <CCText type="caption" style={{ color: theme.textColor.secondary }}>{datum.label}</CCText>
        </CCColumn>
      ))}
    </CCRow>
  );
};
