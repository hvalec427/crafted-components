import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { CCCodeInput } from '../components/CCInput/CCCodeInput';
import { renderWithTheme } from './testUtils';

describe('CCCodeInput', () => {
  it('renders without crashing', async () => {
    await expect(
      renderWithTheme(
        <CCCodeInput numberOfChar={4} value="" status="other" onChange={() => {}} />
      )
    ).resolves.not.toThrow();
  });

  it('displays characters from the value prop', async () => {
    const { getByText } = await renderWithTheme(
      <CCCodeInput numberOfChar={4} value="AB" status="other" onChange={() => {}} />
    );
    expect(getByText('A')).toBeTruthy();
    expect(getByText('B')).toBeTruthy();
  });

  it('shows the message text', async () => {
    const { getByText } = await renderWithTheme(
      <CCCodeInput
        numberOfChar={4}
        value=""
        status="error"
        message="Invalid code"
        onChange={() => {}}
      />
    );
    expect(getByText('Invalid code')).toBeTruthy();
  });

  it('calls onChange when text is entered', async () => {
    const onChange = jest.fn();
    const { getByTestId } = await renderWithTheme(
      <CCCodeInput id="code-input" numberOfChar={4} value="" status="other" onChange={onChange} />
    );
    await fireEvent.changeText(getByTestId('code-input'), '12');
    expect(onChange).toHaveBeenCalledWith('12');
  });

  it('calls onComplete when all characters are entered', async () => {
    const onComplete = jest.fn();
    const { getByTestId } = await renderWithTheme(
      <CCCodeInput
        id="code-input"
        numberOfChar={4}
        value=""
        status="other"
        onChange={() => {}}
        onComplete={onComplete}
      />
    );
    await fireEvent.changeText(getByTestId('code-input'), '1234');
    expect(onComplete).toHaveBeenCalledWith('1234');
  });

  it('calls onIncomplete when fewer than all characters are entered', async () => {
    const onIncomplete = jest.fn();
    const { getByTestId } = await renderWithTheme(
      <CCCodeInput
        id="code-input"
        numberOfChar={4}
        value=""
        status="other"
        onChange={() => {}}
        onIncomplete={onIncomplete}
      />
    );
    await fireEvent.changeText(getByTestId('code-input'), '12');
    expect(onIncomplete).toHaveBeenCalledWith('12');
  });

  it('renders with success status without crashing', async () => {
    const { getByText } = await renderWithTheme(
      <CCCodeInput numberOfChar={4} value="1234" status="success" message="Verified" onChange={() => {}} />
    );
    expect(getByText('Verified')).toBeTruthy();
  });

  it('renders with loading status without crashing', async () => {
    await expect(
      renderWithTheme(
        <CCCodeInput numberOfChar={6} value="" status="loading" onChange={() => {}} />
      )
    ).resolves.not.toThrow();
  });
});
