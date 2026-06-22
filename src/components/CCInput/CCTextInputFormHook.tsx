import { useMemo, useRef, useState } from 'react';
import { Keyboard } from 'react-native';

interface CCTextInputFormRef {
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
}

export interface CCTextInputFormState {
  key: string;
  value: string;
  isValid: boolean;
  ref: CCTextInputFormRef | null;
  position: number;
  isFocused: boolean;
}

export interface CCTextInputForm {
  controller: (key: string) => CCTextInputController;
  inputs: Record<string, CCTextInputFormState>;
  isFormValid: boolean;
  validate: () => void;
  focusPreviousInput: () => void;
  focusNextInput: () => void;
}

export interface CCTextInputController {
  init: (
    value: string,
    isValid: boolean,
    isFocused: boolean,
    ref: CCTextInputFormRef,
  ) => { key: string };
  clear: () => void;
  updateState: (
    newValue: string,
    newIsValid: boolean,
    isFocused: boolean,
  ) => {
    focusNextInput: (currentKey?: string) => void;
    isThereNextInput: (currentKey?: string) => CCTextInputFormState | undefined;
  };
}

export const useTextInputForm = (): CCTextInputForm => {
  const [inputs, setInputs] = useState<Record<string, CCTextInputFormState>>({});
  const inputsRefs = useRef<Record<string, CCTextInputFormRef>>({});
  const inputsRef = useRef<Record<string, CCTextInputFormState>>({});

  inputsRef.current = inputs;

  // Tracks JSX render order of controller(key) calls, reset each render via microtask
  const jsxOrderRef = useRef<string[]>([]);
  const jsxOrderBuffer = useRef<string[]>([]);
  const jsxOrderFlushScheduled = useRef(false);

  const isFormValid = useMemo(
    () =>
      Object.keys(inputs).length > 0 &&
      Object.values(inputs).every(input => input.isValid),
    [inputs],
  );

  const checkIfInputsAreValid = (
    inpts: Record<string, CCTextInputFormState>,
  ): Record<string, CCTextInputFormState> =>
    Object.keys(inpts).reduce<Record<string, CCTextInputFormState>>(
      (acc, key) => {
        const result = inpts[key].ref?.isValid();
        return {
          ...acc,
          [key]: {
            ...inpts[key],
            isValid: !!result?.valid,
          },
        };
      },
      {},
    );

  const controller = (key: string) => {
    jsxOrderBuffer.current.push(key);
    if (!jsxOrderFlushScheduled.current) {
      jsxOrderFlushScheduled.current = true;
      Promise.resolve().then(() => {
        jsxOrderFlushScheduled.current = false;
        jsxOrderRef.current = [...jsxOrderBuffer.current];
        jsxOrderBuffer.current = [];
      });
    }

    return {
      init: (
        value: string,
        isValid: boolean,
        isFocused: boolean,
        ref: CCTextInputFormRef,
      ): { key: string } => {
        setInputs(prevInputs => {
          const position = jsxOrderRef.current.indexOf(key);
          const newInputs = {
            ...prevInputs,
            [key]: {
              value,
              isValid,
              ref,
              position:
                position >= 0 ? position : Object.keys(prevInputs).length,
              isFocused,
              key,
            },
          };
          return checkIfInputsAreValid(newInputs);
        });
        inputsRefs.current[key] = ref;
        return { key };
      },
      clear: () => {
        setInputs(prevInputs => {
          const newInputs = { ...prevInputs };
          delete newInputs[key];
          return checkIfInputsAreValid(newInputs);
        });
        delete inputsRefs.current[key];
      },
      updateState: (
        newValue: string,
        newIsValid: boolean,
        newIsFocused: boolean,
      ) => {
        setInputs(prevInputs => {
          const newInputs = {
            ...prevInputs,
            [key]: {
              value: newValue,
              isValid: newIsValid,
              isFocused: newIsFocused,
              ref: prevInputs[key]?.ref ?? null,
              position: prevInputs[key]?.position ?? 0,
              key,
            },
          };
          return checkIfInputsAreValid(newInputs);
        });
        return { focusNextInput, isThereNextInput };
      },
    };
  };

  const isThereNextInput = (currentKey?: string) => {
    const order = jsxOrderRef.current;
    const focusedKey =
      currentKey ??
      Object.values(inputsRef.current).find(input => input.isFocused)?.key;
    if (!focusedKey) return undefined;
    const idx = order.indexOf(focusedKey);
    if (idx >= 0 && idx < order.length - 1) {
      return inputsRef.current[order[idx + 1]];
    }
    return undefined;
  };

  const focusNextInput = (currentKey?: string) => {
    const nextInput = isThereNextInput(currentKey);
    if (nextInput) {
      setTimeout(() => {
        nextInput.ref?.focus();
      }, 100);
    } else {
      Keyboard.dismiss();
    }
  };

  const focusPreviousInput = () => {
    const order = jsxOrderRef.current;
    const focusedKey = Object.values(inputsRef.current).find(
      input => input.isFocused,
    )?.key;
    if (!focusedKey) return;
    const idx = order.indexOf(focusedKey);
    if (idx > 0) {
      inputsRef.current[order[idx - 1]]?.ref?.focus();
    }
  };

  return {
    controller,
    inputs,
    isFormValid,
    validate: () => {
      Object.values(inputsRefs.current).forEach(inputRef => {
        if (inputRef) {
          inputRef.validate();
        }
      });
    },
    focusPreviousInput,
    focusNextInput,
  };
};
