import React from 'react';
import { TextInput as Input, Platform, StyleSheet, View } from 'react-native';

import { testProps } from '../../utils/CCTestingId';
import { useTheme } from '../../tokens/ColorSchemaContext';

const style = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    borderRadius: 12,
    minHeight: 55,
    justifyContent: 'center',
    paddingLeft: 16,
  },
  iosWrapperPaddingTop: {
    paddingTop: 10,
  },
  inputAlignTop: {
    textAlignVertical: 'top',
  },
});

interface CCTextAreaProps {
  numOfLines?: number;
  value: string;
  placeholder?: string;
  onChange?: (newValue: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  id?: string;
}

export const CCTextArea = (props: CCTextAreaProps) => {
  const {
    numOfLines = 1,
    value,
    placeholder,
    onChange = () => {},
    onBlur = () => {},
    onFocus = () => {},
    id,
  } = props;

  const schema = useTheme();
  const ic = schema.input;

  const initialWrapperHeight = 21;

  let inputHeight;
  if (numOfLines > 1) {
    inputHeight = numOfLines * initialWrapperHeight;
  }

  const inputInOneLine = !!inputHeight && inputHeight !== initialWrapperHeight;
  return (
    <View
      style={[
        style.wrapper,
        { borderColor: ic.border, backgroundColor: ic.background },
        Platform.OS === 'ios' && inputInOneLine && style.iosWrapperPaddingTop,
      ]}>
      <Input
        {...testProps(id)}
        multiline={true}
        allowFontScaling={false}
        numberOfLines={numOfLines}
        verticalAlign="top"
        style={[
          inputInOneLine && style.inputAlignTop,
          inputHeight ? { height: inputHeight } : {},
          inputInOneLine &&
            initialWrapperHeight &&
            value?.length === 0 &&
            Platform.OS === 'android' && {
              marginBottom: initialWrapperHeight,
            },
        ]}
        placeholder={placeholder}
        defaultValue={value}
        onChange={newValue => onChange(newValue.nativeEvent.text)}
        onBlur={() => onBlur()}
        onFocus={() => onFocus()}
      />
    </View>
  );
};
