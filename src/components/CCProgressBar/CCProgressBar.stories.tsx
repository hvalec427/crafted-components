import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { View } from 'react-native';

import { CCProgressBar } from './CCProgressBar';

const meta = {
  title: 'Data Display/ProgressBar',
  component: CCProgressBar,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof CCProgressBar>;

export default meta;

export const Default: StoryObj = {
  render: () => (
    <View style={{ width: 220 }}>
      <CCProgressBar progress={0.58} />
    </View>
  ),
};
