import React from 'react';
import { act, render } from '@testing-library/react-native';
import { CCAlertBannerHost } from '../components/CCAlertBanner/CCAlertBannerHost';
import { alertBannerService } from '../components/CCAlertBanner/alertBannerService';
import { ColorSchemaProvider } from '../tokens/ColorSchemaContext';
import { schemaStore } from '../tokens/schemaStore';

async function renderHost(props: { topOffset?: number } = {}) {
  return render(
    <ColorSchemaProvider schema={schemaStore.getSchema()}>
      <CCAlertBannerHost {...props} />
    </ColorSchemaProvider>
  );
}

describe('CCAlertBannerHost', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('renders nothing initially', async () => {
    const { toJSON } = await renderHost();
    expect(toJSON()).toBeNull();
  });

  it('renders the banner message after alertBannerService.show', async () => {
    const { getByText } = await renderHost();
    await act(() => {
      alertBannerService.show({ message: 'Saved successfully', type: 'success' });
    });
    expect(getByText('Saved successfully')).toBeTruthy();
  });

  it('renders an error banner', async () => {
    const { getByText } = await renderHost();
    await act(() => {
      alertBannerService.show({ message: 'Something went wrong', type: 'error' });
    });
    expect(getByText('Something went wrong')).toBeTruthy();
  });

  it('replaces the current banner when show is called again', async () => {
    const { getByText, queryByText } = await renderHost();
    await act(() => {
      alertBannerService.show({ message: 'First', type: 'success' });
    });
    await act(() => {
      alertBannerService.show({ message: 'Second', type: 'error' });
    });
    expect(getByText('Second')).toBeTruthy();
    expect(queryByText('First')).toBeNull();
  });

  it('passes topOffset prop without crashing', async () => {
    const { toJSON } = await renderHost({ topOffset: 50 });
    expect(toJSON()).toBeNull();
  });
});
