import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { CCTextInput, CCTextInputRef } from './CCTextInput';
import { CCCodeInput } from './CCCodeInput';

const meta = {
  title: 'Input/CCTextInput',
  component: CCTextInput,
  parameters: { layout: 'centered' },
  args: {
    onChangeText: fn(),
    onBlur: fn(),
    onFocus: fn(),
  },
} satisfies Meta<typeof CCTextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placeholder: 'Enter text...', defaultValue: '' },
  render: (args) => <View style={{ width: 300 }}><CCTextInput {...args} /></View>,
};

export const WithValue: Story = {
  args: { defaultValue: 'John Doe' },
  render: (args) => <View style={{ width: 300 }}><CCTextInput {...args} /></View>,
};

export const WithLabel: Story = {
  args: { label: 'Email address', placeholder: 'you@example.com', defaultValue: '' },
  render: (args) => <View style={{ width: 300 }}><CCTextInput {...args} /></View>,
};

export const WithPlaceholderLabel: Story = {
  args: { placeholderLabel: 'Email address', defaultValue: '' },
  render: (args) => <View style={{ width: 300 }}><CCTextInput {...args} /></View>,
};

const WithErrorStory = () => {
  const ref = useRef<CCTextInputRef>(null);
  useEffect(() => { ref.current?.validate(); }, []);
  return (
    <View style={{ width: 300 }}>
      <CCTextInput
        ref={ref}
        placeholder="Required field"
        defaultValue=""
        onChangeText={fn()}
        validators={{ required: { message: 'This field is required' } }}
      />
    </View>
  );
};

export const WithError: StoryObj = {
  render: () => <WithErrorStory />,
};

export const WithWarning: Story = {
  args: { defaultValue: 'Some text', warning: 'Please double-check this value' },
  render: (args) => <View style={{ width: 300 }}><CCTextInput {...args} /></View>,
};

export const WithInstructions: Story = {
  args: {
    label: 'Password',
    defaultValue: '',
    placeholder: '••••••••',
    instructions: 'Must be at least 8 characters',
    instructionsPosition: 'bottom',
  },
  render: (args) => <View style={{ width: 300 }}><CCTextInput {...args} /></View>,
};

export const Disabled: Story = {
  args: { defaultValue: 'Cannot edit this', editable: false },
  render: (args) => (
    <View style={{ width: 300, opacity: 0.5 }}>
      <CCTextInput {...args} />
    </View>
  ),
};

export const Textarea: Story = {
  args: { placeholder: 'Enter multiple lines...', defaultValue: '', multiline: true },
  render: (args) => <View style={{ width: 300 }}><CCTextInput {...args} /></View>,
};

export const CodeInputEmpty: StoryObj = {
  render: () => (
    <CCCodeInput numberOfChar={6} value="" status="other" onChange={fn()} onComplete={fn()} onIncomplete={fn()} />
  ),
};

export const CodeInputPartial: StoryObj = {
  render: () => (
    <CCCodeInput numberOfChar={6} value="123" status="other" onChange={fn()} onComplete={fn()} onIncomplete={fn()} />
  ),
};

export const CodeInputSuccess: StoryObj = {
  render: () => (
    <CCCodeInput numberOfChar={6} value="123456" status="success" message="Code verified" onChange={fn()} onComplete={fn()} onIncomplete={fn()} />
  ),
};

export const CodeInputError: StoryObj = {
  render: () => (
    <CCCodeInput numberOfChar={6} value="123456" status="error" message="Invalid code, please try again" onChange={fn()} onComplete={fn()} onIncomplete={fn()} />
  ),
};

export const CodeInputLoading: StoryObj = {
  render: () => (
    <CCCodeInput numberOfChar={6} value="123456" status="loading" message="Verifying..." onChange={fn()} onComplete={fn()} onIncomplete={fn()} />
  ),
};
