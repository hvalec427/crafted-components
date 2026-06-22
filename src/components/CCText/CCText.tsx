import React from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';

import colors from '../../tokens/colors.json';
import { typography } from '../../tokens/typography';
import { testProps } from '../../utils/CCTestingId';

export type TextAlign =
  | 'auto'
  | 'left'
  | 'right'
  | 'center'
  | 'justify'
  | undefined;

export interface CCTextProps {
  children?: string | React.ReactNode | undefined;
  type?: keyof typeof typography;
  style?: StyleProp<TextStyle>;
  color?: keyof typeof colors;
  flex?: number;
  flexGrow?: number;
  flexShrink?: number;
  numberOfLines?: number;
  textAlign?: TextAlign;
  onPress?: () => void;
  textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase' | undefined;
  id?: string;
  accessibilityLabel?: string;
}

export const CCText = (props: CCTextProps) => {
  const {
    children,
    onPress,
    type,
    color,
    style,
    textAlign = 'left',
    flex = 0,
    flexGrow,
    flexShrink,
    numberOfLines,
    textTransform,
    id,
  } = props;

  return (
    <Text
      {...testProps(id)}
      allowFontScaling={false}
      onPress={onPress ? onPress : undefined}
      {...(numberOfLines && { numberOfLines })}
      style={[
        type && { ...typography[type] },
        color && { color: colors[color] },
        textAlign && { textAlign },
        ...(flex ? [{ flex }] : []),
        ...(flexGrow ? [{ flexGrow }] : []),
        ...(flexShrink ? [{ flexShrink }] : []),
        ...(textTransform ? [{ textTransform }] : []),
        style,
      ]}>
      {children}
    </Text>
  );
};
