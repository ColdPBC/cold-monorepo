import React, { useState } from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { InputTypes } from '@coldpbc/enums';
import { FormInput } from './formInput';
import { FormInputProps } from '@coldpbc/interfaces';

const meta: Meta<typeof FormInput> = {
  title: 'Molecules/FormInput',
  component: FormInput,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return <FormInputStory {...args} />;
  },
  args: {
    name: '',
    value: '',
    idx: 1,
    input_label: 'Name',
    type: InputTypes.Text,
  },
};

export const Number: Story = {
  render: (args) => {
    return <FormInputStory {...args} />;
  },
  args: {
    name: '',
    value: '',
    idx: 1,
    input_label: 'Amount of Carbon Emissions',
    type: InputTypes.Number,
  },
};

export const Currency: Story = {
  render: (args) => {
    return <FormInputStory {...args} />;
  },
  args: {
    name: '',
    value: '',
    idx: 1,
    input_label: 'Profit on Products Year 2022',
    type: InputTypes.Currency,
  },
};

export const Select: Story = {
  render: (args) => {
    return <FormInputStory {...args} />;
  },
  args: {
    name: 'state',
    value: '',
    idx: 1,
    input_label: 'State',
    type: InputTypes.Select,
    default_value: 'Minnesota',
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
  },
};

const FormInputStory = (props: FormInputProps) => {
  const {
    onFieldUpdated,
    name,
    idx,
    input_label,
    type,
    placeholder,
    options,
    default_value,
    input_classname,
    label_classname,
    container_classname,
    auto_complete,
    value,
  } = props;
  const [stateValue, setStateValue] = useState<any>(value || default_value);
  return (
    <FormInput
      {...props}
      onFieldUpdated={(name, value) => {
        setStateValue(value);
      }}
      idx={idx}
      input_label={input_label}
      type={type}
      input_classname={input_classname}
      label_classname={label_classname}
      container_classname={container_classname}
      placeholder={placeholder}
      auto_complete={auto_complete}
      options={options}
      name={name}
      default_value={default_value}
      value={stateValue}
    />
  );
};
