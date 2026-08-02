import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { View } from 'react-native';

import { CCPagination } from './CCPagination';

const meta = {
  title: 'Data Display/Pagination',
  component: CCPagination,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof CCPagination>;

export default meta;

export const Basic: StoryObj = {
  render: () => (
    <View style={{ width: 320 }}>
      <CCPagination page={2} totalPages={9} onPrev={() => {}} onNext={() => {}} />
    </View>
  ),
};

export const FirstPage: StoryObj = {
  render: () => (
    <View style={{ width: 320 }}>
      <CCPagination page={1} totalPages={9} onPrev={() => {}} onNext={() => {}} />
    </View>
  ),
};

export const LastPage: StoryObj = {
  render: () => (
    <View style={{ width: 320 }}>
      <CCPagination page={9} totalPages={9} onPrev={() => {}} onNext={() => {}} />
    </View>
  ),
};

const InteractiveExample = () => {
  const [page, setPage] = useState(1);
  const totalPages = 9;
  return (
    <View style={{ width: 320 }}>
      <CCPagination
        page={page}
        totalPages={totalPages}
        onPrev={() => setPage(p => Math.max(1, p - 1))}
        onNext={() => setPage(p => Math.min(totalPages, p + 1))}
      />
    </View>
  );
};

export const Interactive: StoryObj = {
  render: () => <InteractiveExample />,
};
