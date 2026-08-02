import React from 'react';
import { StyleSheet } from 'react-native';

import { CCRow } from '../CCLayout/CCRow';
import { CCText } from '../CCText/CCText';
import { CCPressableOpacity } from '../CCPressable/CCPressableOpacity';
import { useTheme } from '../../tokens/ColorSchemaContext';

export interface CCPaginationProps {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
  prevDisabled?: boolean;
  nextDisabled?: boolean;
  id?: string;
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
});

export const CCPagination = ({
  page,
  totalPages,
  onPrev,
  onNext,
  prevDisabled = page <= 1,
  nextDisabled = page >= totalPages,
  id,
}: CCPaginationProps) => {
  const theme = useTheme();

  return (
    <CCRow id={id} align="center" justify="space-between">
      <CCPressableOpacity
        id={id ? `${id}-prev` : undefined}
        onPress={onPrev}
        disabled={prevDisabled}
        style={[styles.button, { backgroundColor: theme.border, opacity: prevDisabled ? 0.5 : 1 }]}>
        <CCText type="label" color={theme.textColor.primary}>← Prev</CCText>
      </CCPressableOpacity>

      <CCText type="caption" style={{ color: theme.textColor.secondary }}>
        Page {page} of {totalPages}
      </CCText>

      <CCPressableOpacity
        id={id ? `${id}-next` : undefined}
        onPress={onNext}
        disabled={nextDisabled}
        style={[styles.button, { backgroundColor: theme.border, opacity: nextDisabled ? 0.5 : 1 }]}>
        <CCText type="label" color={theme.textColor.primary}>Next →</CCText>
      </CCPressableOpacity>
    </CCRow>
  );
};
