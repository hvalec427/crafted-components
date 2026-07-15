import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import type { ColorSchemaName } from '../../tokens/colorSchema';
import { schemaStore } from '../../tokens/schemaStore';

import defaultBase from '../../tokens/schemas/default.json';
import oceanBase from '../../tokens/schemas/ocean.json';
import sunsetBase from '../../tokens/schemas/sunset.json';

const SCHEMAS: { name: ColorSchemaName; primary: string }[] = [
  { name: 'default', primary: defaultBase.primary },
  { name: 'ocean',   primary: oceanBase.primary },
  { name: 'sunset',  primary: sunsetBase.primary },
];

const GlobalControlsComponent = () => {
  const [active, setActive] = useState<ColorSchemaName>('default');

  const handleSelect = (name: ColorSchemaName) => {
    schemaStore.set(name);
    setActive(name);
  };

  return (
    <View style={{ padding: 16, gap: 24 }}>
      <View style={{ gap: 10 }}>
        <Text style={{ fontSize: 11, fontWeight: '600', color: '#9C9EA3', textTransform: 'uppercase', letterSpacing: 0.8 }}>
          Color Schema
        </Text>
        <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
          {SCHEMAS.map(({ name, primary }) => {
            const isActive = name === active;
            return (
              <Pressable key={name} onPress={() => handleSelect(name)}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 8,
                    paddingHorizontal: 14,
                    paddingVertical: 8,
                    borderRadius: 20,
                    borderWidth: 1.5,
                    borderColor: isActive ? primary : '#E5E5E5',
                    backgroundColor: isActive ? primary : '#ffffff',
                  }}
                >
                  <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: isActive ? '#ffffff' : primary }} />
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: isActive ? '600' : '400',
                      color: isActive ? '#ffffff' : '#585C62',
                      textTransform: 'capitalize',
                    }}
                  >
                    {name}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={{ gap: 8 }}>
        <Text style={{ fontSize: 11, fontWeight: '600', color: '#9C9EA3', textTransform: 'uppercase', letterSpacing: 0.8 }}>
          Preview
        </Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          {SCHEMAS.find(s => s.name === active) && (
            Object.entries(
              active === 'default' ? defaultBase :
              active === 'ocean'   ? oceanBase   :
              sunsetBase
            ).map(([key, value]) => (
              <View key={key} style={{ alignItems: 'center', gap: 4 }}>
                <View style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: value }} />
                <Text style={{ fontSize: 9, color: '#9C9EA3', textTransform: 'capitalize' }}>{key}</Text>
              </View>
            ))
          )}
        </View>
      </View>
    </View>
  );
};

const meta = {
  title: 'Global/Controls',
  component: GlobalControlsComponent,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof GlobalControlsComponent>;

export default meta;

export const Controls: StoryObj = {
  render: () => <GlobalControlsComponent />,
};
