import React from 'react';
import { Text } from 'react-native';
import { CCScreenWrapper } from '../components/CCScreenWrapper/CCScreenWrapper';
import { renderWithTheme } from './testUtils';

describe('CCScreenWrapper', () => {
  it('renders children', async () => {
    const { getByText } = await renderWithTheme(
      <CCScreenWrapper><Text>Page content</Text></CCScreenWrapper>
    );
    expect(getByText('Page content')).toBeTruthy();
  });

  it('renders the header', async () => {
    const { getByText } = await renderWithTheme(
      <CCScreenWrapper header={<Text>My Header</Text>}>
        <Text>Body</Text>
      </CCScreenWrapper>
    );
    expect(getByText('My Header')).toBeTruthy();
    expect(getByText('Body')).toBeTruthy();
  });

  it('renders a bottomBarComponent', async () => {
    const { getByText } = await renderWithTheme(
      <CCScreenWrapper bottomBarComponent={<Text>Tab Bar</Text>}>
        <Text>Content</Text>
      </CCScreenWrapper>
    );
    expect(getByText('Tab Bar')).toBeTruthy();
  });

  it('renders with dark status bar theme without crashing', async () => {
    const { getByText } = await renderWithTheme(
      <CCScreenWrapper theme="dark"><Text>Dark screen</Text></CCScreenWrapper>
    );
    expect(getByText('Dark screen')).toBeTruthy();
  });

  it('renders with noTopSafeArea without crashing', async () => {
    const { getByText } = await renderWithTheme(
      <CCScreenWrapper noTopSafeArea><Text>No top</Text></CCScreenWrapper>
    );
    expect(getByText('No top')).toBeTruthy();
  });

  it('renders with noBottomSafeArea without crashing', async () => {
    const { getByText } = await renderWithTheme(
      <CCScreenWrapper noBottomSafeArea><Text>No bottom</Text></CCScreenWrapper>
    );
    expect(getByText('No bottom')).toBeTruthy();
  });
});
