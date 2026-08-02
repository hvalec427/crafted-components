import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { useTheme } from '../../tokens/ColorSchemaContext';
import { typography } from '../../tokens/typography';

export interface CCToastProps {
  message: string;
}

export const CCToast = ({ message }: CCToastProps) => {
  const theme = useTheme();

  return (
    <Text
      allowFontScaling={false}
      numberOfLines={2}
      style={[typography.labelLarge, styles.message, { backgroundColor: theme.text }]}>
      {message}
    </Text>
  );
};

const styles = StyleSheet.create({
  message: {
    color: '#FFFFFF',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 14,
    overflow: 'hidden',
    textAlign: 'center',
  },
});
