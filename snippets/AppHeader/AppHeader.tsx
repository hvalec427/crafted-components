import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  CCRow,
  CCIcon,
  CCText,
  CCPressableOpacity,
  useTheme,
  useAssets,
} from 'crafted-components';

interface AppHeaderProps {
  title: string;
  /** Icon rendered to the left of the title — defaults to the built-in arrow icon */
  titleIcon?: React.ReactNode;
  /** Icon rendered on the right as a pressable action */
  actionIcon?: React.ReactNode;
  onActionPress: () => void;
}

const styles = StyleSheet.create({
  safeArea: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  row: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  defaultIcon: {
    width: 20,
    height: 20,
  },
});

export const AppHeader = ({
  title,
  titleIcon,
  actionIcon,
  onActionPress,
}: AppHeaderProps) => {
  const schema = useTheme();
  const { icons } = useAssets();
  const header = schema.header;

  const resolvedTitleIcon = titleIcon ?? (
    <CCIcon
      source={icons.arrow}
      style={[styles.defaultIcon, { tintColor: header.icon }]}
    />
  );

  const resolvedActionIcon = actionIcon ?? (
    <CCIcon
      source={icons.arrow}
      style={[styles.defaultIcon, { tintColor: header.icon }]}
    />
  );

  return (
    <SafeAreaView
      edges={['top']}
      style={[styles.safeArea, { backgroundColor: header.background }]}
    >
      <CCRow
        justify="space-between"
        align="center"
        style={styles.row}
      >
        <CCRow gap={8} align="center">
          {resolvedTitleIcon}
          <CCText type="bodySemiBold" color={header.title}>
            {title}
          </CCText>
        </CCRow>

        <CCPressableOpacity
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          onPress={onActionPress}
        >
          {resolvedActionIcon}
        </CCPressableOpacity>
      </CCRow>
    </SafeAreaView>
  );
};
