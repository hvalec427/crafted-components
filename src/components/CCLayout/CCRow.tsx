import React from 'react';
import {
  DimensionValue,
  FlexStyle,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import { FlexAlignType, JustifyContentType } from '../../utils/CCLayoutEnums';
import { testProps } from '../../utils/CCTestingId';

const rowStyle = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
});

export interface CCRowProps {
  rowSpecificProp?: boolean;
  flex?: number;
  flexGrow?: number;
  flexShrink?: number;
  children: React.ReactNode;
  align?: FlexAlignType;
  alignSelf?: FlexAlignType;
  justify?: JustifyContentType;
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
  wrap?: FlexStyle['flexWrap'];
  gap?: number;
  rowGap?: number;
  flexBasis?: DimensionValue;
  columnGap?: number;
  pointerEvents?: 'auto' | 'none' | 'box-none' | 'box-only' | undefined;
  id?: string;
}

export const CCRow = (props: CCRowProps) => {
  const {
    children,
    align,
    alignSelf,
    justify,
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
    wrap = 'nowrap',
    gap = 0,
    rowGap = 0,
    columnGap = 0,
    pointerEvents,
    id,
  } = props;

  return (
    <View
      {...testProps(id)}
      pointerEvents={pointerEvents}
      style={[
        rowStyle.row,
        {
          alignItems: align,
          alignSelf,
          justifyContent: justify,
          flexWrap: wrap,
        },
        ...(flex ? [{ flex }] : []),
        ...(flexBasis ? [{ flexBasis }] : []),
        ...(flexGrow ? [{ flexGrow }] : []),
        ...(flexShrink ? [{ flexShrink }] : []),
        ...(gap ? [{ gap }] : []),
        ...(rowGap ? [{ rowGap }] : []),
        ...(columnGap ? [{ columnGap }] : []),
        ...(marginTop ? [{ marginTop }] : []),
        ...(marginLeft ? [{ marginLeft }] : []),
        ...(marginRight ? [{ marginRight }] : []),
        ...(marginBottom ? [{ marginBottom }] : []),
        ...(marginHorizontal ? [{ marginHorizontal }] : []),
        ...(marginVertical ? [{ marginVertical }] : []),
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
