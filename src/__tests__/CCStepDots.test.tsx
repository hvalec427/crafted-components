import React from 'react';
import { CCStepDots } from '../components/CCStepDots/CCStepDots';
import { renderWithTheme } from './testUtils';

describe('CCStepDots', () => {
  it('renders one dot per count', async () => {
    const { getByTestId } = await renderWithTheme(
      <CCStepDots count={3} activeIndex={0} id="dots" />
    );
    expect(getByTestId('dots-dot-0')).toBeTruthy();
    expect(getByTestId('dots-dot-1')).toBeTruthy();
    expect(getByTestId('dots-dot-2')).toBeTruthy();
  });

  it('sets testID from id prop', async () => {
    const { getByTestId } = await renderWithTheme(
      <CCStepDots count={3} activeIndex={0} id="dots" />
    );
    expect(getByTestId('dots')).toBeTruthy();
  });
});
