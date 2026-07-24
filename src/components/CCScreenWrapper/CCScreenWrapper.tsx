import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';

import { CCContainer } from '../CCLayout/CCContainer';
import { useColorSchema } from '../../tokens/ColorSchemaContext';
import type { ThemeColor } from '../../tokens/colorSchema';

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
  const schema = useColorSchema();

  const {
    children,
    header,
    theme = 'light',
    disableTouch = false,
    noTopSafeArea = false,
    bottomBarComponent,
  } = props;

  const bgColor = props.bgColor ?? schema.screenWrapper.background;
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
