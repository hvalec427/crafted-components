import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { CCText } from '../components/CCText/CCText';
import { renderWithTheme } from './testUtils';

describe('CCText', () => {
  it('renders its text content', async () => {
    const { getByText } = await renderWithTheme(<CCText>Hello World</CCText>);
    expect(getByText('Hello World')).toBeTruthy();
  });

  it('sets testID from id prop', async () => {
    const { getByTestId } = await renderWithTheme(<CCText id="label-1">Text</CCText>);
    expect(getByTestId('label-1')).toBeTruthy();
  });

  it('falls back to MISSING_LABEL testID when no id is provided', async () => {
    const { getByTestId } = await renderWithTheme(<CCText>Text</CCText>);
    expect(getByTestId('MISSING_LABEL')).toBeTruthy();
  });

  it('calls onPress when the text is pressed', async () => {
    const onPress = jest.fn();
    const { getByText } = await renderWithTheme(<CCText onPress={onPress}>Press me</CCText>);
    await fireEvent.press(getByText('Press me'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders without crashing for every typography variant', async () => {
    const variants = [
      'displayLarge', 'displayMedium', 'h1', 'h2', 'h3', 'title',
      'bodyLarge', 'body', 'bodySmall', 'labelLarge', 'label',
      'caption', 'tiny', 'bodyReg', 'buttonMedium',
    ] as const;
    for (const type of variants) {
      const { getByText } = await renderWithTheme(<CCText type={type}>{type}</CCText>);
      expect(getByText(type)).toBeTruthy();
    }
  });

  it('renders node children', async () => {
    const { getByText } = await renderWithTheme(
      <CCText>{'nested content'}</CCText>
    );
    expect(getByText('nested content')).toBeTruthy();
  });
});
