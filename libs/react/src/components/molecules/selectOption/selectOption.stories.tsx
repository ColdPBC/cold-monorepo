import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { SelectOption, SelectOptionProps } from './selectOption';

const meta = {
  title: 'Molecules/SelectOption',
  component: SelectOption,
  tags: ['autodocs'],
  decorators: [withKnobs],
} satisfies Meta<typeof SelectOption>;

export default meta;
type Story = StoryObj<typeof meta>;

const Component = (props: SelectOptionProps) => {
  const [value, setValue] = React.useState<string | string[] | null>(
    props.value,
  );

  const onChange = (value: string | null) => {
    setValue(value);
  };

  return <SelectOption {...props} onChange={onChange} value={value} />;
};

export const Default: Story = {
  render: (args) => {
    return <Component {...args} />;
  },
  args: {
    value: null,
    options: [
      'Limited (0-5% Year-over-Year)',
      'Moderated (5-15% Year-over-Year)',
      'Aggressive (>15% Year-over-Year)',
    ],
  },
};

export const HorizontalLayout: Story = {
  render: (args) => {
    return <Component {...args} />;
  },
  args: {
    value: null,
    options: [
      'North America United States',
      'North America Canada, Mexico, Central America',
      'South America',
      'Europe',
      'Asia',
      'Africa',
      'Australia',
      'No Applicable',
    ],
  },
};

export const MultiSelect: Story = {
  render: (args) => {
    return <Component {...args} />;
  },
  args: {
    value: null,
    options: [
      'Limited (0-5% Year-over-Year)',
      'Moderated (5-15% Year-over-Year)',
      'Aggressive (>15% Year-over-Year)',
    ],
    isMultiSelect: true,
  },
};

export const MultiSelectHorizontalLayout: Story = {
  render: (args) => {
    return <Component {...args} />;
  },
  args: {
    value: null,
    options: [
      'North America United States',
      'North America Canada, Mexico, Central America',
      'South America',
      'Europe',
      'Asia',
      'Africa',
      'Australia',
      'No Applicable',
    ],
    isMultiSelect: true,
  },
};
