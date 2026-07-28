import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { CCTextInput } from '../components/CCInput/CCTextInput';
import { renderWithTheme } from './testUtils';

beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());

describe('CCTextInput', () => {
  it('renders the label', async () => {
    const { getByText } = await renderWithTheme(<CCTextInput label="Email" />);
    expect(getByText('Email')).toBeTruthy();
  });

  it('renders placeholder text', async () => {
    const { getByPlaceholderText } = await renderWithTheme(
      <CCTextInput placeholder="Enter email" />
    );
    expect(getByPlaceholderText('Enter email')).toBeTruthy();
  });

  it('sets testID on the input via id prop', async () => {
    const { getByTestId } = await renderWithTheme(<CCTextInput id="my-input" />);
    expect(getByTestId('my-input')).toBeTruthy();
  });

  it('calls onChangeText when text changes', async () => {
    const onChangeText = jest.fn();
    const { getByTestId } = await renderWithTheme(
      <CCTextInput id="email-input" onChangeText={onChangeText} />
    );
    await fireEvent.changeText(getByTestId('email-input'), 'hello@example.com');
    expect(onChangeText).toHaveBeenCalledWith('hello@example.com');
  });

  it('shows error text', async () => {
    const { getByText } = await renderWithTheme(
      <CCTextInput error="This field is required" />
    );
    expect(getByText('This field is required')).toBeTruthy();
  });

  it('renders instructions above the input', async () => {
    const { getByText } = await renderWithTheme(
      <CCTextInput instructions="Use a strong password" instructionsPosition="top" />
    );
    expect(getByText('Use a strong password')).toBeTruthy();
  });

  it('renders instructions below the input', async () => {
    const { getByText } = await renderWithTheme(
      <CCTextInput instructions="8 characters minimum" instructionsPosition="bottom" />
    );
    expect(getByText('8 characters minimum')).toBeTruthy();
  });

  it('renders without crashing when editable is false', async () => {
    const { getByTestId } = await renderWithTheme(
      <CCTextInput id="readonly" editable={false} />
    );
    expect(getByTestId('readonly')).toBeTruthy();
  });

  it('renders with highlighted label type', async () => {
    const { getByText } = await renderWithTheme(
      <CCTextInput label="Name" labelType="highlighted" />
    );
    expect(getByText('Name')).toBeTruthy();
  });

  it('renders with a floating placeholder label', async () => {
    const { getByText } = await renderWithTheme(
      <CCTextInput placeholderLabel="First name" />
    );
    expect(getByText('First name')).toBeTruthy();
  });

  it('does not call onChangeText when value is unchanged', async () => {
    const onChangeText = jest.fn();
    const { getByTestId } = await renderWithTheme(
      <CCTextInput id="stable" defaultValue="same" onChangeText={onChangeText} />
    );
    await fireEvent.changeText(getByTestId('stable'), 'same');
    expect(onChangeText).not.toHaveBeenCalled();
  });
});
