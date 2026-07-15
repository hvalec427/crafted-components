import React from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';

import { typography } from '../../tokens/typography';
import { testProps } from '../../utils/CCTestingId';
import { useColorSchema } from '../../tokens/ColorSchemaContext';

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
  /** Hex color string — overrides the schema text color */
  color?: string;
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

  const schema = useColorSchema();

  return (
    <Text
      {...testProps(id)}
      allowFontScaling={false}
      onPress={onPress ? onPress : undefined}
      {...(numberOfLines && { numberOfLines })}
      style={[
        { color: schema.textColor.primary },
        type && { ...typography[type] },
        color && { color },
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
