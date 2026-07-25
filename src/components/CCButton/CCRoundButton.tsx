import React, { useMemo } from 'react';
import { ImageSourcePropType, StyleSheet, View, ViewStyle } from 'react-native';

import { CCIcon } from '../CCIcon/CCIcon';
import { CCPressableOpacity } from '../CCPressable/CCPressableOpacity';
import { testProps } from '../../utils/CCTestingId';
import { useTheme } from '../../tokens/ColorSchemaContext';

import { RoundButtonSizes, makeRoundButtonStyle } from './CCRoundButtonStyle';

const buttonStyle = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 100,
  },
  icon: {
    width: 15,
    height: 15,
  },
});

export enum CCRoundButtonTypes {
  primary = 'primary',
  primaryOutlined = 'primaryOutlined',
  errorOutlined = 'errorOutlined',
  outlinedDark = 'outlinedDark',
  primaryLight = 'primaryLight',
}

export enum CCRoundButtonSizesEnum {
  small = 'small',
  medium = 'medium',
  large = 'large',
}

interface CCRoundButtonProps {
  onPress: (() => void) | undefined;
  type: keyof typeof CCRoundButtonTypes;
  icon?: ImageSourcePropType;
  style?: ViewStyle;
  size?: CCRoundButtonSizesEnum;
  disabled?: boolean;
  id?: string;
}

export const CCRoundButton = (props: CCRoundButtonProps) => {
  const {
    onPress,
    type = CCRoundButtonTypes.primary,
    icon,
    style,
    size = CCRoundButtonSizesEnum.medium,
    disabled = false,
    id,
  } = props;

  const schema = useTheme();
  const RoundButtonStyle = useMemo(() => makeRoundButtonStyle(schema), [schema]);

  return (
    <View {...testProps(id)} pointerEvents="box-none">
      <CCPressableOpacity
        disabled={disabled}
        onPress={onPress}
        style={[
          RoundButtonStyle[`${type}Wrapper`] as ViewStyle,
          RoundButtonSizes[`${size}` as keyof typeof RoundButtonSizes],
          disabled &&
            (RoundButtonStyle[`${type}WrapperDisabled`] as ViewStyle),
          buttonStyle.wrapper,
          style,
        ]}>
        {!!icon && (
          <CCIcon
            source={icon}
            style={[
              buttonStyle.icon,
              RoundButtonStyle[`${type}Tint`],
            ]}
          />
        )}
      </CCPressableOpacity>
    </View>
  );
};
