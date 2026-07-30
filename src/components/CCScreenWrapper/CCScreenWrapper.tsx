import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';

import { CCContainer } from '../CCLayout/CCContainer';
import { useTheme } from '../../tokens/ColorSchemaContext';
import type { ThemeColor } from '../../tokens/colorSchema';

const isColorDark = (color: string): boolean => {
  const hex = color.replace('#', '');
  const full = hex.length === 3
    ? hex.split('').map(c => c + c).join('')
    : hex;
  const r = parseInt(full.substring(0, 2), 16);
  const g = parseInt(full.substring(2, 4), 16);
  const b = parseInt(full.substring(4, 6), 16);
  return 0.299 * r + 0.587 * g + 0.114 * b < 128;
};

const style = StyleSheet.create({
  safeArea: {
    zIndex: 10,
    flex: 1,
  },
  bottomSafeArea: {
    flex: 0,
  },
});

interface CCScreenWrapperProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  bgColor?: ThemeColor;
  bgColorBottomSafeArea?: ThemeColor;
  disableTouch?: boolean;
  noTopSafeArea?: boolean;
  noBottomSafeArea?: boolean;
  theme?: 'light' | 'dark';
  bottomBarComponent?: React.ReactNode;
}

export const CCScreenWrapper = (props: CCScreenWrapperProps) => {
  const appTheme = useTheme();

  const bgColor = props.bgColor ?? appTheme.screenWrapper.background;

  const {
    children,
    header,
    theme = isColorDark(bgColor) ? 'dark' : 'light',
    disableTouch = false,
    noTopSafeArea = false,
    bottomBarComponent,
  } = props;
  const bgColorBottomSafeArea = props.bgColorBottomSafeArea ?? bgColor;
  const noBottomSafeArea = props.noBottomSafeArea ?? (!!bottomBarComponent || false);

  const safeAreaSides = ['left', 'right'] as Edge[];
  if (!header && !noTopSafeArea) {
    safeAreaSides.push('top');
  }

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={theme === 'light' ? 'dark-content' : 'light-content'}
      />
      <CCContainer
        flex={1}
        pointerEvents={disableTouch ? 'none' : 'auto'}
        style={{ backgroundColor: bgColor }}>
        {header}
        <SafeAreaView
          edges={safeAreaSides}
          style={[style.safeArea]}
          pointerEvents="box-none">
          <CCContainer flex={1} pointerEvents="box-none">
            {children}
          </CCContainer>
        </SafeAreaView>
        {bottomBarComponent}
        {!noBottomSafeArea && (
          <SafeAreaView
            edges={['bottom']}
            style={[style.bottomSafeArea, { backgroundColor: bgColorBottomSafeArea }]}
          />
        )}
      </CCContainer>
    </>
  );
};
