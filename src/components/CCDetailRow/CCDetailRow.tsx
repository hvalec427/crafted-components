import React from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

import { CCRow } from '../CCLayout/CCRow';
import { CCText } from '../CCText/CCText';
import { useTheme } from '../../tokens/ColorSchemaContext';

export interface CCDetailRowProps {
  label: string;
  value: string;
  style?: StyleProp<ViewStyle>;
  id?: string;
}

const styles = StyleSheet.create({
  row: {
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
});

export const CCDetailRow = ({ label, value, style, id }: CCDetailRowProps) => {
  const theme = useTheme();

  return (
    <CCRow
      id={id}
      align="center"
      justify="space-between"
      style={[styles.row, { backgroundColor: theme.surface }, style]}>
      <CCText type="body" style={{ color: theme.textColor.secondary }}>{label}</CCText>
      <CCText type="bodySemiBold" color={theme.textColor.primary}>{value}</CCText>
    </CCRow>
  );
};
