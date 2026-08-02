import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { CCText } from '../CCText/CCText';
import { useTheme } from '../../tokens/ColorSchemaContext';
import type { ThemeColor } from '../../tokens/colorSchema';

export interface CCProgressRingProps {
  /** 0–1 */
  progress: number;
  size?: number;
  thickness?: number;
  progressColor?: ThemeColor;
  trackColor?: ThemeColor;
  centerColor?: ThemeColor;
  label?: string;
  style?: StyleProp<ViewStyle>;
  id?: string;
}

// No SVG dependency in this library, so the ring is drawn with two rotated
// half-circles clipped to the left/right halves of the circle — the classic
// CSS pie-chart technique, adapted with RN's transformOrigin support.
export const CCProgressRing = ({
  progress,
  size = 80,
  thickness = 10,
  progressColor,
  trackColor,
  centerColor,
  label,
  style,
  id,
}: CCProgressRingProps) => {
  const theme = useTheme();
  const half = size / 2;
  const innerSize = size - thickness * 2;
  const angle = Math.max(0, Math.min(1, progress)) * 360;
  const rightRotation = Math.min(angle, 180) - 180;
  const leftRotation = angle <= 180 ? -180 : Math.min(angle, 360) - 360;
  const fillColor = progressColor ?? theme.primary;

  return (
    <View
      testID={id}
      style={[
        styles.ring,
        { width: size, height: size, borderRadius: half, backgroundColor: trackColor ?? theme.border },
        style,
      ]}>
      <View style={[styles.clip, { width: half, height: size, left: half }]}>
        <View
          style={[
            styles.half,
            {
              width: size,
              height: size,
              left: -half,
              borderTopRightRadius: half,
              borderBottomRightRadius: half,
              backgroundColor: fillColor,
              transform: [{ rotate: `${rightRotation}deg` }],
            },
          ]}
        />
      </View>
      <View style={[styles.clip, { width: half, height: size, left: 0 }]}>
        <View
          style={[
            styles.half,
            {
              width: size,
              height: size,
              borderTopLeftRadius: half,
              borderBottomLeftRadius: half,
              backgroundColor: fillColor,
              transform: [{ rotate: `${leftRotation}deg` }],
            },
          ]}
        />
      </View>
      <View
        style={[
          styles.center,
          {
            width: innerSize,
            height: innerSize,
            borderRadius: innerSize / 2,
            top: thickness,
            left: thickness,
            backgroundColor: centerColor ?? theme.surface,
          },
        ]}>
        {label ? (
          <CCText type="label" color={theme.textColor.primary}>
            {label}
          </CCText>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ring: {
    overflow: 'hidden',
  },
  clip: {
    position: 'absolute',
    top: 0,
    overflow: 'hidden',
  },
  half: {
    position: 'absolute',
    top: 0,
  },
  center: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
