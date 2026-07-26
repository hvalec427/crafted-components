import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../tokens/ColorSchemaContext';
import { typography } from '../../tokens/typography';
import type { AlertBannerType } from './alertBannerService';

export interface CCAlertBannerProps {
  message: string;
  type: AlertBannerType;
  onDismiss?: () => void;
}

export const CCAlertBanner = ({ message, type, onDismiss }: CCAlertBannerProps) => {
  const theme = useTheme();
  const bg = type === 'success' ? theme.success : theme.error;

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      <View style={styles.iconCircle}>
        <Text allowFontScaling={false} style={styles.iconText}>
          {type === 'success' ? '✓' : '!'}
        </Text>
      </View>
      <Text
        allowFontScaling={false}
        numberOfLines={1}
        style={[typography.labelLarge, styles.message]}>
        {message}
      </Text>
      {onDismiss && (
        <Pressable onPress={onDismiss} hitSlop={12} style={styles.closeBtn}>
          <Text allowFontScaling={false} style={styles.closeText}>×</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 10,
  },
  iconCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.28)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 16,
  },
  message: {
    flex: 1,
    color: '#FFFFFF',
  },
  closeBtn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    color: '#FFFFFF',
    fontSize: 20,
    lineHeight: 22,
    fontWeight: '400',
  },
});
