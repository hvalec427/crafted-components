import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { View } from 'react-native';

import { CCStepDots } from './CCStepDots';

const meta = {
  title: 'Data Display/StepDots',
  component: CCStepDots,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof CCStepDots>;

export default meta;

export const Steps: StoryObj = {
  render: () => (
    <View style={{ gap: 16 }}>
      <CCStepDots count={3} activeIndex={0} />
      <CCStepDots count={3} activeIndex={1} />
      <CCStepDots count={3} activeIndex={2} />
    </View>
  ),
};
