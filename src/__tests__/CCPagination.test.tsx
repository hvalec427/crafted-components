import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { CCPagination } from '../components/CCPagination/CCPagination';
import { renderWithTheme } from './testUtils';

describe('CCPagination', () => {
  it('renders the page count', async () => {
    const { getByText } = await renderWithTheme(
      <CCPagination page={2} totalPages={9} onPrev={jest.fn()} onNext={jest.fn()} />
    );
    expect(getByText('Page 2 of 9')).toBeTruthy();
  });

  it('calls onPrev when Prev is pressed', async () => {
    const onPrev = jest.fn();
    const { getByText } = await renderWithTheme(
      <CCPagination page={2} totalPages={9} onPrev={onPrev} onNext={jest.fn()} />
    );
    await fireEvent.press(getByText('← Prev'));
    expect(onPrev).toHaveBeenCalledTimes(1);
  });

  it('calls onNext when Next is pressed', async () => {
    const onNext = jest.fn();
    const { getByText } = await renderWithTheme(
      <CCPagination page={2} totalPages={9} onPrev={jest.fn()} onNext={onNext} />
    );
    await fireEvent.press(getByText('Next →'));
    expect(onNext).toHaveBeenCalledTimes(1);
  });

  it('disables Prev on the first page by default', async () => {
    const onPrev = jest.fn();
    const { getByText } = await renderWithTheme(
      <CCPagination page={1} totalPages={9} onPrev={onPrev} onNext={jest.fn()} />
    );
    await fireEvent.press(getByText('← Prev'));
    expect(onPrev).not.toHaveBeenCalled();
  });

  it('disables Next on the last page by default', async () => {
    const onNext = jest.fn();
    const { getByText } = await renderWithTheme(
      <CCPagination page={9} totalPages={9} onPrev={jest.fn()} onNext={onNext} />
    );
    await fireEvent.press(getByText('Next →'));
    expect(onNext).not.toHaveBeenCalled();
  });

  it('sets testID from id prop', async () => {
    const { getByTestId } = await renderWithTheme(
      <CCPagination page={1} totalPages={5} onPrev={jest.fn()} onNext={jest.fn()} id="pager" />
    );
    expect(getByTestId('pager')).toBeTruthy();
  });
});
