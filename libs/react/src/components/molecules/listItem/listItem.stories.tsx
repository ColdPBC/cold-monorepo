import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { ListItem, ListItemProps } from '@coldpbc/components';
import React, { useState } from 'react';

const meta: Meta<typeof ListItem> = {
  title: 'Molecules/ListItem',
  component: ListItem,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  render: args => {
    return <ListItemStory {...args} />;
  },
};

export const WithValues: Story = {
  render: args => {
    return <ListItemStory {...args} />;
  },
  args: {
    value: ['Oregon', 'Washington', '11', 'DC'],
  },
};

const ListItemStory = (props: ListItemProps) => {
  const { onChange, value } = props;
  const [stateValue, setStateValue] = useState<any>(value);
  return (
    <ListItem
      value={stateValue}
      onChange={(value: Array<string | null> | null) => {
        setStateValue(value);
      }}
      input_props={{
        placeholder: 'Enter a value',
      }}
    />
  );
};
