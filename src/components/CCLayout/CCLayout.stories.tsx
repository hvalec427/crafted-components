import React from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';

import { CCContainer } from './CCContainer';
import { CCRow } from './CCRow';
import { CCSpacer } from './CCSpacer';
import { CCText } from '../CCText/CCText';

const meta = {
  title: 'Layout/CCLayout',
  component: CCContainer,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof CCContainer>;

export default meta;

const Box = ({ color = '#BAEBFF', label, height }: { color?: string; label?: string; height?: number }) => (
  <View style={{ backgroundColor: color, padding: 8, minWidth: 44, height, alignItems: 'center', justifyContent: 'center', borderRadius: 4 }}>
    <CCText type="subtextReg">{label ?? 'Item'}</CCText>
  </View>
);

const Label = ({ children }: { children: string }) => (
  <CCText type="labelCapsMed" color="mediumGray" style={{ marginBottom: 4 }}>{children}</CCText>
);

export const Container: StoryObj = {
  render: () => (
    <CCContainer gap={8} padding={12} style={{ backgroundColor: '#F7FAFC', borderRadius: 8 }}>
      <Box label="Item 1" />
      <Box label="Item 2" color="#93ECE5" />
      <Box label="Item 3" color="#FFD06D" />
    </CCContainer>
  ),
};

export const ContainerAlign: StoryObj = {
  render: () => (
    <CCContainer gap={12} padding={12} style={{ backgroundColor: '#F7FAFC', borderRadius: 8, width: 320 }}>
      {(['flex-start', 'center', 'flex-end'] as const).map(align => (
        <CCContainer key={align} gap={4}>
          <Label>{align}</Label>
          <CCContainer align={align} gap={6} padding={8} style={{ backgroundColor: '#EDF2F7', borderRadius: 6 }}>
            <Box label="Wide item" />
            <Box label="Sm" color="#93ECE5" />
          </CCContainer>
        </CCContainer>
      ))}
    </CCContainer>
  ),
};

export const ContainerJustify: StoryObj = {
  render: () => (
    <CCContainer gap={12} padding={12} style={{ backgroundColor: '#F7FAFC', borderRadius: 8, width: 320 }}>
      {(['flex-start', 'center', 'flex-end', 'space-between'] as const).map(justify => (
        <CCContainer key={justify} gap={4}>
          <Label>{justify}</Label>
          <View style={{ height: 140, backgroundColor: '#EDF2F7', borderRadius: 6, padding: 8 }}>
            <CCContainer justify={justify} style={{ flex: 1 }}>
              <Box label="A" />
              <Box label="B" color="#93ECE5" />
            </CCContainer>
          </View>
        </CCContainer>
      ))}
    </CCContainer>
  ),
};

export const Row: StoryObj = {
  render: () => (
    <CCRow gap={8} padding={12} align="center" style={{ backgroundColor: '#F7FAFC', borderRadius: 8, width: 320 }}>
      <Box label="Left" />
      <Box label="Center" color="#93ECE5" />
      <Box label="Right" color="#FFD06D" />
    </CCRow>
  ),
};

export const RowAlign: StoryObj = {
  render: () => (
    <CCContainer gap={12} padding={12} style={{ backgroundColor: '#F7FAFC', borderRadius: 8, width: 320 }}>
      {(['flex-start', 'center', 'flex-end'] as const).map(align => (
        <CCContainer key={align} gap={4}>
          <Label>{align}</Label>
          <CCRow align={align} gap={6} padding={6} style={{ height: 60, backgroundColor: '#EDF2F7', borderRadius: 6 }}>
            <Box label="A" />
            <Box label="BB" color="#93ECE5" height={40} />
            <Box label="C" color="#FFD06D" height={28} />
          </CCRow>
        </CCContainer>
      ))}
    </CCContainer>
  ),
};

export const RowJustify: StoryObj = {
  render: () => (
    <CCContainer gap={12} padding={12} style={{ backgroundColor: '#F7FAFC', borderRadius: 8, width: 320 }}>
      {(['flex-start', 'center', 'flex-end', 'space-between', 'space-around'] as const).map(justify => (
        <CCContainer key={justify} gap={4}>
          <Label>{justify}</Label>
          <CCRow justify={justify} align="center" padding={6} style={{ backgroundColor: '#EDF2F7', borderRadius: 6 }}>
            <Box label="A" />
            <Box label="B" color="#93ECE5" />
            <Box label="C" color="#FFD06D" />
          </CCRow>
        </CCContainer>
      ))}
    </CCContainer>
  ),
};

export const SpacerVertical: StoryObj = {
  render: () => (
    <CCContainer padding={12} style={{ backgroundColor: '#F7FAFC', borderRadius: 8 }}>
      <Box label="Above" />
      <View style={{ height: 32, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ position: 'absolute', top: 0, bottom: 0, left: 8, right: 8, borderWidth: 1, borderStyle: 'dashed', borderColor: '#A0AEC0', borderRadius: 2 }} />
        <CCText type="labelCapsMed" color="mediumGray">32px</CCText>
      </View>
      <Box label="Below" color="#93ECE5" />
    </CCContainer>
  ),
};

export const SpacerHorizontal: StoryObj = {
  render: () => (
    <CCRow padding={12} align="center" style={{ backgroundColor: '#F7FAFC', borderRadius: 8 }}>
      <Box label="Left" />
      <View style={{ width: 40, height: 36, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ position: 'absolute', top: 4, bottom: 4, left: 0, right: 0, borderWidth: 1, borderStyle: 'dashed', borderColor: '#A0AEC0', borderRadius: 2 }} />
        <CCText type="labelCapsMed" color="mediumGray">40px</CCText>
      </View>
      <Box label="Right" color="#93ECE5" />
    </CCRow>
  ),
};
