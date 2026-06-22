import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';

import colors from '../../tokens/colors.json';
import { CCContainer } from '../CCLayout/CCContainer';

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
  bgColor?: keyof typeof colors;
  bgColorBottomSafeArea?: keyof typeof colors;
  disableTouch?: boolean;
  noTopSafeArea?: boolean;
  noBottomSafeArea?: boolean;
  theme?: 'light' | 'dark';
  bottomBarComponent?: React.ReactNode;
}

export const CCScreenWrapper = (props: CCScreenWrapperProps) => {
  const {
    children,
    header,
    theme = 'light',
    bgColor = 'white',
    bgColorBottomSafeArea = bgColor,
    disableTouch = false,
    noTopSafeArea = false,
    bottomBarComponent,
    noBottomSafeArea = !!bottomBarComponent || false,
  } = props;

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
        style={{ backgroundColor: colors[bgColor] }}>
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
            style={[
              style.bottomSafeArea,
              { backgroundColor: colors[bgColorBottomSafeArea] },
            ]}
          />
        )}
      </CCContainer>
    </>
  );
};
