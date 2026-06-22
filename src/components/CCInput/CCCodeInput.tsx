import React, { useState } from 'react';
// eslint-disable-next-line no-restricted-syntax
import { Dimensions, TextInput as Input, StyleSheet, View } from 'react-native';

import colors from '../../tokens/colors.json';
import { CCText } from '../CCText/CCText';
import { CCColumn } from '../CCLayout/CCColumn';
import { CCRow } from '../CCLayout/CCRow';
import { testProps } from '../../utils/CCTestingId';
import CustomPressable from '../CCPressable/CCPressable';

const width = Dimensions.get('window').width;

const style = StyleSheet.create({
  input: {
    opacity: 1,
    height: '80%',
    transform: [{ translateX: -width }],
    color: 'transparent',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 50,
    right: 0,
    zIndex: 100,
  },
  codeInput: {
    width: 37,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.white,
    flex: 1,
  },
  codeInputFocused: {
    borderColor: colors.blue,
  },
  codeInputSuccess: {
    borderColor: colors.success,
  },
  codeInputError: {
    borderColor: colors.error,
  },
  codeInputLoading: {
    borderColor: colors.border,
  },
  messageSuccess: {
    color: colors.success,
  },
  messageError: {
    color: colors.error,
  },
  messageLoading: {
    color: colors.mediumGray,
  },
  hideMessage: {
    opacity: 0,
  },
});

export type CCCodeStatus = 'success' | 'error' | 'loading' | 'other';

interface CCCodeInputProps {
  numberOfChar: number;
  value: string;
  status: CCCodeStatus;
  message?: string;
  onChange: (newCode: string) => void;
  onComplete?: (code: string) => void;
  onIncomplete?: (code: string) => void;
  autoFocus?: boolean;
  id?: string;
}

export const CCCodeInput = (props: CCCodeInputProps) => {
  const {
    numberOfChar,
    value,
    onChange = () => {},
    onComplete = () => {},
    onIncomplete = () => {},
    status = 'other',
    message,
    autoFocus,
    id,
  } = props;

  const inputRef = React.useRef<Input>(null);

  const [currentValue, setCurrentValue] = useState(value);

  const currentIndex =
    currentValue.length < numberOfChar ? currentValue.length : numberOfChar - 1;

  const onChangeText = (newValue: string) => {
    setCurrentValue(newValue);
    onChange(newValue);
    if (newValue.length === numberOfChar) {
      onComplete(newValue);
    } else {
      onIncomplete(newValue);
    }
  };

  const onPressInput = () => {
    inputRef.current?.focus?.();
  };

  return (
    <CustomPressable onPress={onPressInput}>
      <CCColumn>
        <Input
          ref={inputRef}
          {...testProps(id)}
          allowFontScaling={false}
          pointerEvents="box-only"
          autoCapitalize="characters"
          caretHidden={true}
          maxLength={numberOfChar}
          autoComplete="off"
          autoCorrect={false}
          style={style.input}
          defaultValue={currentValue}
          onChangeText={onChangeText}
          autoFocus={autoFocus}
        />
        <CCRow gap={8}>
          {[...Array(numberOfChar)].map((_, index) => (
            <View
              key={index}
              style={[
                style.codeInput,
                currentIndex === index &&
                  status === 'other' &&
                  style.codeInputFocused,
                status === 'success' && style.codeInputSuccess,
                status === 'error' && style.codeInputError,
                status === 'loading' && style.codeInputLoading,
              ]}>
              <CCText type="h3Bold">{value[index]}</CCText>
            </View>
          ))}
        </CCRow>
        <CCText
          type="bodyReg"
          style={[
            status === 'other' && style.hideMessage,
            status === 'success' && style.messageSuccess,
            status === 'error' && style.messageError,
            status === 'loading' && style.messageLoading,
          ]}>
          {message}
        </CCText>
      </CCColumn>
    </CustomPressable>
  );
};
