import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useTheme } from '../../tokens/ColorSchemaContext';
import { typography } from '../../tokens/typography';

export type CCPillSize = 'small' | 'large';

export interface CCPillProps {
  label: string;
  active?: boolean;
  onPress?: () => void;
  size?: CCPillSize;
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

const sizes: Record<CCPillSize, { height: number; paddingHorizontal: number; borderRadius: number }> = {
  small:  { height: 28, paddingHorizontal: 12, borderRadius: 14 },
  large:  { height: 40, paddingHorizontal: 18, borderRadius: 20 },
};

export const CCPill = ({ label, active = false, onPress, size = 'large', disabled = false, id }: CCPillProps) => {
  const schema = useTheme();
  const s = sizes[size];
  const textStyle = size === 'small' ? typography.label : typography.labelLarge;

  return (
    <Pressable
      testID={id}
      disabled={disabled || !onPress}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        {
          height: s.height,
          paddingHorizontal: s.paddingHorizontal,
          borderRadius: s.borderRadius,
          backgroundColor: active
            ? schema.primary
            : schema.surface,
          opacity: disabled ? 0.4 : pressed ? 0.75 : 1,
        },
      ]}>
      <Text
        allowFontScaling={false}
        numberOfLines={1}
        style={[
          textStyle,
          { color: active ? schema.textColor.inverse : schema.textColor.secondary },
        ]}>
        {label}
      </Text>
    </Pressable>
  );
};
