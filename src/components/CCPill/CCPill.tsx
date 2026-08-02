import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useTheme } from '../../tokens/ColorSchemaContext';
import { typography } from '../../tokens/typography';

export interface CCPillProps {
  label: string;
  active?: boolean;
  onPress?: () => void;
  disabled?: boolean;
  id?: string;
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

export const CCPillConstants: { height: number; paddingHorizontal: number; borderRadius: number } = {
  height: 40, paddingHorizontal: 18, borderRadius: 20,
};

export const CCPill = ({ label, active = false, onPress, disabled = false, id }: CCPillProps) => {
  const theme = useTheme();
  const textStyle = typography.labelLarge;

  return (
    <Pressable
      testID={id}
      disabled={disabled || !onPress}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        {
          height: CCPillConstants.height,
          paddingHorizontal: CCPillConstants.paddingHorizontal,
          borderRadius: CCPillConstants.borderRadius,
          backgroundColor: active
            ? theme.primary
            : theme.surface,
          opacity: disabled ? 0.4 : pressed ? 0.75 : 1,
        },
      ]}>
      <Text
        allowFontScaling={false}
        numberOfLines={1}
        style={[
          textStyle,
          { color: active ? theme.textColor.inverse : theme.textColor.secondary },
        ]}>
        {label}
      </Text>
    </Pressable>
  );
};
