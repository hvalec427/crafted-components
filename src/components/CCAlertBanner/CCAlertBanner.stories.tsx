import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { View } from 'react-native';

import { CCAlertBanner } from './CCAlertBanner';
import { CCAlertBannerHost } from './CCAlertBannerHost';
import { showAlertBanner, hideAlertBanner } from './alertBannerService';
import { CCMainButton } from '../CCButton/CCMainButton';
import { CCButtonSizesEnum } from '../CCButton/CCMainButton';
import { fn } from '@storybook/test';

const meta = {
  title: 'Feedback/AlertBanner',
  component: CCAlertBanner,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof CCAlertBanner>;

export default meta;

// ─── Static previews ────────────────────────────────────────────────────────

export const Success: StoryObj = {
  render: () => (
    <View style={{ gap: 12 }}>
      <CCAlertBanner type="success" message="Changes saved successfully" onDismiss={fn()} />
      <CCAlertBanner type="success" message="Account verified" onDismiss={fn()} />
    </View>
  ),
};

export const Error: StoryObj = {
  render: () => (
    <View style={{ gap: 12 }}>
      <CCAlertBanner type="error" message="Please enter username and password" onDismiss={fn()} />
      <CCAlertBanner type="error" message="Something went wrong, please try again" onDismiss={fn()} />
    </View>
  ),
};

export const WithoutDismiss: StoryObj = {
  render: () => (
    <View style={{ gap: 12 }}>
      <CCAlertBanner type="success" message="Auto-dismisses after 3 seconds" />
      <CCAlertBanner type="error" message="No close button" />
    </View>
  ),
};

// ─── Interactive (with host) ─────────────────────────────────────────────────

export const Interactive: StoryObj = {
  render: () => (
    <View style={{ minHeight: 300, gap: 12 }}>
      <CCAlertBannerHost topOffset={0} />

      <CCMainButton
        text="Show success"
        type="success"
        size={CCButtonSizesEnum.medium}
        onPress={() => showAlertBanner({ message: 'Changes saved successfully', type: 'success' })}
      />
      <CCMainButton
        text="Show error"
        type="fail"
        size={CCButtonSizesEnum.medium}
        onPress={() => showAlertBanner({ message: 'Please enter username and password', type: 'error' })}
      />
      <CCMainButton
        text="Show success (long message)"
        type="success"
        size={CCButtonSizesEnum.medium}
        onPress={() =>
          showAlertBanner({ message: 'Your profile has been updated and saved to the cloud', type: 'success', duration: 5000 })
        }
      />
      <CCMainButton
        text="Hide immediately"
        type="outline"
        size={CCButtonSizesEnum.medium}
        onPress={hideAlertBanner}
      />
    </View>
  ),
};
