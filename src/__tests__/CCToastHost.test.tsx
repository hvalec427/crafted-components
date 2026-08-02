import React from 'react';
import { act, render } from '@testing-library/react-native';
import { CCToastHost } from '../components/CCToast/CCToastHost';
import { toastService } from '../components/CCToast/toastService';
import { ColorSchemaProvider } from '../tokens/ColorSchemaContext';
import { schemaStore } from '../tokens/schemaStore';

async function renderHost(props: { bottomOffset?: number } = {}) {
  return render(
    <ColorSchemaProvider schema={schemaStore.getSchema()}>
      <CCToastHost {...props} />
    </ColorSchemaProvider>
  );
}

describe('CCToastHost', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('renders nothing initially', async () => {
    const { toJSON } = await renderHost();
    expect(toJSON()).toBeNull();
  });

  it('renders the toast message after toastService.show', async () => {
    const { getByText } = await renderHost();
    await act(() => {
      toastService.show({ message: 'Item unlocked & equipped!' });
    });
    expect(getByText('Item unlocked & equipped!')).toBeTruthy();
  });

  it('replaces the current toast when show is called again', async () => {
    const { getByText, queryByText } = await renderHost();
    await act(() => {
      toastService.show({ message: 'First' });
    });
    await act(() => {
      toastService.show({ message: 'Second' });
    });
    expect(getByText('Second')).toBeTruthy();
    expect(queryByText('First')).toBeNull();
  });

  it('passes bottomOffset prop without crashing', async () => {
    const { toJSON } = await renderHost({ bottomOffset: 50 });
    expect(toJSON()).toBeNull();
  });
});
