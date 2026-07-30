import React, { RefObject, useState } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import type { ThemeColor } from '../../tokens/colorSchema';

const style = StyleSheet.create({
  scroller: {
    flexGrow: 1,
  },
});

interface CCScrollerProps {
  children: React.ReactNode;
  avoidKeyboard?: boolean;
  paddingTop?: number;
  paddingBottom?: number;
  bgColor?: ThemeColor;
  refetch?: Function;
  fetchMore?: Function;
  scrollViewRef?: RefObject<ScrollView>;
  extraHeight?: number;
}

export const CCScroller = (props: CCScrollerProps) => {
  const {
    children,
    avoidKeyboard,
    refetch,
    fetchMore,
    paddingTop,
    paddingBottom,
    bgColor,
    scrollViewRef,
    extraHeight = 0,
  } = props;
  const [refetching, setRefetching] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [
    hasTriggeredFetchForCurrentSession,
    setHasTriggeredFetchForCurrentSession,
  ] = useState(false);

  const onRefetch = async () => {
    setRefetching(true);
    if (refetch) {
      await refetch();
    }
    setRefetching(false);
  };

  const handleScroll = async (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    if (!fetchMore || isFetchingMore) return;

    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const distanceFromEnd =
      contentSize.height - layoutMeasurement.height - contentOffset.y;

    const isNearBottom = distanceFromEnd < 100;

    if (isNearBottom && !hasTriggeredFetchForCurrentSession) {
      setHasTriggeredFetchForCurrentSession(true);
      setIsFetchingMore(true);
      try {
        await fetchMore();
      } finally {
        setIsFetchingMore(false);
      }
    } else if (!isNearBottom && hasTriggeredFetchForCurrentSession) {
      setHasTriggeredFetchForCurrentSession(false);
    }
  };

  const commonProps = {
    showsVerticalScrollIndicator: false,
    refreshControl: refetch ? (
      <RefreshControl refreshing={refetching} onRefresh={onRefetch} />
    ) : undefined,
    onScroll: fetchMore ? handleScroll : undefined,
    scrollEventThrottle: fetchMore ? 400 : undefined,
  };

  if (avoidKeyboard) {
    return (
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        extraHeight={extraHeight}
        ref={ref => {
          if (scrollViewRef) {
            // @ts-ignore
            scrollViewRef.current = ref;
          }
        }}
        {...commonProps}
        contentContainerStyle={[style.scroller]}
        style={[
          bgColor ? { backgroundColor: bgColor } : undefined,
          { paddingTop },
          { paddingBottom },
        ]}>
        {children}
      </KeyboardAwareScrollView>
    );
  }

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      ref={ref => {
        if (scrollViewRef) {
          // @ts-ignore
          scrollViewRef.current = ref;
        }
      }}
      {...commonProps}
      contentContainerStyle={[
        style.scroller,
        bgColor ? { backgroundColor: bgColor } : undefined,
        { paddingTop },
        { paddingBottom },
      ]}>
      {children}
    </ScrollView>
  );
};
