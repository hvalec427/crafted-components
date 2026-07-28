import React from 'react';
import { Text } from 'react-native';
import { CCBox } from '../components/CCBox/CCBox';
import { renderWithTheme } from './testUtils';

describe('CCBox', () => {
  it('renders children', async () => {
    const { getByText } = await renderWithTheme(
      <CCBox><Text>Content</Text></CCBox>
    );
    expect(getByText('Content')).toBeTruthy();
  });

  it('sets testID from id prop', async () => {
    const { getByTestId } = await renderWithTheme(
      <CCBox id="my-box"><Text>X</Text></CCBox>
    );
    expect(getByTestId('my-box')).toBeTruthy();
  });

  it('renders each size variant without crashing', async () => {
    for (const size of ['small', 'mid', 'large'] as const) {
      const { getByText } = await renderWithTheme(
        <CCBox size={size}><Text>{size}</Text></CCBox>
      );
      expect(getByText(size)).toBeTruthy();
    }
  });

  it('renders with a solid color background string', async () => {
    const { getByText } = await renderWithTheme(
      <CCBox background="#FF0000 as any"><Text>Red</Text></CCBox>
    );
    expect(getByText('Red')).toBeTruthy();
  });

  it('renders with a gradient background without crashing', async () => {
    const { getByText } = await renderWithTheme(
      <CCBox background={{ gradient: ['#FF0000', '#0000FF'] }}>
        <Text>Gradient</Text>
      </CCBox>
    );
    expect(getByText('Gradient')).toBeTruthy();
  });

  it('renders with a custom borderRadius', async () => {
    const { getByText } = await renderWithTheme(
      <CCBox borderRadius={8}><Text>Rounded</Text></CCBox>
    );
    expect(getByText('Rounded')).toBeTruthy();
  });

  it('renders with a border', async () => {
    const { getByText } = await renderWithTheme(
      <CCBox borderColor="#000000" borderWidth={2}><Text>Bordered</Text></CCBox>
    );
    expect(getByText('Bordered')).toBeTruthy();
  });

  it('renders without children', async () => {
    await expect(renderWithTheme(<CCBox />)).resolves.not.toThrow();
  });
});
