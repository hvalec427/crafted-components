import React from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import colors from '../../tokens/colors.json';
import { CCContainer } from '../CCLayout/CCContainer';

const style = StyleSheet.create({
  outerWrapper: {
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    overflow: 'hidden',
  },
  wrapper: {
    paddingHorizontal: 15,
  },
  wrapperHorizontal: {
    flexDirection: 'row',
  },
  wrapperVertical: {
    flexDirection: 'column',
    width: '100%',
  },
});

interface CCButtonGroupProps {
  children: React.ReactNode;
  extraComponent?: React.ReactNode;
  vertical?: boolean;
  backgroundColor?: keyof typeof colors;
  customStyle?: StyleProp<ViewStyle>;
  bgColor?: keyof typeof colors;
  noBottomPadding?: boolean;
  paddingTop?: number;
}

export const CCButtonGroup = (props: CCButtonGroupProps) => {
  const {
    paddingTop = 10,
    children,
    extraComponent,
    vertical = false,
    customStyle,
    bgColor = 'white',
    noBottomPadding = false,
  } = props;

  const safeAreaDimensions = useSafeAreaInsets();

  let bottompadding = safeAreaDimensions.bottom === 0 ? 20 : 0;
  if (noBottomPadding) {
    bottompadding = 0;
  }

  return (
    <CCContainer
      paddingBottom={bottompadding}
      marginTop={10}
      paddingTop={paddingTop}
      style={[
        style.outerWrapper,
        {
          backgroundColor: colors[bgColor],
        },
      ]}>
      {extraComponent}
      <CCContainer
        gap={15}
        style={[
          customStyle || style.wrapper,
          vertical ? style.wrapperVertical : style.wrapperHorizontal,
        ]}>
        {children}
      </CCContainer>
    </CCContainer>
  );
};
