import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { CCTextButton, CCTextButtonSizesEnum } from '../components/CCButton/CCTextButton';
import { renderWithTheme } from './testUtils';

describe('CCTextButton', () => {
  it('renders the text', async () => {
    const { getByText } = await renderWithTheme(
      <CCTextButton text="Click me" onPress={() => {}} />
    );
    expect(getByText('Click me')).toBeTruthy();
  });

  it('calls onPress when pressed', async () => {
    const onPress = jest.fn();
    const { getByText } = await renderWithTheme(
      <CCTextButton text="Go" onPress={onPress} />
    );
    await fireEvent.press(getByText('Go'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', async () => {
    const onPress = jest.fn();
    const { getByText } = await renderWithTheme(
      <CCTextButton text="Go" onPress={onPress} disabled />
    );
    await fireEvent.press(getByText('Go'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('renders all size variants without crashing', async () => {
    for (const size of Object.values(CCTextButtonSizesEnum)) {
      const { getByText } = await renderWithTheme(
        <CCTextButton text={size} onPress={() => {}} size={size} />
      );
      expect(getByText(size)).toBeTruthy();
    }
  });

  it('renders with start alignment', async () => {
    const { getByText } = await renderWithTheme(
      <CCTextButton text="Left" onPress={() => {}} alignment="start" />
    );
    expect(getByText('Left')).toBeTruthy();
  });

  it('renders with end alignment', async () => {
    const { getByText } = await renderWithTheme(
      <CCTextButton text="Right" onPress={() => {}} alignment="end" />
    );
    expect(getByText('Right')).toBeTruthy();
  });
});
