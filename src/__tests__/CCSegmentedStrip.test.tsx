import React from 'react';
import { CCSegmentedStrip } from '../components/CCSegmentedStrip/CCSegmentedStrip';
import { renderWithTheme } from './testUtils';

describe('CCSegmentedStrip', () => {
  it('renders one segment per count', async () => {
    const { getByTestId } = await renderWithTheme(
      <CCSegmentedStrip segments={3} filled={2} id="strip" />
    );
    expect(getByTestId('strip-segment-0')).toBeTruthy();
    expect(getByTestId('strip-segment-1')).toBeTruthy();
    expect(getByTestId('strip-segment-2')).toBeTruthy();
  });

  it('sets testID from id prop', async () => {
    const { getByTestId } = await renderWithTheme(
      <CCSegmentedStrip segments={3} filled={2} id="strip" />
    );
    expect(getByTestId('strip')).toBeTruthy();
  });
});
