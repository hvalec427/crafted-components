import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { CCMainHeader } from './CCMainHeader';

const meta = {
  title: 'CCHeader/CCMainHeader',
  component: CCMainHeader,
  argTypes: {
    standalone: { control: 'boolean' },
  },
} satisfies Meta<typeof CCMainHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Screen Title',
    standalone: true,
  },
};

export const WithBack: Story = {
  args: {
    label: 'With Back Button',
    onBack: fn(),
    standalone: true,
  },
};
