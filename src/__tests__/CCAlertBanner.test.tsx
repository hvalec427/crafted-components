import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { CCAlertBanner } from '../components/CCAlertBanner/CCAlertBanner';
import { renderWithTheme } from './testUtils';

describe('CCAlertBanner', () => {
  it('renders the message', async () => {
    const { getByText } = await renderWithTheme(
      <CCAlertBanner message="Something happened" type="success" />
    );
    expect(getByText('Something happened')).toBeTruthy();
  });

  it('shows ✓ icon for success type', async () => {
    const { getByText } = await renderWithTheme(
      <CCAlertBanner message="OK" type="success" />
    );
    expect(getByText('✓')).toBeTruthy();
  });

  it('shows ! icon for error type', async () => {
    const { getByText } = await renderWithTheme(
      <CCAlertBanner message="Fail" type="error" />
    );
    expect(getByText('!')).toBeTruthy();
  });

  it('calls onDismiss when the × button is pressed', async () => {
    const onDismiss = jest.fn();
    const { getByText } = await renderWithTheme(
      <CCAlertBanner message="OK" type="success" onDismiss={onDismiss} />
    );
    await fireEvent.press(getByText('×'));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('does not render the dismiss button when onDismiss is not provided', async () => {
    const { queryByText } = await renderWithTheme(
      <CCAlertBanner message="OK" type="success" />
    );
    expect(queryByText('×')).toBeNull();
  });
});
