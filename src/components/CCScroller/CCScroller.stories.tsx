import React from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { CCScroller } from './CCScroller';
import { CCText } from '../CCText/CCText';
import { useTheme } from '../../tokens/ColorSchemaContext';

const meta = {
  title: 'Scroller/Scroller',
  component: CCScroller,
  argTypes: {
    avoidKeyboard: { control: 'boolean' },
    paddingTop: { control: 'number' },
    paddingBottom: { control: 'number' },
    bgColor: { control: 'text' },
  },
} satisfies Meta<typeof CCScroller>;

export default meta;
type Story = StoryObj<typeof meta>;

const ScrollContent = () => {
  const theme = useTheme();
  return (
    <>
      {Array.from({ length: 20 }, (_, i) => (
        <View key={i} style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
          <CCText type="bodyReg">Scroll item {i + 1}</CCText>
          <CCText type="subtextReg" color={theme.neutral.mediumGray}>
            Supporting detail for item {i + 1}
          </CCText>
        </View>
      ))}
    </>
  );
};

export const Default: Story = {
  args: {
    children: <ScrollContent />,
  },
  decorators: [
    Story => (
      <View style={{ height: 400 }}>
        <Story />
      </View>
    ),
  ],
};

export const WithPullToRefresh: Story = {
  args: {
    refetch: fn(),
    children: <ScrollContent />,
  },
  decorators: [
    Story => (
      <View style={{ height: 400 }}>
        <Story />
      </View>
    ),
  ],
};
