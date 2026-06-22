import React from 'react';
import { ImageSourcePropType, ImageStyle, StyleProp, StyleSheet, ViewStyle } from 'react-native';

import colors from '../../tokens/colors.json';
import { CCText, TextAlign } from '../CCText/CCText';
import { CCIcon } from '../CCIcon/CCIcon';
import { CCRow, CCRowProps } from '../CCLayout/CCRow';
import { CCPressableOpacity } from '../CCPressable/CCPressableOpacity';
import { typography } from '../../tokens/typography';

import { CCTextButtonConstants } from './CCTextButtonStyles';

const buttonStyle = StyleSheet.create({
  opacity05: {
    opacity: 0.5,
  },
});

export enum CCTextButtonSizesEnum {
  auto = 'auto',
  small = 'small',
  medium = 'medium',
  large = 'large',
}

interface CCTextButtonProps {
  text: string;
  onPress: () => void;
  disabled?: boolean;
  icon?: ImageSourcePropType;
  style?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<ImageStyle>;
  textType?: keyof typeof typography;
  alignment?: 'start' | 'center' | 'end';
  textColor?: keyof typeof colors;
  numberOfLines?: number;
  size?: CCTextButtonSizesEnum;
  addPadding?: boolean;
}

const textButtonStyle = StyleSheet.create({
  text: {},
  icon: {
    marginRight: 5,
  },
  wrapper: {
    justifyContent: 'center',
  },
});

export const CCTextButton = (props: CCTextButtonProps) => {
  const {
    text,
    onPress,
    disabled,
    icon,
    style,
    iconStyle,
    textType = 'buttonMedium',
    alignment = 'center',
    textColor = 'primaryBlue',
    numberOfLines,
    size = CCTextButtonSizesEnum.medium,
    addPadding = false,
  } = props;

  let rowAlignment: CCRowProps['justify'];
  let textAlignment: TextAlign;
  switch (alignment) {
    case 'start':
      rowAlignment = 'flex-start';
      textAlignment = 'left';
      break;
    case 'center':
      rowAlignment = 'center';
      textAlignment = 'center';
      break;
    case 'end':
      rowAlignment = 'flex-end';
      textAlignment = 'right';
      break;
  }

  let padding;
  if (!!addPadding && CCTextButtonConstants[size]?.paddingHorizontal) {
    padding = CCTextButtonConstants[size]?.paddingHorizontal;
  }

  return (
    <CCPressableOpacity
      style={[
        textButtonStyle.wrapper,
        { height: CCTextButtonConstants[size]?.height },
        {
          padding,
        },
        style,
      ]}
      disabled={disabled}
      onPress={() => onPress()}>
      <CCRow align="center" justify={rowAlignment}>
        {icon && (
          <CCIcon
            source={icon}
            style={[
              { tintColor: colors[textColor] },
              textButtonStyle.icon,
              iconStyle,
            ]}
          />
        )}
        <CCText
          textAlign={textAlignment}
          type={textType}
          numberOfLines={numberOfLines}
          style={[
            { color: colors[textColor] },
            textButtonStyle.text,
            disabled ? buttonStyle.opacity05 : {},
          ]}>
          {text}
        </CCText>
      </CCRow>
    </CCPressableOpacity>
  );
};
