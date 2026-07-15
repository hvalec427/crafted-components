import React from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';

import { CCText } from './CCText';

const meta = {
  title: 'Components/Text',
  component: CCText,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof CCText>;

export default meta;

export const AllStyles: StoryObj = {
  render: () => (
    <View style={{ gap: 12, padding: 16, width: 320 }}>
      <CCText type="h1">h1 — Heading 1</CCText>
      <CCText type="h1Bold">h1Bold — Heading 1 Bold</CCText>
      <CCText type="h2">h2 — Heading 2</CCText>
      <CCText type="h2Bold">h2Bold — Heading 2 Bold</CCText>
      <CCText type="h3">h3 — Heading 3</CCText>
      <CCText type="h3Bold">h3Bold — Heading 3 Bold</CCText>
      <CCText type="bodyReg">bodyReg — Body Regular</CCText>
      <CCText type="bodyRegItalic">bodyRegItalic — Body Italic</CCText>
      <CCText type="bodySemiBold">bodySemiBold — Body Semi-Bold</CCText>
      <CCText type="bodySemiBoldItalic">bodySemiBoldItalic — Body Semi-Bold Italic</CCText>
      <CCText type="buttonMedium">buttonMedium — Button Medium</CCText>
      <CCText type="buttonBold">buttonBold — Button Bold</CCText>
      <CCText type="subtextReg">subtextReg — Subtext Regular</CCText>
      <CCText type="subtextSemiBold">subtextSemiBold — Subtext Semi-Bold</CCText>
      <CCText type="labelCapsMed">labelCapsMed — Label Caps Medium</CCText>
      <CCText type="labelCapsBold">labelCapsBold — Label Caps Bold</CCText>
      <CCText type="tagsScanned">42</CCText>
    </View>
  ),
};
