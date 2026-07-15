import type { Meta, StoryObj } from '@storybook/react';

import { CCImage } from './CCImage';

const meta = {
  title: 'Media/Image',
  component: CCImage,
  parameters: { layout: 'centered' },
  argTypes: {
    url: { control: 'text' },
    width: { control: 'number' },
    height: { control: 'number' },
    aspectRatio: { control: 'number' },
    opacity: { control: { type: 'range', min: 0, max: 1, step: 0.1 } },
    resizeMode: {
      control: 'select',
      options: ['contain', 'cover', 'stretch', 'center'],
    },
    tintColor: {
      control: 'select',
      options: [
        undefined,
        'primaryBlue',
        'error',
        'success',
        'darkGray',
        'white',
        'black',
      ],
    },
  },
  args: {
    url: 'https://picsum.photos/200/150',
    width: 200,
    height: 150,
  },
} satisfies Meta<typeof CCImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    url: 'https://picsum.photos/200/150',
    width: 200,
    height: 150,
  },
};

export const AspectRatio16x9: Story = {
  args: {
    url: 'https://picsum.photos/320/180',
    width: 320,
    aspectRatio: 16 / 9,
  },
};

export const AspectRatio1x1: Story = {
  args: {
    url: 'https://picsum.photos/200/200',
    width: 160,
    aspectRatio: 1,
  },
};

export const Opacity50: Story = {
  args: {
    url: 'https://picsum.photos/200/150',
    width: 200,
    height: 150,
    opacity: 0.5,
  },
};
