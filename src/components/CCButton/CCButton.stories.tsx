import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { View } from 'react-native';

import { CCMainButton, CCButtonSizesEnum } from './CCMainButton';
import { CCRoundButton, CCRoundButtonSizesEnum } from './CCRoundButton';
import { CCTextButton } from './CCTextButton';
import { CCText } from '../CCText/CCText';
import { icons } from '../../assets/icons';
import { fn } from '@storybook/test';
import { useTheme } from '../../tokens/ColorSchemaContext';

const meta = {
  title: 'Buttons/Button',
  component: CCMainButton,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof CCMainButton>;

export default meta;

const SizeRow = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  const theme = useTheme();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
      <CCText type="caption" color={theme.neutral.mediumGray} style={{ width: 48 }}>{label}</CCText>
      <View style={{ flex: 1, flexDirection: 'row', gap: 12 }}>{children}</View>
    </View>
  );
};

const Col = ({ children }: { children: React.ReactNode }) => (
  <View style={{ gap: 12, width: '100%' }}>{children}</View>
);

// ─── Primary ────────────────────────────────────────────────────────────────

export const Primary: StoryObj = {
  render: () => (
    <Col>
      <SizeRow label="Large">
        <View style={{ flex: 1 }}>
          <CCMainButton text="Primary" type="primary" size={CCButtonSizesEnum.large} onPress={fn()} />
        </View>
        <View style={{ flex: 1, opacity: 0.5 }}>
          <CCMainButton text="Disabled" type="primary" size={CCButtonSizesEnum.large} disabled onPress={fn()} />
        </View>
      </SizeRow>
      <SizeRow label="Medium">
        <View style={{ flex: 1 }}>
          <CCMainButton text="Primary" type="primary" size={CCButtonSizesEnum.medium} onPress={fn()} />
        </View>
        <View style={{ flex: 1, opacity: 0.5 }}>
          <CCMainButton text="Disabled" type="primary" size={CCButtonSizesEnum.medium} disabled onPress={fn()} />
        </View>
      </SizeRow>
      <SizeRow label="Small">
        <View style={{ flex: 1 }}>
          <CCMainButton text="Primary" type="primary" size={CCButtonSizesEnum.small} onPress={fn()} />
        </View>
        <View style={{ flex: 1, opacity: 0.5 }}>
          <CCMainButton text="Disabled" type="primary" size={CCButtonSizesEnum.small} disabled onPress={fn()} />
        </View>
      </SizeRow>
    </Col>
  ),
};

// ─── Secondary ──────────────────────────────────────────────────────────────

export const Secondary: StoryObj = {
  render: () => (
    <Col>
      <SizeRow label="Large">
        <View style={{ flex: 1 }}>
          <CCMainButton text="Secondary" type="secondary" size={CCButtonSizesEnum.large} onPress={fn()} />
        </View>
        <View style={{ flex: 1, opacity: 0.5 }}>
          <CCMainButton text="Disabled" type="secondary" size={CCButtonSizesEnum.large} disabled onPress={fn()} />
        </View>
      </SizeRow>
      <SizeRow label="Medium">
        <View style={{ flex: 1 }}>
          <CCMainButton text="Secondary" type="secondary" size={CCButtonSizesEnum.medium} onPress={fn()} />
        </View>
        <View style={{ flex: 1, opacity: 0.5 }}>
          <CCMainButton text="Disabled" type="secondary" size={CCButtonSizesEnum.medium} disabled onPress={fn()} />
        </View>
      </SizeRow>
      <SizeRow label="Small">
        <View style={{ flex: 1 }}>
          <CCMainButton text="Secondary" type="secondary" size={CCButtonSizesEnum.small} onPress={fn()} />
        </View>
        <View style={{ flex: 1, opacity: 0.5 }}>
          <CCMainButton text="Disabled" type="secondary" size={CCButtonSizesEnum.small} disabled onPress={fn()} />
        </View>
      </SizeRow>
    </Col>
  ),
};

// ─── Round ──────────────────────────────────────────────────────────────────

const RoundLabel = ({ children }: { children: string }) => {
  const theme = useTheme();
  return <CCText type="caption" color={theme.neutral.mediumGray} style={{ width: 48 }}>{children}</CCText>;
};

export const Round: StoryObj = {
  render: () => (
    <Col>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
        <RoundLabel>Large</RoundLabel>
        <CCRoundButton type="primary" size={CCRoundButtonSizesEnum.large} icon={icons.arrow} onPress={fn()} />
        <CCRoundButton type="primary" size={CCRoundButtonSizesEnum.large} icon={icons.arrow} onPress={fn()} disabled />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
        <RoundLabel>Medium</RoundLabel>
        <CCRoundButton type="primary" size={CCRoundButtonSizesEnum.medium} icon={icons.arrow} onPress={fn()} />
        <CCRoundButton type="primary" size={CCRoundButtonSizesEnum.medium} icon={icons.arrow} onPress={fn()} disabled />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
        <RoundLabel>Small</RoundLabel>
        <CCRoundButton type="primary" size={CCRoundButtonSizesEnum.small} icon={icons.arrow} onPress={fn()} />
        <CCRoundButton type="primary" size={CCRoundButtonSizesEnum.small} icon={icons.arrow} onPress={fn()} disabled />
      </View>
    </Col>
  ),
};

// ─── Round · Neutral (e.g. back button) ──────────────────────────────────────

export const RoundNeutral: StoryObj = {
  render: () => (
    <Col>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
        <RoundLabel>Large</RoundLabel>
        <CCRoundButton type="neutral" size={CCRoundButtonSizesEnum.large} icon={icons.arrow} onPress={fn()} />
        <CCRoundButton type="neutral" size={CCRoundButtonSizesEnum.large} icon={icons.arrow} onPress={fn()} disabled />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
        <RoundLabel>Medium</RoundLabel>
        <CCRoundButton type="neutral" size={CCRoundButtonSizesEnum.medium} icon={icons.arrow} onPress={fn()} />
        <CCRoundButton type="neutral" size={CCRoundButtonSizesEnum.medium} icon={icons.arrow} onPress={fn()} disabled />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
        <RoundLabel>Small</RoundLabel>
        <CCRoundButton type="neutral" size={CCRoundButtonSizesEnum.small} icon={icons.arrow} onPress={fn()} />
        <CCRoundButton type="neutral" size={CCRoundButtonSizesEnum.small} icon={icons.arrow} onPress={fn()} disabled />
      </View>
    </Col>
  ),
};

// ─── Text ────────────────────────────────────────────────────────────────────

export const TextButton: StoryObj = {
  render: () => (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 24 }}>
      <CCTextButton text="Text button" onPress={fn()} />
      <CCTextButton text="Disabled" onPress={fn()} disabled />
    </View>
  ),
};
