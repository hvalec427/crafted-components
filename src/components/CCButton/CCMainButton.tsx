import React, { useMemo } from 'react';
import { Animated, Pressable, StyleSheet, View } from 'react-native';

import { ActivityIndicator } from 'react-native';
import { CCText } from '../CCText/CCText';
import { CCContainer } from '../CCLayout/CCContainer';
import { CCRow } from '../CCLayout/CCRow';
import { useTheme } from '../../tokens/ColorSchemaContext';

import {
  makeMainButtonColors,
  makeMainButtonStyle,
  CCMainButtonConstants,
  CCMainButtonShadowConstants,
} from './CCMainButtonStyle';
import type { ThemeColor } from '../../tokens/colorSchema';

export enum CCMainButtonTypes {
  primary = 'primary',
  primaryLight = 'primaryLight',
  fail = 'fail',
  success = 'success',
  outline = 'outline',
  outlineDark = 'outline-dark',
  outlineError = 'outline-error',
  white = 'white',
  secondary = 'secondary',
}

export enum CCButtonSizesEnum {
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
  textColor?: ThemeColor;
  disabled?: boolean;
  leading?: React.ReactNode | ((tintColor: string) => React.ReactNode);
  trailing?: React.ReactNode | ((tintColor: string) => React.ReactNode);
  size?: CCButtonSizesEnum;
  flex?: number | string;
  flexGrow?: number | string;
  flexShrink?: number | string;
  progressWidth?: Animated.AnimatedInterpolation<string | number>;
}

const layoutStyle = StyleSheet.create({
  outer: {
    position: 'relative',
  },
  shadowLayer: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
  wrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
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
    leading,
    trailing,
    flex = 0,
    flexGrow = 0,
    flexShrink = 0,
    size = CCButtonSizesEnum.large,
    progressWidth = '0%',
  } = props;

  const theme = useTheme();
  const CCMainButtonStyle = useMemo(() => makeMainButtonStyle(theme), [theme]);
  const CCMainButtonColorsConstants = useMemo(() => makeMainButtonColors(theme), [theme]);

  const hideText = loading && hideTextWhileLoading;

  const currentHitSlop = { top: 0, bottom: 0, left: 0, right: 0 };

  const faceHeight = CCMainButtonConstants[size]?.height;
  const borderRadius = CCMainButtonConstants[size]?.borderRadius;
  // Only the primary type gets the elevated "pressed-3D" treatment; other
  // types render flat (restDepth 0 collapses the shadow layer under the face).
  const isPrimary = type === CCMainButtonTypes.primary;
  const restDepth = isPrimary ? CCMainButtonShadowConstants.restDepth : 0;
  const pressedDepth = isPrimary ? CCMainButtonShadowConstants.pressedDepth : 0;

  const onButtonPress = () => {
    if (disabled && onPressWhenDisabled) {
      onPressWhenDisabled();
    } else if (!disabled && onPress) {
      onPress();
    }
  };

  return (
    <>
      {/* @ts-ignore: flex/flexGrow/flexShrink accept string values (e.g. '1') same as upstream Pressable usage */}
      <View
        style={[
          layoutStyle.outer,
          { height: faceHeight + restDepth },
          flex !== 0 && { flex },
          flexGrow !== 0 && { flexGrow },
          flexShrink !== 0 && { flexShrink },
        ]}>
        {restDepth > 0 && (
          <View
            style={[
              layoutStyle.shadowLayer,
              {
                top: restDepth,
                height: faceHeight,
                borderRadius,
                backgroundColor: theme.button.primaryDark,
              },
            ]}
          />
        )}
        <Pressable
          testID={id}
          id={id}
          disabled={(disabled && !onPressWhenDisabled) || loading}
          hitSlop={currentHitSlop}
          // @ts-ignore: Unreachable code error
          style={({ pressed }) => {
            const isPressed = pressed && !!onPress && !disabled;

            return [
              layoutStyle.wrapper,
              {
                top: isPressed ? restDepth - pressedDepth : 0,
                height: faceHeight,
                borderRadius,
              },
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
            typeof leading === 'function'
              ? leading(tintColor)
              : leading;

          const trailingItem =
            typeof trailing === 'function'
              ? trailing(tintColor)
              : trailing;

          return (
            <>
              <Animated.View
                style={[
                  layoutStyle.progressBarWrapper,
                  CCMainButtonStyle[`${type}WrapperProgress`],
                  { width: progressWidth },
                ]}
              />
              <CCContainer
                style={{ height: '100%', justifyContent: 'center' }}
                paddingHorizontal={CCMainButtonConstants[size]?.paddingHorizontal}>
                {loadingIndicator && hideTextWhileLoading && loading && (
                  <CCContainer style={layoutStyle.onlyLoadingIndicatorWrapper}>
                    <ActivityIndicator size="small" color={theme.button.loadingIndicator} />
                  </CCContainer>
                )}
                <CCRow gap={5} align={'center'} justify={'center'}>
                  {loadingIndicator && !hideTextWhileLoading && loading && (
                    <CCContainer style={layoutStyle.loadingIndicatorAndTextWrapper}>
                      <ActivityIndicator size="small" color={theme.button.loadingIndicator} />
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
                      (disabled || loading) && CCMainButtonStyle[`${type}DisabledText`],
                      textColor && { color: textColor },
                      hideText && loading && layoutStyle.hidden,
                    ]}>
                    {loading && loadingText ? loadingText : text}
                  </CCText>

                  {trailingItem}

                  {loadingIndicator && !hideTextWhileLoading && loading && (
                    <CCContainer
                      style={[
                        layoutStyle.loadingIndicatorAndTextWrapper,
                        layoutStyle.loadingIndicatorAndTextWrapperHidden,
                      ]}>
                      <ActivityIndicator size="small" color={theme.button.loadingIndicator} />
                    </CCContainer>
                  )}
                </CCRow>
              </CCContainer>
            </>
          );
        }}
        </Pressable>
      </View>
    </>
  );
};
