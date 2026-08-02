import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { CCProgressRing } from './CCProgressRing';

const meta = {
  title: 'Data Display/ProgressRing',
  component: CCProgressRing,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof CCProgressRing>;

export default meta;

export const Default: StoryObj = {
  render: () => <CCProgressRing progress={0.68} label="68%" />,
};
