import React from 'react';
import {
  DimensionValue,
  FlexStyle,
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import { FlexAlignType, JustifyContentType } from '../../utils/CCLayoutEnums';
import { testProps } from '../../utils/CCTestingId';

const containerStyle = StyleSheet.create({
  column: {
    flexDirection: 'column',
  },
});

export interface CCContainerProps {
  type?: 'column';
  flex?: number;
  flexGrow?: number;
  flexShrink?: number;
  children?: React.ReactNode | undefined;
  align?: FlexAlignType;
  justify?: JustifyContentType;
  alignSelf?: FlexAlignType;
  style?: StyleProp<ViewStyle>;
  margin?: DimensionValue;
  marginTop?: DimensionValue;
  marginLeft?: DimensionValue;
  marginRight?: DimensionValue;
  marginBottom?: DimensionValue;
  marginHorizontal?: DimensionValue;
  marginVertical?: DimensionValue;
  padding?: DimensionValue;
  paddingTop?: DimensionValue;
  paddingLeft?: DimensionValue;
  paddingRight?: DimensionValue;
  paddingBottom?: DimensionValue;
  paddingHorizontal?: DimensionValue;
  paddingVertical?: DimensionValue;
  gap?: number;
  columnGap?: number;
  rowGap?: number;
  flexBasis?: DimensionValue;
  pointerEvents?: 'auto' | 'none' | 'box-none' | 'box-only' | undefined;
  wrap?: FlexStyle['flexWrap'];
  onLayout?: (event: LayoutChangeEvent) => void;
  id?: string;
}

export const CCContainer = (props: CCContainerProps) => {
  const {
    onLayout,
    children,
    align,
    justify,
    alignSelf,
    style,
    flex = 0,
    flexBasis,
    flexGrow,
    flexShrink,
    padding,
    margin,
    marginTop,
    marginLeft,
    marginRight,
    marginBottom,
    marginHorizontal,
    marginVertical,
    paddingTop,
    paddingLeft,
    paddingRight,
    paddingBottom,
    paddingHorizontal,
    paddingVertical,
    pointerEvents,
    gap = 0,
    columnGap = 0,
    rowGap = 0,
    wrap = 'nowrap',
    id,
  } = props;

  return (
    <View
      {...testProps(id)}
      onLayout={e => {
        if (onLayout) {
          onLayout(e);
        }
      }}
      pointerEvents={pointerEvents}
      style={[
        containerStyle.column,
        {
          alignItems: align,
          justifyContent: justify,
          alignSelf,
          flexWrap: wrap,
        },
        ...(flex !== undefined ? [{ flex }] : []),
        ...(flexBasis !== undefined ? [{ flexBasis }] : []),
        ...(flexGrow !== undefined ? [{ flexGrow }] : []),
        ...(flexShrink !== undefined ? [{ flexShrink }] : []),
        ...(gap ? [{ gap }] : []),
        ...(columnGap ? [{ columnGap }] : []),
        ...(rowGap ? [{ rowGap }] : []),
        ...(marginHorizontal ? [{ marginHorizontal }] : []),
        ...(marginVertical ? [{ marginVertical }] : []),
        ...(marginTop ? [{ marginTop }] : []),
        ...(marginLeft ? [{ marginLeft }] : []),
        ...(marginRight ? [{ marginRight }] : []),
        ...(marginBottom ? [{ marginBottom }] : []),
        ...(paddingTop ? [{ paddingTop }] : []),
        ...(paddingLeft ? [{ paddingLeft }] : []),
        ...(paddingRight ? [{ paddingRight }] : []),
        ...(paddingBottom ? [{ paddingBottom }] : []),
        ...(paddingHorizontal ? [{ paddingHorizontal }] : []),
        ...(paddingVertical ? [{ paddingVertical }] : []),
        ...(padding ? [{ padding }] : []),
        ...(margin ? [{ margin }] : []),
        style,
      ]}>
      {children}
    </View>
  );
};
