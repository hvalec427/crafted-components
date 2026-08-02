import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { View } from 'react-native';

import { CCBarChart } from './CCBarChart';

const meta = {
  title: 'Data Display/BarChart',
  component: CCBarChart,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof CCBarChart>;

export default meta;

export const Weekly: StoryObj = {
  render: () => (
    <View style={{ width: 280 }}>
      <CCBarChart
        data={[
          { label: 'M', value: 0.44 },
          { label: 'T', value: 0.72 },
          { label: 'Today', value: 0.69 },
          { label: 'Future', value: 0.28, opacity: 0.4 },
        ]}
      />
    </View>
  ),
};
