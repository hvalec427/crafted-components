import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { View } from 'react-native';

import { CCToast } from './CCToast';
import { CCToastHost } from './CCToastHost';
import { showToast, hideToast } from './toastService';
import { CCMainButton } from '../CCButton/CCMainButton';
import { CCButtonSizesEnum } from '../CCButton/CCMainButton';

const meta = {
  title: 'Feedback/Toast',
  component: CCToast,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof CCToast>;

export default meta;

export const Static: StoryObj = {
  render: () => (
    <View style={{ gap: 12 }}>
      <CCToast message="✓ Item unlocked & equipped!" />
      <CCToast message="Need 3 more Shards for Titan Cleats" />
    </View>
  ),
};

export const Interactive: StoryObj = {
  render: () => (
    <View style={{ minHeight: 200, gap: 12 }}>
      <CCToastHost bottomOffset={0} />

      <CCMainButton
        text="Show unlock toast"
        type="success"
        size={CCButtonSizesEnum.medium}
        onPress={() => showToast({ message: '✓ Item unlocked & equipped!' })}
      />
      <CCMainButton
        text="Show info toast"
        type="outline"
        size={CCButtonSizesEnum.medium}
        onPress={() => showToast({ message: 'Need 3 more Shards for Titan Cleats' })}
      />
      <CCMainButton
        text="Hide immediately"
        type="outline"
        size={CCButtonSizesEnum.medium}
        onPress={hideToast}
      />
    </View>
  ),
};
