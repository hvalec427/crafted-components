import React from 'react';
import { Text } from 'react-native';
import { act, render } from '@testing-library/react-native';
import { CCPopupHost } from '../components/CCPopup/CCPopupHost';
import { popupStore } from '../components/CCPopup/popupService';
import { ColorSchemaProvider } from '../tokens/ColorSchemaContext';
import { schemaStore } from '../tokens/schemaStore';

type AlertPayload = { title: string };

async function renderHost(props: { dismissOnBackdrop?: boolean } = {}) {
  return render(
    <ColorSchemaProvider schema={schemaStore.getSchema()}>
      <CCPopupHost {...props} />
    </ColorSchemaProvider>
  );
}

beforeEach(() => {
  popupStore.register({
    alert: (payload: AlertPayload) => <Text>{payload.title}</Text>,
    simple: () => <Text>Simple popup</Text>,
  });
});

afterEach(() => {
  popupStore.register({});
});

describe('CCPopupHost', () => {
  it('renders without crashing when no popup is shown', async () => {
    await expect(renderHost()).resolves.not.toThrow();
  });

  it('shows popup content after popupStore.show', async () => {
    const { getByText } = await renderHost();
    await act(() => {
      popupStore.show('alert', { title: 'Hello Popup' });
    });
    expect(getByText('Hello Popup')).toBeTruthy();
  });

  it('shows a no-payload popup', async () => {
    const { getByText } = await renderHost();
    await act(() => {
      popupStore.show('simple');
    });
    expect(getByText('Simple popup')).toBeTruthy();
  });

  it('renders with dismissOnBackdrop=false without crashing', async () => {
    await expect(renderHost({ dismissOnBackdrop: false })).resolves.not.toThrow();
  });
});
