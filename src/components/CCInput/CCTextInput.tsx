import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  Animated,
  KeyboardTypeOptions,
  Platform,
  ReturnKeyTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { typography } from '../../tokens/typography';
import { testProps } from '../../utils/CCTestingId';
import { CCPressableOpacity } from '../CCPressable/CCPressableOpacity';
import { useTheme } from '../../tokens/ColorSchemaContext';
import {
  CCTextInputController,
  CCTextInputFormState,
} from './CCTextInputFormHook';

export interface CCTextInputRef {
  isValid: () => {
    valid: boolean;
    errorMessage?: string;
  };
  validate: () => {
    valid: boolean;
    errorMessage?: string;
  };
  clearInput: () => void;
  focus: () => void;
  value: string;
}

interface Validators {
  required?: {
    message: string;
  };
  type?: {
    message: string;
    type: 'email';
  };
  length?: {
    min?: {
      length: number;
      message: string;
    };
    max?: {
      length: number;
      message: string;
    };
  };
}

export interface CCTextInputProps {
  controller?: CCTextInputController;
  label?: string;
  labelType?: 'default' | 'regular' | 'highlighted';
  textType?: 'bold' | 'regular';
  instructions?: string;
  instructionsPosition?: 'top' | 'bottom';
  warning?: string | React.ReactNode;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  onSubmitEditing?: () => void;
  placeholderLabel?: string;
  placeholder?: string;
  defaultValue?: string;
  onChangeText?: (text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  editable?: boolean;
  multiline?: boolean;
  autoFocus?: boolean;
  autoFocusWithDelay?: number;
  keyboardType?: KeyboardTypeOptions;
  textAlign?: 'center' | 'left' | 'right' | undefined;
  autoComplete?:
    | 'additional-name'
    | 'address-line1'
    | 'address-line2'
    | 'birthdate-day'
    | 'birthdate-full'
    | 'birthdate-month'
    | 'birthdate-year'
    | 'cc-csc'
    | 'cc-exp'
    | 'cc-exp-day'
    | 'cc-exp-month'
    | 'cc-exp-year'
    | 'cc-number'
    | 'country'
    | 'current-password'
    | 'email'
    | 'family-name'
    | 'gender'
    | 'given-name'
    | 'honorific-prefix'
    | 'honorific-suffix'
    | 'name'
    | 'name-family'
    | 'name-given'
    | 'name-middle'
    | 'name-middle-initial'
    | 'name-prefix'
    | 'name-suffix'
    | 'new-password'
    | 'nickname'
    | 'one-time-code'
    | 'organization'
    | 'organization-title'
    | 'password'
    | 'password-new'
    | 'postal-address'
    | 'postal-address-country'
    | 'postal-address-extended'
    | 'postal-address-extended-postal-code'
    | 'postal-address-locality'
    | 'postal-address-region'
    | 'postal-code'
    | 'street-address'
    | 'sms-otp'
    | 'tel'
    | 'tel-country-code'
    | 'tel-national'
    | 'tel-device'
    | 'url'
    | 'username'
    | 'username-new'
    | 'off'
    | undefined;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
  autoCorrect?: boolean;
  maxLength?: number;
  blurOnSubmit?: boolean;
  returnKeyType?: ReturnKeyTypeOptions;
  validators?: Validators;
  showErrorOn?: 'change' | 'blur' | 'focus' | 'manual_validate' | undefined;
  clearErrorOn?: 'change' | 'blur' | 'focus' | undefined;
  error?: string;
  id?: string;
}

const isAndroid = Platform.OS === 'android';

const style = StyleSheet.create({
  wrapper: {
    gap: 4,
  },
  label: {
    ...typography.label,
  },
  labelRegular: {
    ...typography.body,
  },
  labelHighlighted: {
    ...typography.labelLarge,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    borderWidth: 1,
    borderRadius: 8,
    height: 56,
    paddingHorizontal: 16,
  },
  inputWrapperTextArea: {
    height: undefined,
    minHeight: 80,
    alignItems: 'flex-start',
    paddingVertical: 12,
  },
  inputAndPlaceholderWrapper: {
    height: '100%',
    flex: 1,
    flexShrink: 1,
    flexGrow: 1,
    justifyContent: 'center',
  },
  inputAndPlaceholderWrapperMultiline: {
    height: undefined,
  },
  inputAndPlaceholderWrapperAndroidWithErrorOrWarning: {
    marginBottom: -3,
  },
  inputFieldWrapper: {
    justifyContent: 'center',
  },
  inputFieldWrapperSingleLine: {
    justifyContent: 'center',
    height: '100%',
  },
  inputFieldWrapperAndroid: {
    marginLeft: -5,
  },
  inputFieldAndroidTopMargin: {
    marginTop: -10,
  },
  inputFieldAndroidPlaceholderTopMargin: {
    marginTop: -6,
  },
  inputFieldMultiLineAndroidTopMargin: {
    marginTop: -10,
  },
  inputFieldMultiLineAndroidPlaceholderTopMargin: {
    marginTop: 3,
  },
  inputFieldMultiLineAndroidPlaceholderBottomMargin: {
    marginBottom: 8,
  },
  inputFieldMultiLineIosBottomMargin: {
    marginBottom: 18,
  },
  inputFieldMultiLineIosPlaceholderTopMargin: {
    marginTop: 8,
  },
  inputFieldMultiLineIosPlaceholderBottomMargin: {
    marginBottom: 34,
  },
  inputField: {
    ...typography.body,
    zIndex: 5,
    textAlignVertical: 'top',
    height: '100%',
    overflow: 'hidden',
  },
  inputFieldSingleLine: {
    height: undefined,
    textAlignVertical: 'center',
  },
  inputFieldBold: {
    fontWeight: '600',
  },
  inputFieldMultiline: {
    height: undefined,
    marginVertical: 8,
  },
  inputFieldMultilineAndroid: {
    marginVertical: 0,
  },
  instructions: {
    ...typography.caption,
  },
  error: {
    ...typography.caption,
    fontWeight: '600',
  },
  warning: {
    ...typography.caption,
    fontWeight: '600',
  },
  placeholderLabelWrapper: {
    zIndex: 10,
  },
  placeholderMultilineIos: {
    marginBottom: 3,
  },
  placeholderLabel: {
    ...typography.caption,
  },
  errorWarningContainer: {
    minHeight: 16,
  },
});

export const CCTextInput = forwardRef<CCTextInputRef, CCTextInputProps>(
  (props, ref) => {
    const theme = useTheme();
    const colors = theme.input;
    const neutral = theme.neutral;

    const {
      controller,
      label,
      labelType,
      instructions,
      instructionsPosition,
      warning,
      leading,
      trailing,
      onSubmitEditing,
      placeholderLabel,
      placeholder,
      defaultValue = '',
      onChangeText,
      onFocus,
      onBlur,
      editable = true,
      multiline,
      textType,
      keyboardType,
      autoComplete = 'off',
      returnKeyType = 'done',
      autoCapitalize,
      textAlign,
      validators,
      showErrorOn,
      clearErrorOn,
      autoCorrect,
      maxLength,
      blurOnSubmit = true,
      error: customError,
      id,
    } = props;

    let { autoFocusWithDelay, autoFocus } = props;
    if (autoFocus && Platform.OS === 'ios' && !autoFocusWithDelay) {
      autoFocusWithDelay = 750;
      autoFocus = false;
    }

    const [value, setValue] = useState<string>(defaultValue);
    const valueRef = useRef<string>(defaultValue);
    const [error, setError] = useState<string | undefined>();
    const [isFocused, setIsFocused] = useState(false);

    const controllerKey = useRef<string | undefined>(undefined);
    const inputRef = useRef<TextInput | null>(null);
    const formRef = useRef<
      | {
          focusNextInput: (currentKey?: string) => void;
          isThereNextInput: (currentKey?: string) => CCTextInputFormState | undefined;
        }
      | undefined
    >(undefined);

    const placeholderAnimation = useRef(new Animated.Value(0)).current;
    const inputAnimation = useRef(new Animated.Value(0)).current;
    const correctReturnKeyType = useRef<ReturnKeyTypeOptions | undefined>(returnKeyType);

    useEffect(() => {
      setError(customError);
    }, [customError]);

    useEffect(() => {
      if ((isFocused || (value?.length && value?.length > 0)) && !!placeholderLabel) {
        runFocusAnimation(true);
      } else {
        runFocusAnimation(false);
      }
    }, [isFocused, value]);

    useEffect(() => {
      if (controller && controllerKey.current) {
        const { focusNextInput, isThereNextInput } = controller.updateState(
          valueRef.current,
          !error,
          isFocused,
        );
        formRef.current = { focusNextInput, isThereNextInput };
      }
    }, [value, error, isFocused]);

    useEffect(() => {
      if (controller && !controllerKey.current) {
        const { key } = controller.init(valueRef.current, !error, isFocused, {
          validate,
          isValid,
          clearInput,
          focus,
        });
        controllerKey.current = key;
      }
      return () => {
        if (controller && controllerKey.current) {
          controller.clear();
          controllerKey.current = undefined;
        }
      };
    }, []);

    useEffect(() => {
      if (!value || value.length === 0) {
        setValue(defaultValue);
        valueRef.current = defaultValue;
      } else if (defaultValue === value) {
        // api change before navigation — ignore
      } else {
        console.warn('Do not change defaultValue after mount. Use clearInput() to reset.');
      }
    }, [defaultValue]);

    useEffect(() => {
      let timer: ReturnType<typeof setTimeout> | undefined;
      if (autoFocusWithDelay !== undefined) {
        timer = setTimeout(() => {
          inputRef.current?.focus();
        }, autoFocusWithDelay);
      }
      return () => clearTimeout(timer);
    }, []);

    const runFocusAnimation = (focused: boolean) => {
      Animated.timing(placeholderAnimation, {
        toValue: focused ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
      Animated.timing(inputAnimation, {
        toValue: focused ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    };

    let placeholderYRange = [27, multiline ? 22 : 15];
    if (isAndroid) {
      placeholderYRange = [multiline ? 22 : 27, 14];
    }
    const placeholderY = placeholderAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: placeholderYRange,
    });

    let outputYRange = [multiline ? 8 : 0, multiline ? 14 : 0];
    if (isAndroid) {
      outputYRange = [6, 4];
    }
    const inputY = inputAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: outputYRange,
    });

    const onValidate = (currentValue: string) => {
      if (!validators) return undefined;

      if (validators.required) {
        if (!currentValue || currentValue.length === 0) {
          return validators.required.message;
        }
      }

      if (validators.length) {
        if (validators.length.min) {
          if (currentValue.length < validators.length.min.length) {
            return validators.length.min.message;
          }
        }
        if (validators.length.max) {
          if (currentValue.length > validators.length.max.length) {
            return validators.length.max.message;
          }
        }
      }

      if (validators.type) {
        if (validators.type.type === 'email') {
          const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if (!re.test(currentValue?.toLowerCase())) {
            return validators.type.message;
          }
        }
      }
    };

    const isValid = () => {
      const errorMessage = onValidate(valueRef.current ?? '');
      if (errorMessage) {
        return { valid: false, errorMessage };
      }
      return { valid: true };
    };

    const validate = () => {
      const errorMessage = onValidate(valueRef.current ?? '');
      if (errorMessage) {
        setError(errorMessage);
        return { valid: false, errorMessage };
      }
      setError(undefined);
      return { valid: true };
    };

    const clearInput = () => {
      inputRef.current?.clear();
      valueRef.current = '';
      setValue('');
    };

    const focus = () => {
      inputRef.current?.focus();
    };

    useImperativeHandle(
      ref,
      () => ({ isValid, validate, clearInput, focus, value: value ?? '' }),
      [value],
    );

    return (
      <View style={style.wrapper}>
        {label ? (
          <Text
            style={[
              style.label,
              labelType === 'regular' && style.labelRegular,
              labelType === 'highlighted' && style.labelHighlighted,
            ]}>
            {label}
          </Text>
        ) : null}
        {instructions && instructionsPosition === 'top' ? (
          <Text style={[style.instructions, { color: neutral.darkGray }]}>{instructions}</Text>
        ) : null}

        <CCPressableOpacity
          onPress={() => {
            inputRef.current?.focus();
          }}
          disabled={!editable}
          style={[
            style.inputWrapper,
            { borderColor: colors.border, backgroundColor: colors.background },
            multiline ? style.inputWrapperTextArea : {},
            error    ? { borderColor: colors.borderError,   borderWidth: 2 } : {},
            warning  ? { borderColor: colors.borderWarning, borderWidth: 2 } : {},
            isFocused ? { borderColor: colors.borderFocused, borderWidth: 2 } : {},
          ]}>
          {leading && <View>{leading}</View>}
          <View
            style={[
              style.inputAndPlaceholderWrapper,
              multiline && style.inputAndPlaceholderWrapperMultiline,
              isAndroid &&
                (!!error || !!warning) &&
                style.inputAndPlaceholderWrapperAndroidWithErrorOrWarning,
            ]}>
            {placeholderLabel ? (
              <Animated.View
                pointerEvents="none"
                style={[
                  style.placeholderLabelWrapper,
                  multiline && !isAndroid && style.placeholderMultilineIos,
                  { transform: [{ translateY: placeholderY }] },
                ]}>
                <Text numberOfLines={1} style={[style.placeholderLabel, { color: neutral.darkGray }]}>
                  {placeholderLabel}
                </Text>
              </Animated.View>
            ) : null}

            <Animated.View
              style={[
                style.inputFieldWrapper,
                !multiline && style.inputFieldWrapperSingleLine,
                isAndroid && style.inputFieldWrapperAndroid,

                !multiline && isAndroid && style.inputFieldAndroidTopMargin,
                !multiline && isAndroid && !!placeholderLabel && style.inputFieldAndroidPlaceholderTopMargin,

                multiline && isAndroid && style.inputFieldMultiLineAndroidTopMargin,
                multiline && isAndroid && !!placeholderLabel && style.inputFieldMultiLineAndroidPlaceholderTopMargin,
                multiline && isAndroid && !!placeholderLabel && style.inputFieldMultiLineAndroidPlaceholderBottomMargin,

                multiline && !isAndroid && style.inputFieldMultiLineIosBottomMargin,
                multiline && !isAndroid && !!placeholderLabel && style.inputFieldMultiLineIosPlaceholderTopMargin,
                multiline && !isAndroid && !!placeholderLabel && style.inputFieldMultiLineIosPlaceholderBottomMargin,

                { transform: [{ translateY: inputY }] },
              ]}>
              <TextInput
                {...testProps(id)}
                ref={view => {
                  inputRef.current = view;
                }}
                allowFontScaling={false}
                submitBehavior={
                  multiline
                    ? 'newline'
                    : blurOnSubmit
                      ? 'blurAndSubmit'
                      : 'submit'
                }
                onSubmitEditing={() => {
                  if (formRef.current) {
                    formRef.current.focusNextInput(controllerKey.current);
                  }
                  if (onSubmitEditing) {
                    onSubmitEditing();
                  }
                }}
                keyboardType={keyboardType}
                autoFocus={autoFocus}
                autoCapitalize={autoCapitalize}
                autoComplete={autoComplete}
                autoCorrect={autoCorrect}
                lineBreakStrategyIOS="standard"
                numberOfLines={multiline ? undefined : 1}
                multiline={multiline}
                maxLength={maxLength}
                returnKeyType={correctReturnKeyType.current}
                editable={editable}
                textAlign={textAlign}
                style={[
                  style.inputField,
                  !multiline && style.inputFieldSingleLine,
                  textType === 'bold' && style.inputFieldBold,
                  multiline && style.inputFieldMultiline,
                  multiline && isAndroid && style.inputFieldMultilineAndroid,
                ]}
                placeholder={placeholder}
                placeholderTextColor={
                  (!isFocused && !placeholderLabel) || isFocused
                    ? colors.placeholder
                    : 'transparent'
                }
                defaultValue={defaultValue}
                onChangeText={newValue => {
                  if (newValue === valueRef.current) return;

                  if (clearErrorOn === 'change') {
                    setError(undefined);
                  }
                  if (showErrorOn === 'change') {
                    setError(onValidate(newValue));
                  }

                  setValue(newValue);
                  valueRef.current = newValue;
                  if (onChangeText) {
                    onChangeText(newValue);
                  }
                }}
                onFocus={() => {
                  setIsFocused(true);

                  if (clearErrorOn === 'focus') {
                    setError(undefined);
                  }
                  if (showErrorOn === 'focus') {
                    setError(onValidate(valueRef.current ?? ''));
                  }

                  if (onFocus) {
                    onFocus();
                  }
                }}
                onBlur={() => {
                  setIsFocused(false);

                  if (clearErrorOn === 'blur') {
                    setError(undefined);
                  }
                  if (showErrorOn === 'blur') {
                    setError(onValidate(valueRef.current ?? ''));
                  }

                  if (onBlur) {
                    onBlur();
                  }
                }}
              />
            </Animated.View>
          </View>

          {trailing && <View>{trailing}</View>}
        </CCPressableOpacity>

        <View style={style.errorWarningContainer}>
          {error ? <Text style={[style.error, { color: colors.errorText }]}>{error}</Text> : null}
          {warning ? <Text style={[style.warning, { color: neutral.darkGray }]}>{warning}</Text> : null}
        </View>

        {instructions && instructionsPosition === 'bottom' ? (
          <Text style={[style.instructions, { color: neutral.darkGray }]}>{instructions}</Text>
        ) : null}
      </View>
    );
  },
);
