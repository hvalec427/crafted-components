import React from 'react';
import { Text } from 'react-native';
import { CCButtonGroup } from '../components/CCButton/CCButtonGroup';
import { renderWithTheme } from './testUtils';

describe('CCButtonGroup', () => {
  it('renders children', async () => {
    const { getByText } = await renderWithTheme(
      <CCButtonGroup><Text>Button</Text></CCButtonGroup>
    );
    expect(getByText('Button')).toBeTruthy();
  });

  it('renders multiple children', async () => {
    const { getByText } = await renderWithTheme(
      <CCButtonGroup>
        <Text>Primary</Text>
        <Text>Secondary</Text>
      </CCButtonGroup>
    );
    expect(getByText('Primary')).toBeTruthy();
    expect(getByText('Secondary')).toBeTruthy();
  });

  it('renders in vertical layout without crashing', async () => {
    const { getByText } = await renderWithTheme(
      <CCButtonGroup vertical>
        <Text>Top</Text>
        <Text>Bottom</Text>
      </CCButtonGroup>
    );
    expect(getByText('Top')).toBeTruthy();
    expect(getByText('Bottom')).toBeTruthy();
  });

  it('renders an extra component above the buttons', async () => {
    const { getByText } = await renderWithTheme(
      <CCButtonGroup extraComponent={<Text>Extra</Text>}>
        <Text>Button</Text>
      </CCButtonGroup>
    );
    expect(getByText('Extra')).toBeTruthy();
    expect(getByText('Button')).toBeTruthy();
  });

  it('accepts a custom background color', async () => {
    const { getByText } = await renderWithTheme(
      <CCButtonGroup bgColor="#123456"><Text>Colored</Text></CCButtonGroup>
    );
    expect(getByText('Colored')).toBeTruthy();
  });
});
