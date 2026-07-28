import React from 'react';
import { Text } from 'react-native';
import { CCRow } from '../components/CCLayout/CCRow';
import { CCColumn } from '../components/CCLayout/CCColumn';
import { CCContainer } from '../components/CCLayout/CCContainer';
import { CCSpacer } from '../components/CCLayout/CCSpacer';
import { CCExpanded } from '../components/CCLayout/CCExpanded';
import { renderWithTheme } from './testUtils';

describe('CCRow', () => {
  it('renders children', async () => {
    const { getByText } = await renderWithTheme(
      <CCRow><Text>A</Text><Text>B</Text></CCRow>
    );
    expect(getByText('A')).toBeTruthy();
    expect(getByText('B')).toBeTruthy();
  });

  it('sets testID from id prop', async () => {
    const { getByTestId } = await renderWithTheme(
      <CCRow id="my-row"><Text>X</Text></CCRow>
    );
    expect(getByTestId('my-row')).toBeTruthy();
  });

  it('renders with gap, align, and justify props without crashing', async () => {
    const { getByText } = await renderWithTheme(
      <CCRow gap={8} align="center" justify="space-between">
        <Text>Left</Text>
        <Text>Right</Text>
      </CCRow>
    );
    expect(getByText('Left')).toBeTruthy();
    expect(getByText('Right')).toBeTruthy();
  });
});

describe('CCColumn / CCContainer', () => {
  it('renders children via CCColumn', async () => {
    const { getByText } = await renderWithTheme(
      <CCColumn><Text>A</Text><Text>B</Text></CCColumn>
    );
    expect(getByText('A')).toBeTruthy();
    expect(getByText('B')).toBeTruthy();
  });

  it('sets testID via CCContainer id prop', async () => {
    const { getByTestId } = await renderWithTheme(
      <CCContainer id="my-container"><Text>X</Text></CCContainer>
    );
    expect(getByTestId('my-container')).toBeTruthy();
  });

  it('renders with flex and padding props without crashing', async () => {
    const { getByText } = await renderWithTheme(
      <CCContainer flex={1} padding={16} gap={8}>
        <Text>Inside</Text>
      </CCContainer>
    );
    expect(getByText('Inside')).toBeTruthy();
  });
});

describe('CCSpacer', () => {
  it('renders without crashing with height', async () => {
    await expect(renderWithTheme(<CCSpacer height={16} />)).resolves.not.toThrow();
  });

  it('renders without crashing with width', async () => {
    await expect(renderWithTheme(<CCSpacer width={8} />)).resolves.not.toThrow();
  });

  it('renders without crashing with no props', async () => {
    await expect(renderWithTheme(<CCSpacer />)).resolves.not.toThrow();
  });
});

describe('CCExpanded', () => {
  it('renders without crashing', async () => {
    await expect(renderWithTheme(<CCExpanded />)).resolves.not.toThrow();
  });
});
