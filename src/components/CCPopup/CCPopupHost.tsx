import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Modal, Pressable, StyleSheet, View } from 'react-native';
import { popupStore, PopupEntry } from './popupService';
import { useTheme } from '../../tokens/ColorSchemaContext';

const ANIM_IN_MS = 220;
const ANIM_OUT_MS = 180;

export interface CCPopupHostProps {
  /** Tapping the backdrop dismisses the popup. Default true. */
  dismissOnBackdrop?: boolean;
}

export const CCPopupHost = ({ dismissOnBackdrop = true }: CCPopupHostProps) => {
  const theme = useTheme();
  const [entry, setEntry] = useState<PopupEntry | null>(null);
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.92)).current;
  const isVisible = useRef(false);

  const animateOut = useCallback((onDone?: () => void) => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 0, duration: ANIM_OUT_MS, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 0.92, duration: ANIM_OUT_MS, useNativeDriver: true }),
    ]).start(() => {
      isVisible.current = false;
      setEntry(null);
      onDone?.();
    });
  }, [opacity, scale]);

  const animateIn = useCallback((next: PopupEntry) => {
    opacity.setValue(0);
    scale.setValue(0.92);
    isVisible.current = true;
    setEntry(next);
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: ANIM_IN_MS, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1, duration: ANIM_IN_MS, useNativeDriver: true }),
    ]).start();
  }, [opacity, scale]);

  useEffect(() => {
    const unsub = popupStore._subscribe((next) => {
      if (next === null) {
        animateOut();
      } else if (isVisible.current) {
        animateOut(() => animateIn(next));
      } else {
        animateIn(next);
      }
    });
    return unsub;
  }, [animateIn, animateOut]);

  const handleBackdropPress = useCallback(() => {
    if (dismissOnBackdrop) popupStore.hide();
  }, [dismissOnBackdrop]);

  const popups = popupStore.getRegistered();
  const content = entry != null ? popups[entry.route]?.(entry.payload) : null;

  return (
    <Modal
      visible={entry !== null}
      transparent
      animationType="none"
      onRequestClose={() => popupStore.hide()}
      statusBarTranslucent>
      <View style={styles.root}>
        <Animated.View style={[StyleSheet.absoluteFill, styles.backdrop, { opacity }]} />
        <Pressable style={StyleSheet.absoluteFill} onPress={handleBackdropPress} />
        <View style={styles.center} pointerEvents="box-none">
          <Animated.View
            style={[
              styles.container,
              { backgroundColor: theme.surface, transform: [{ scale }], opacity },
            ]}>
            {content}
          </Animated.View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backdrop: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  center: {
    width: '100%',
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
  },
});
