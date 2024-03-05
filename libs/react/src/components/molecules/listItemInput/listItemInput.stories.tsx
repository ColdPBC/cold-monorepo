import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { ListItemInput, ListItemInputProps } from '@coldpbc/components';
import React, { useState } from 'react';

const meta: Meta<typeof ListItemInput> = {
  title: 'Molecules/ListItemInput',
  component: ListItemInput,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  render: args => {
    return <ListItemInputStory {...args} />;
  },
  args: {
    onChange: (value: string[] | null) => {},
  },
};

export const WithValues: Story = {
  render: args => {
    return <ListItemInputStory {...args} />;
  },
  args: {
    value: ['Oregon', 'Washington', '11', 'DC'],
    onChange: (value: string[] | null) => {},
  },
};

const ListItemInputStory = (props: ListItemInputProps) => {
  const { onChange, value } = props;
  const [stateValue, setStateValue] = useState<any>(value);
  return (
    <ListItemInput
      value={stateValue}
      onChange={(value: string[] | null) => {
        setStateValue(value);
      }}
    />
  );
};
