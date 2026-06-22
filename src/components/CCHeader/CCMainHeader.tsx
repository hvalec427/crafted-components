import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import colors from '../../tokens/colors.json';
import { CCText } from '../CCText/CCText';
import { CCIcon } from '../CCIcon/CCIcon';
import { CCRow } from '../CCLayout/CCRow';
import { CCPressableOpacity } from '../CCPressable/CCPressableOpacity';
import { CCContainer } from '../CCLayout/CCContainer';
import { icons } from '../../assets/icons';

interface CCHeaderAction {
  onPress: () => void;
  icon?: React.ReactNode;
}

const style = StyleSheet.create({
  safeArea: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    zIndex: 100,
  },
  wrapper: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  backIcon: {
    width: 20,
    height: 20,
    tintColor: colors.textColorDark,
    transform: [{ rotate: '180deg' }],
  },
  hidden: {
    opacity: 0,
  },
  floating: {
    position: 'absolute',
    zIndex: 11,
    width: '100%',
  },
  backButtonWrapper: {
    alignItems: 'flex-start',
    flexGrow: 1,
    flexBasis: 0,
  },
  middleWrapper: {
    flexGrow: 3,
    flexBasis: 0,
  },
  trailingComponentWrapper: {
    alignItems: 'flex-end',
    flexGrow: 1,
    flexBasis: 0,
  },
});

interface CCBackButtonProps {
  onBack: (() => void) | undefined;
  hidden?: boolean;
  children: React.ReactNode;
  id?: string;
}

export const CCBackButton = (props: CCBackButtonProps) => {
  const { onBack, hidden, children, id } = props;
  if (!onBack) {
    return null;
  }

  return (
    <CCContainer
      id={id ? id : 'header-back'}
      style={[hidden && style.hidden, style.backButtonWrapper]}>
      <CCPressableOpacity
        hitSlop={{ bottom: 10, left: 10, right: 20, top: 10 }}
        onPress={onBack}>
        {children}
      </CCPressableOpacity>
    </CCContainer>
  );
};

interface CCMainHeaderProps {
  label?: string;
  headerIcon?: React.ReactNode;
  onBack?: (() => void) | undefined;
  onBackText?: string;
  standalone?: boolean;
  actions?: CCHeaderAction[];
  floating?: boolean;
  opacity?: number;
  numberOfLines?: number;
  paddingHorizontal?: number;
  backgroundColor?: keyof typeof colors;
  children?: React.ReactNode;
  overlay?: React.ReactNode;
  id?: string;
}

export const CCMainHeader = (props: CCMainHeaderProps) => {
  const {
    label,
    headerIcon,
    onBack,
    onBackText,
    standalone = false,
    numberOfLines = 1,
    actions,
    backgroundColor = 'transparent',
    floating = false,
    opacity = 1,
    children,
    overlay = null,
    id,
  } = props;

  const safeAreaDimensions = useSafeAreaInsets();

  const trailingComponent = useMemo(() => {
    if (Array.isArray(actions) && actions.length > 0) {
      const a = actions[0];
      return (
        <CCPressableOpacity onPress={a.onPress} style={style.trailingComponentWrapper}>
          {a.icon ?? null}
        </CCPressableOpacity>
      );
    }
    return <CCContainer style={style.trailingComponentWrapper} />;
  }, [actions]);

  const backArrow = <CCIcon source={icons.arrow} style={style.backIcon} />;

  const topPadding = safeAreaDimensions.bottom > 0 ? 8 : 16;
  const body = (
    <CCRow
      justify="space-between"
      gap={10}
      style={[style.wrapper, { paddingTop: topPadding }]}>
      {onBackText && onBack && (
        <CCBackButton onBack={onBack}>
          <CCText numberOfLines={1} type="body" color="textColorDark">
            {onBackText}
          </CCText>
        </CCBackButton>
      )}
      {!onBackText && onBack && (
        <CCBackButton onBack={onBack}>
          {overlay}
          {backArrow}
        </CCBackButton>
      )}
      {!onBack && (
        <CCBackButton onBack={() => {}} hidden>
          {backArrow}
        </CCBackButton>
      )}

      <CCRow gap={10} flex={1} justify="center" style={style.middleWrapper}>
        {!!label && (
          <CCText
            id={id ? `header-label-${id}` : 'header-label'}
            color="textColorDark"
            numberOfLines={numberOfLines}
            flexShrink={1}
            textAlign="center"
            type="bodySemiBold">
            {label}
          </CCText>
        )}
        {headerIcon ?? null}
      </CCRow>

      {trailingComponent}
    </CCRow>
  );

  if (standalone) {
    return body;
  }

  return (
    <SafeAreaView
      edges={['top']}
      style={[
        style.safeArea,
        floating && style.floating,
        !!opacity && { opacity },
        backgroundColor && { backgroundColor: colors[backgroundColor] },
      ]}>
      {body}
      {children}
    </SafeAreaView>
  );
};
