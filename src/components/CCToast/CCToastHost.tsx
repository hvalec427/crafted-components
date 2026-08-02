import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { CCToast } from './CCToast';
import { toastService, ToastConfig } from './toastService';

const ANIM_IN_MS = 280;
const ANIM_OUT_MS = 220;
const DEFAULT_DURATION = 2400;

interface CCToastHostProps {
  /** Distance from the bottom of the parent container. Default 0. */
  bottomOffset?: number;
}

export const CCToastHost = ({ bottomOffset = 0 }: CCToastHostProps) => {
  const [config, setConfig] = useState<ToastConfig | null>(null);
  const opacity = useRef(new Animated.Value(0)).current;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const animateOut = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    Animated.timing(opacity, { toValue: 0, duration: ANIM_OUT_MS, useNativeDriver: true }).start(() => {
      setConfig(null);
    });
  }, [opacity]);

  const animateIn = useCallback((next: ToastConfig) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    opacity.setValue(0);
    setConfig(next);
    Animated.timing(opacity, { toValue: 1, duration: ANIM_IN_MS, useNativeDriver: true }).start();
    timerRef.current = setTimeout(animateOut, next.duration ?? DEFAULT_DURATION);
  }, [animateOut, opacity]);

  useEffect(() => {
    const unsub = toastService._subscribe((next) => {
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
      pointerEvents="none"
      style={[styles.host, { bottom: bottomOffset, opacity }]}>
      <CCToast message={config.message} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  host: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 9999,
    elevation: 9999,
  },
});
