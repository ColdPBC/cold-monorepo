import React, { useState } from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { Input } from './input';
import { InputTypes } from '../../../enums/inputs';
import { IInputProps } from '../../../interfaces/input';

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return <InputStory {...args} />;
  },
  args: {
    idx: 1,
    input_label: 'Name',
    type: InputTypes.Text,
    input_props: {
      name: '',
      value: '',
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onValueChange: (value) => {},
    },
  },
};

export const Currency: Story = {
  render: (args) => {
    return <InputStory {...args} />;
  },
  args: {
    idx: 1,
    input_label: 'Currency',
    type: InputTypes.Currency,
    input_props: {
      name: '',
      value: '',
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onValueChange: (value) => {},
    },
  },
};

export const Number: Story = {
  render: (args) => {
    return <InputStory {...args} />;
  },
  args: {
    idx: 1,
    input_label: 'Number',
    type: InputTypes.Number,
    input_props: {
      name: '',
      value: '',
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onValueChange: (value) => {},
    },
  },
};

export const Select: Story = {
  render: (args) => {
    return <InputStory {...args} />;
  },
  args: {
    idx: 1,
    input_label: 'State',
    type: InputTypes.Select,
    input_props: {
      name: 'state',
      value: '',
      options: [
        {
          id: 1,
          name: 'Minnesota',
          value: 'Minnesota',
        },
        {
          id: 2,
          name: 'Wisconsin',
          value: 'Wisconsin',
        },
      ],
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onValueChange: (value) => {},
      defaultValue: 'Minnesota',
    },
  },
};

const InputStory = (props: IInputProps) => {
  const {
    input_props,
    input_label,
    input_label_props,
    numeric_input_props,
    container_classname,
    idx,
    type,
  } = props;
  const [value, setValue] = useState<any>(input_props?.defaultValue || '');
  return (
    <Input
      {...props}
      input_props={{
        ...input_props,
        value: value,
        onValueChange: (value) => {
          setValue(value);
        },
        name: input_props?.name || '',
      }}
    />
  );
};
