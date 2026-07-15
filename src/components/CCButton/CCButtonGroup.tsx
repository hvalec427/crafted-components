import React from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CCContainer } from '../CCLayout/CCContainer';
import { useColorSchema } from '../../tokens/ColorSchemaContext';

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
  /** Background color — accepts a hex string or omit to use the schema surface color */
  bgColor?: string;
  customStyle?: StyleProp<ViewStyle>;
  noBottomPadding?: boolean;
  paddingTop?: number;
}

export const CCButtonGroup = (props: CCButtonGroupProps) => {
  const schema = useColorSchema();

  const {
    paddingTop = 10,
    children,
    extraComponent,
    vertical = false,
    customStyle,
    noBottomPadding = false,
  } = props;

  const bgColor = props.bgColor ?? schema.components.buttonGroup.background;

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
      style={[style.outerWrapper, { backgroundColor: bgColor }]}>
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
