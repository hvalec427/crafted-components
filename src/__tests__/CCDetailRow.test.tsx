import React from 'react';
import { CCDetailRow } from '../components/CCDetailRow/CCDetailRow';
import { renderWithTheme } from './testUtils';

describe('CCDetailRow', () => {
  it('renders the label and value', async () => {
    const { getByText } = await renderWithTheme(
      <CCDetailRow label="Times defeated" value="×27" />
    );
    expect(getByText('Times defeated')).toBeTruthy();
    expect(getByText('×27')).toBeTruthy();
  });

  it('sets testID from id prop', async () => {
    const { getByTestId } = await renderWithTheme(
      <CCDetailRow label="Status" value="Collected" id="detail-row" />
    );
    expect(getByTestId('detail-row')).toBeTruthy();
  });
});
