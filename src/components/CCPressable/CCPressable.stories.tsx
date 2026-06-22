import React from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { CCPressableOpacity } from './CCPressableOpacity';
import { CCText } from '../CCText/CCText';

const meta = {
  title: 'Components/CCPressable',
  component: CCPressableOpacity,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof CCPressableOpacity>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <CCPressableOpacity onPress={fn()}>
      <View style={{ backgroundColor: '#BAEBFF', padding: 12, borderRadius: 8 }}>
        <CCText type="buttonMedium">Press me</CCText>
      </View>
    </CCPressableOpacity>
  ),
};

export const Disabled: Story = {
  render: () => (
    <CCPressableOpacity onPress={fn()} disabled>
      <View style={{ backgroundColor: '#E5E5E5', padding: 12, borderRadius: 8 }}>
        <CCText type="buttonMedium" color="mediumGray">Disabled</CCText>
      </View>
    </CCPressableOpacity>
  ),
};
