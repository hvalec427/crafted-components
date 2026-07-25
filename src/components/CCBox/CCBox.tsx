import React from 'react';
import {
  DimensionValue,
  ImageBackground,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { FlexAlignType, JustifyContentType } from '../../utils/CCLayoutEnums';
import { useTheme } from '../../tokens/ColorSchemaContext';
import { testProps } from '../../utils/CCTestingId';
import type { ThemeColor } from '../../tokens/colorSchema';
import { CCBoxConstants } from './CCBoxConstants';

interface GradientBackground {
  gradient: string[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
}

interface ImageBackground_ {
  image: ImageSourcePropType;
  resizeMode?: ImageStyle['resizeMode'];
}

export type CCBoxBackground = ThemeColor | GradientBackground | ImageBackground_;

export interface CCBoxProps {
  children?: React.ReactNode;
  size?: 'small' | 'mid' | 'large';
  borderRadius?: number;
  borderColor?: string;
  borderWidth?: number;
  borderStyle?: 'solid' | 'dashed' | 'dotted';
  align?: FlexAlignType;
  justify?: JustifyContentType;
  padding?: DimensionValue;
  paddingTop?: DimensionValue;
  paddingBottom?: DimensionValue;
  paddingLeft?: DimensionValue;
  paddingRight?: DimensionValue;
  paddingHorizontal?: DimensionValue;
  paddingVertical?: DimensionValue;
  margin?: DimensionValue;
  marginTop?: DimensionValue;
  marginBottom?: DimensionValue;
  marginLeft?: DimensionValue;
  marginRight?: DimensionValue;
  marginHorizontal?: DimensionValue;
  marginVertical?: DimensionValue;
  flex?: number;
  background?: CCBoxBackground;
  style?: StyleProp<ViewStyle>;
  id?: string;
}

const defaultStyle = StyleSheet.create({
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
});

export const CCBox = (props: CCBoxProps) => {
  const {
    children,
    size,
    borderRadius,
    borderColor,
    borderWidth,
    borderStyle,
    align = 'center',
    justify = 'center',
    padding = 16,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    paddingHorizontal,
    paddingVertical,
    margin,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    marginHorizontal,
    marginVertical,
    flex,
    background,
    style,
    id,
  } = props;

  const schema = useTheme();

  const resolvedRadius = borderRadius ?? CCBoxConstants.borderRadius[size ?? 'large'];

  const needsOverflowHidden = !borderStyle || borderStyle === 'solid';

  const boxStyle = [
    defaultStyle.box,
    { borderRadius: resolvedRadius, alignItems: align, justifyContent: justify },
    needsOverflowHidden && { overflow: 'hidden' as const },
    ...(borderColor ? [{ borderColor, borderWidth: borderWidth ?? 1, borderStyle: borderStyle ?? 'solid' }] : []),
    ...(borderStyle && !borderColor ? [{ borderStyle }] : []),
    ...(padding !== undefined ? [{ padding }] : []),
    ...(paddingTop ? [{ paddingTop }] : []),
    ...(paddingBottom ? [{ paddingBottom }] : []),
    ...(paddingLeft ? [{ paddingLeft }] : []),
    ...(paddingRight ? [{ paddingRight }] : []),
    ...(paddingHorizontal ? [{ paddingHorizontal }] : []),
    ...(paddingVertical ? [{ paddingVertical }] : []),
    ...(margin ? [{ margin }] : []),
    ...(marginTop ? [{ marginTop }] : []),
    ...(marginBottom ? [{ marginBottom }] : []),
    ...(marginLeft ? [{ marginLeft }] : []),
    ...(marginRight ? [{ marginRight }] : []),
    ...(marginHorizontal ? [{ marginHorizontal }] : []),
    ...(marginVertical ? [{ marginVertical }] : []),
    ...(flex !== undefined ? [{ flex }] : []),
    style,
  ] as StyleProp<ViewStyle>;

  if (!background || typeof background === 'string') {
    return (
      <View
        {...testProps(id)}
        style={[boxStyle, { backgroundColor: background ?? schema.surface }]}>
        {children}
      </View>
    );
  }

  if ('gradient' in background) {
    return (
      <LinearGradient
        {...testProps(id)}
        colors={background.gradient}
        start={background.start ?? { x: 0, y: 0 }}
        end={background.end ?? { x: 1, y: 1 }}
        style={boxStyle}>
        {children}
      </LinearGradient>
    );
  }

  return (
    <ImageBackground
      {...testProps(id)}
      source={background.image}
      resizeMode={background.resizeMode ?? 'cover'}
      style={boxStyle}>
      {children}
    </ImageBackground>
  );
};
