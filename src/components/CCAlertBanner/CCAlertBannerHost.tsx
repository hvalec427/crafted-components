import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { CCAlertBanner } from './CCAlertBanner';
import { alertBannerService, AlertBannerConfig } from './alertBannerService';

const SLIDE_DISTANCE = 80;
const ANIM_IN_MS = 280;
const ANIM_OUT_MS = 220;
const DEFAULT_DURATION = 3000;

interface CCAlertBannerHostProps {
  /** Distance from the top of the parent container. Default 0. */
  topOffset?: number;
}

export const CCAlertBannerHost = ({ topOffset = 0 }: CCAlertBannerHostProps) => {
  const [config, setConfig] = useState<AlertBannerConfig | null>(null);
  const translateY = useRef(new Animated.Value(-SLIDE_DISTANCE)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isVisible = useRef(false);

  const animateOut = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    Animated.parallel([
      Animated.timing(translateY, { toValue: -SLIDE_DISTANCE, duration: ANIM_OUT_MS, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 0, duration: ANIM_OUT_MS, useNativeDriver: true }),
    ]).start(() => {
      isVisible.current = false;
      setConfig(null);
    });
  }, [opacity, translateY]);

  const animateIn = useCallback((next: AlertBannerConfig) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    translateY.setValue(-SLIDE_DISTANCE);
    opacity.setValue(0);
    isVisible.current = true;
    setConfig(next);
    Animated.parallel([
      Animated.timing(translateY, { toValue: 0, duration: ANIM_IN_MS, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 1, duration: ANIM_IN_MS, useNativeDriver: true }),
    ]).start();
    timerRef.current = setTimeout(animateOut, next.duration ?? DEFAULT_DURATION);
  }, [animateOut, opacity, translateY]);

  useEffect(() => {
    const unsub = alertBannerService._subscribe((next) => {
      if (next === null) {
        animateOut();
      } else {
        animateIn(next);
      }
    });
    return () => {
      unsub();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [animateIn, animateOut]);

  if (!config) return null;

  return (
    <Animated.View
      style={[
        styles.host,
        { top: topOffset, transform: [{ translateY }], opacity },
      ]}>
      <CCAlertBanner
        message={config.message}
        type={config.type}
        onDismiss={animateOut}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  host: {
    position: 'absolute',
    left: 16,
    right: 16,
    zIndex: 9999,
    elevation: 9999,
  },
});
