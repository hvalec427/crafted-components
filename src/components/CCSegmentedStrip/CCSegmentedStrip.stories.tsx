import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { View } from 'react-native';

import { CCSegmentedStrip } from './CCSegmentedStrip';

const meta = {
  title: 'Data Display/SegmentedStrip',
  component: CCSegmentedStrip,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof CCSegmentedStrip>;

export default meta;

export const Streak: StoryObj = {
  render: () => (
    <View style={{ width: 280 }}>
      <CCSegmentedStrip segments={3} filled={2} />
    </View>
  ),
};
