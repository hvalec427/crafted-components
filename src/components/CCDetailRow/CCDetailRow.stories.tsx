import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { View } from 'react-native';

import { CCDetailRow } from './CCDetailRow';

const meta = {
  title: 'Data Display/DetailRow',
  component: CCDetailRow,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof CCDetailRow>;

export default meta;

export const List: StoryObj = {
  render: () => (
    <View style={{ width: 320, gap: 10 }}>
      <CCDetailRow label="Times defeated" value="×27" />
      <CCDetailRow label="Status" value="Collected" />
      <CCDetailRow label="First encountered" value="Level 3" />
    </View>
  ),
};
