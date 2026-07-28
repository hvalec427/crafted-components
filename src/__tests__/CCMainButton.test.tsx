import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { CCMainButton, CCMainButtonTypes, CCButtonSizesEnum } from '../components/CCButton/CCMainButton';
import { renderWithTheme } from './testUtils';

describe('CCMainButton', () => {
  it('renders button text', async () => {
    const { getByText } = await renderWithTheme(
      <CCMainButton text="Submit" type="primary" onPress={() => {}} />
    );
    expect(getByText('Submit')).toBeTruthy();
  });

  it('sets testID from id prop', async () => {
    const { getByTestId } = await renderWithTheme(
      <CCMainButton id="cta-btn" text="Go" type="primary" onPress={() => {}} />
    );
    expect(getByTestId('cta-btn')).toBeTruthy();
  });

  it('calls onPress when pressed', async () => {
    const onPress = jest.fn();
    const { getByTestId } = await renderWithTheme(
      <CCMainButton id="btn" text="Go" type="primary" onPress={onPress} />
    );
    await fireEvent.press(getByTestId('btn'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', async () => {
    const onPress = jest.fn();
    const { getByTestId } = await renderWithTheme(
      <CCMainButton id="btn" text="Disabled" type="primary" onPress={onPress} disabled />
    );
    await fireEvent.press(getByTestId('btn'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('calls onPressWhenDisabled instead of onPress when disabled', async () => {
    const onPress = jest.fn();
    const onPressWhenDisabled = jest.fn();
    const { getByTestId } = await renderWithTheme(
      <CCMainButton
        id="btn"
        text="Disabled"
        type="primary"
        onPress={onPress}
        disabled
        onPressWhenDisabled={onPressWhenDisabled}
      />
    );
    await fireEvent.press(getByTestId('btn'));
    expect(onPress).not.toHaveBeenCalled();
    expect(onPressWhenDisabled).toHaveBeenCalledTimes(1);
  });

  it('shows loadingText when loading is true', async () => {
    const { getByText } = await renderWithTheme(
      <CCMainButton text="Submit" loadingText="Saving..." loading type="primary" onPress={() => {}} />
    );
    expect(getByText('Saving...')).toBeTruthy();
  });

  it('shows regular text when loading is false', async () => {
    const { getByText } = await renderWithTheme(
      <CCMainButton text="Submit" loadingText="Saving..." loading={false} type="primary" onPress={() => {}} />
    );
    expect(getByText('Submit')).toBeTruthy();
  });

  it('renders all button type variants without crashing', async () => {
    for (const type of Object.values(CCMainButtonTypes)) {
      const { getByText } = await renderWithTheme(
        <CCMainButton text={type} type={type} onPress={() => {}} />
      );
      expect(getByText(type)).toBeTruthy();
    }
  });

  it('renders all size variants without crashing', async () => {
    for (const size of Object.values(CCButtonSizesEnum)) {
      const { getByText } = await renderWithTheme(
        <CCMainButton text={size} type="primary" size={size} onPress={() => {}} />
      );
      expect(getByText(size)).toBeTruthy();
    }
  });
});
