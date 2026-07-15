import React, { useEffect, useState } from 'react';
import { Dimensions, TextInput as Input, StyleSheet, View } from 'react-native';

import { CCText } from '../CCText/CCText';
import { CCColumn } from '../CCLayout/CCColumn';
import { CCRow } from '../CCLayout/CCRow';
import { testProps } from '../../utils/CCTestingId';
import CustomPressable from '../CCPressable/CCPressable';
import { useColorSchema } from '../../tokens/ColorSchemaContext';

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
    width: 44,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
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

  const schema = useColorSchema();
  const ci = schema.components.codeInput;

  const inputRef = React.useRef<Input>(null);

  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

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

  const messageColor =
    status === 'success' ? ci.successText :
    status === 'error'   ? ci.errorText   :
    status === 'loading' ? ci.loadingText :
    'transparent';

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
          {[...Array(numberOfChar)].map((_, index) => {
            const borderColor =
              status === 'success' ? ci.borderSuccess :
              status === 'error'   ? ci.borderError   :
              status === 'loading' ? ci.border         :
              currentIndex === index ? ci.borderFocused : ci.border;

            return (
              <View
                key={index}
                style={[
                  style.codeInput,
                  { borderColor, backgroundColor: ci.background },
                ]}>
                <CCText type="h3Bold">{currentValue[index]}</CCText>
              </View>
            );
          })}
        </CCRow>
        <CCText type="bodyReg" style={[{ color: messageColor }]}>
          {message}
        </CCText>
      </CCColumn>
    </CustomPressable>
  );
};
