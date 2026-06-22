import React from 'react';
import { ImageSourcePropType, StyleSheet, View, ViewStyle } from 'react-native';

import { CCIcon } from '../CCIcon/CCIcon';
import { CCPressableOpacity } from '../CCPressable/CCPressableOpacity';
import { testProps } from '../../utils/CCTestingId';

import { RoundButtonSizes, RoundButtonStyle } from './CCRoundButtonStyle';

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

  return (
    <View {...testProps(id)} pointerEvents="box-none">
      <CCPressableOpacity
        disabled={disabled}
        onPress={onPress}
        style={[
          RoundButtonStyle[`${type}Wrapper` as keyof typeof RoundButtonStyle],
          RoundButtonSizes[`${size}` as keyof typeof RoundButtonSizes],
          disabled &&
            RoundButtonStyle[
              `${type}WrapperDisabled` as keyof typeof RoundButtonStyle
            ],
          buttonStyle.wrapper,
          style,
        ]}>
        {!!icon && (
          <CCIcon
            source={icon}
            style={[
              buttonStyle.icon,
              RoundButtonStyle[`${type}Tint` as keyof typeof RoundButtonStyle],
            ]}
          />
        )}
      </CCPressableOpacity>
    </View>
  );
};
