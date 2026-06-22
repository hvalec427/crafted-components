import React from 'react';
import { ImageSourcePropType, StyleSheet, ViewStyle } from 'react-native';

import { CCIcon } from '../CCIcon/CCIcon';
import { CCPressableOpacity } from '../CCPressable/CCPressableOpacity';

const buttonStyle = StyleSheet.create({
  wrapper: {
    alignSelf: 'center',
  },
});

interface CCRoundButtonImageProps {
  onPress: () => void;
  icon: ImageSourcePropType;
  style?: ViewStyle;
}

export const CCRoundButtonImage = (props: CCRoundButtonImageProps) => {
  const { onPress, icon, style } = props;

  return (
    <CCPressableOpacity onPress={onPress} style={[buttonStyle.wrapper, style]}>
      <CCIcon source={icon} />
    </CCPressableOpacity>
  );
};
