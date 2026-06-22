import type { Meta, StoryObj } from '@storybook/react';

import { CCIcon } from './CCIcon';
import { icons } from '../../assets/icons';

const meta = {
  title: 'Media/CCIcon',
  component: CCIcon,
  parameters: { layout: 'centered' },
  argTypes: {
    tintColor: {
      control: 'select',
      options: [
        undefined,
        'primaryBlue',
        'error',
        'success',
        'darkGray',
        'textColorDark',
        'white',
        'black',
      ],
    },
    width: { control: 'number' },
    height: { control: 'number' },
    resizeMode: {
      control: 'select',
      options: ['contain', 'cover', 'stretch', 'center'],
    },
  },
  args: {
    source: icons.arrow,
    width: 32,
    height: 32,
  },
} satisfies Meta<typeof CCIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Arrow: Story = {
  args: { source: icons.arrow, width: 32, height: 32 },
};

export const ArrowTintBlue: Story = {
  args: { source: icons.arrow, width: 32, height: 32, tintColor: 'primaryBlue' },
};

export const ArrowTintError: Story = {
  args: { source: icons.arrow, width: 32, height: 32, tintColor: 'error' },
};

export const ArrowSize16: Story = {
  args: { source: icons.arrow, width: 16, height: 16 },
};

export const ArrowSize48: Story = {
  args: { source: icons.arrow, width: 48, height: 48 },
};
