import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { CCPill } from '../components/CCPill/CCPill';
import { renderWithTheme } from './testUtils';

describe('CCPill', () => {
  it('renders the label text', async () => {
    const { getByText } = await renderWithTheme(<CCPill label="Option A" />);
    expect(getByText('Option A')).toBeTruthy();
  });

  it('sets testID from id prop', async () => {
    const { getByTestId } = await renderWithTheme(<CCPill label="Tagged" id="pill-1" />);
    expect(getByTestId('pill-1')).toBeTruthy();
  });

  it('calls onPress when pressed', async () => {
    const onPress = jest.fn();
    const { getByText } = await renderWithTheme(<CCPill label="Click me" onPress={onPress} />);
    await fireEvent.press(getByText('Click me'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', async () => {
    const onPress = jest.fn();
    const { getByText } = await renderWithTheme(
      <CCPill label="Disabled" onPress={onPress} disabled />
    );
    await fireEvent.press(getByText('Disabled'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('does not crash when no onPress is provided', async () => {
    const { getByText } = await renderWithTheme(<CCPill label="No handler" />);
    await expect(fireEvent.press(getByText('No handler'))).resolves.not.toThrow();
  });

  it('renders in active state without crashing', async () => {
    const { getByText } = await renderWithTheme(<CCPill label="Active" active />);
    expect(getByText('Active')).toBeTruthy();
  });
});
