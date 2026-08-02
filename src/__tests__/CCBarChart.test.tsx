import React from 'react';
import { CCBarChart } from '../components/CCBarChart/CCBarChart';
import { renderWithTheme } from './testUtils';

describe('CCBarChart', () => {
  it('renders a label per datum', async () => {
    const { getByText } = await renderWithTheme(
      <CCBarChart
        data={[
          { label: 'M', value: 0.4 },
          { label: 'T', value: 0.7 },
        ]}
      />
    );
    expect(getByText('M')).toBeTruthy();
    expect(getByText('T')).toBeTruthy();
  });

  it('sets testID from id prop', async () => {
    const { getByTestId } = await renderWithTheme(
      <CCBarChart data={[{ label: 'M', value: 0.4 }]} id="chart" />
    );
    expect(getByTestId('chart')).toBeTruthy();
  });
});
