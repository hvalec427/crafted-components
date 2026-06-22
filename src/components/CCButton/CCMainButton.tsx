import React from 'react';
import { Animated, Pressable, StyleSheet } from 'react-native';

import { ActivityIndicator } from 'react-native';
import { CCText } from '../CCText/CCText';
import { CCContainer } from '../CCLayout/CCContainer';
import { CCRow } from '../CCLayout/CCRow';
import colors from '../../tokens/colors.json';

import {
  CCMainButtonColorsConstants,
  CCMainButtonConstants,
  CCMainButtonStyle,
} from './CCMainButtonStyle';

export enum CCMainButtonTypes {
  primary = 'primary',
  primaryLight = 'primaryLight',
  fail = 'fail',
  success = 'success',
  outline = 'outline',
  outlineDark = 'outline-dark',
  outlineError = 'outline-error',
  white = 'white',
}

export enum CCButtonSizesEnum {
  small = 'small',
  medium = 'medium',
  large = 'large',
}

export interface CCMainButtonProps {
  id?: string;
  text: string;
  loadingText?: string;
  loading?: boolean;
  loadingIndicator?: boolean;
  hideTextWhileLoading?: boolean;
  onPress: (() => void) | undefined;
  onPressWhenDisabled?: (() => void) | undefined;
  type: keyof typeof CCMainButtonTypes;
  textColor?: keyof typeof colors;
  disabled?: boolean;
  leadingComponent?:
    | React.ReactNode
    | ((tintColor: keyof typeof colors) => React.ReactNode);
  trailingComponent?:
    | React.ReactNode
    | ((tintColor: keyof typeof colors) => React.ReactNode);
  size?: CCButtonSizesEnum;
  flex?: number | string;
  flexGrow?: number | string;
  flexShrink?: number | string;
  progressWidth?: Animated.AnimatedInterpolation<string | number>;
}

const style = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  loadingIndicatorAndTextWrapper: {},
  loadingIndicatorAndTextWrapperHidden: {
    opacity: 0,
  },
  hidden: {
    opacity: 0,
  },
  onlyLoadingIndicatorWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  defaultWrapper: {
    borderRadius: 5,
    height: '100%',
    position: 'absolute',
    overflow: 'hidden',
    width: '100%',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  },
  progressBarWrapper: {
    height: '100%',
    position: 'absolute',
    overflow: 'hidden',
    width: '100%',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    borderRadius: 5,
  },
});

export const CCMainButton = (props: CCMainButtonProps) => {
  const {
    text,
    onPress,
    onPressWhenDisabled,
    disabled,
    type = CCMainButtonTypes.primary,
    textColor,
    id,
    loading = false,
    loadingText,
    loadingIndicator = false,
    hideTextWhileLoading = false,
    leadingComponent,
    trailingComponent,
    flex = 0,
    flexGrow = 0,
    flexShrink = 0,
    size = CCButtonSizesEnum.large,
    progressWidth = '0%',
  } = props;

  const hideText = loading && hideTextWhileLoading;

  const currentHitSlop = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  const onButtonPress = () => {
    if (disabled && onPressWhenDisabled) {
      onPressWhenDisabled();
    } else if (!disabled && onPress) {
      onPress();
    }
  };

  return (
    <>
      <Pressable
        testID={id}
        id={id}
        disabled={(disabled && !onPressWhenDisabled) || loading}
        hitSlop={currentHitSlop}
        // @ts-ignore: Unreachable code error
        style={({ pressed }) => {
          const isPressed = pressed && !!onPress && !disabled;

          return [
            style.wrapper,
            {
              height: CCMainButtonConstants[size]?.height,
              minHeight: CCMainButtonConstants[size]?.height,
            },
            flex !== 0 && { flex },
            flexGrow !== 0 && { flexGrow },
            flexShrink !== 0 && { flexShrink },
            CCMainButtonStyle[`${type}Wrapper`],
            isPressed && CCMainButtonStyle[`${type}PressedWrapper`],
            (disabled || loading) && CCMainButtonStyle[`${type}DisabledWrapper`],
          ];
        }}
        onPress={onButtonPress}>
        {({ pressed }) => {
          const isPressed = pressed && !!onPress && !disabled;

          let tintColor = CCMainButtonColorsConstants[type]?.mainTextColor;
          if (isPressed) {
            tintColor = CCMainButtonColorsConstants[type]?.pressedTextColor;
          }
          if (disabled || loading) {
            tintColor = CCMainButtonColorsConstants[type]?.disabledTextColor;
          }

          const leadingItem =
            typeof leadingComponent === 'function'
              ? leadingComponent(tintColor)
              : leadingComponent;

          const trailingItem =
            typeof trailingComponent === 'function'
              ? trailingComponent(tintColor)
              : trailingComponent;

          return (
            <>
              <Animated.View
                style={[
                  style.progressBarWrapper,
                  CCMainButtonStyle[`${type}WrapperProgress`],
                  { width: progressWidth },
                ]}
              />
              <CCContainer
                style={{ height: '100%', justifyContent: 'center' }}
                paddingHorizontal={
                  CCMainButtonConstants[size]?.paddingHorizontal
                }>
                {loadingIndicator && hideTextWhileLoading && loading && (
                  <CCContainer style={style.onlyLoadingIndicatorWrapper}>
                    <ActivityIndicator size="small" color={colors.white} />
                  </CCContainer>
                )}
                <CCRow gap={5} align={'center'} justify={'center'}>
                  {loadingIndicator && !hideTextWhileLoading && loading && (
                    <CCContainer style={style.loadingIndicatorAndTextWrapper}>
                      <ActivityIndicator size="small" color={colors.white} />
                    </CCContainer>
                  )}

                  {leadingItem}

                  <CCText
                    flexShrink={1}
                    type="buttonMedium"
                    numberOfLines={1}
                    style={[
                      { textAlign: 'center' },
                      CCMainButtonStyle[`${type}Text`],
                      isPressed && CCMainButtonStyle[`${type}PressedText`],
                      (disabled || loading) &&
                        CCMainButtonStyle[`${type}DisabledText`],
                      textColor && { color: colors[textColor] },
                      hideText && loading && style.hidden,
                    ]}>
                    {loading && loadingText ? loadingText : text}
                  </CCText>

                  {trailingItem}

                  {loadingIndicator && !hideTextWhileLoading && loading && (
                    <CCContainer
                      style={[
                        style.loadingIndicatorAndTextWrapper,
                        style.loadingIndicatorAndTextWrapperHidden,
                      ]}>
                      <ActivityIndicator size="small" color={colors.white} />
                    </CCContainer>
                  )}
                </CCRow>
              </CCContainer>
            </>
          );
        }}
      </Pressable>
    </>
  );
};
