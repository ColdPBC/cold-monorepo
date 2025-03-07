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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Initial state check
    let inputs = canvas.getAllByRole('textbox', { name: /listInput/i });
    expect(inputs).toHaveLength(1);
    expect(inputs[0]).toHaveValue('');

    // Add new items and type values
    const addButton = canvas.getByRole('button', { name: /plus/i });
    await user.type(inputs[0], 'First item');
    await user.click(addButton);
    await user.type(canvas.getAllByRole('textbox')[1], 'Second item');

    // Verify added items
    inputs = canvas.getAllByRole('textbox');
    expect(inputs).toHaveLength(2);
    expect(inputs[0]).toHaveValue('First item');
    expect(inputs[1]).toHaveValue('Second item');

    // Test remove functionality
    const removeButtons = canvas.getAllByRole('button', { name: /close/i });
    await user.click(removeButtons[0]);

    // Verify item was removed
    inputs = canvas.getAllByRole('textbox');
    expect(inputs).toHaveLength(1);
    expect(inputs[0]).toHaveValue('Second item');
  }
};

export const WithValues: Story = {
  render: args => {
    return <ListItemStory {...args} />;
  },
  args: {
    value: ['Oregon', 'Washington', '11', 'DC'],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Initial state check
    let inputs = canvas.getAllByRole('textbox', { name: /listInput/i });
    expect(inputs).toHaveLength(4);
    expect(inputs[0]).toHaveValue('Oregon');
    expect(inputs[1]).toHaveValue('Washington');
    expect(inputs[2]).toHaveValue('11');
    expect(inputs[3]).toHaveValue('DC');

    // Test editing values
    await user.clear(inputs[1]);
    await user.type(inputs[1], 'California');
    expect(inputs[1]).toHaveValue('California');

    // Test removing middle item
    const removeButtons = canvas.getAllByRole('button', { name: /close/i });
    await user.click(removeButtons[1]);

    // Verify correct item was removed
    inputs = canvas.getAllByRole('textbox');
    expect(inputs).toHaveLength(3);
    expect(inputs[0]).toHaveValue('Oregon');
    expect(inputs[1]).toHaveValue('11');
    expect(inputs[2]).toHaveValue('DC');

    // Test adding new item
    const addButton = canvas.getByRole('button', { name: /plus/i });
    await user.click(addButton);

    // Verify new item added
    inputs = canvas.getAllByRole('textbox');
    expect(inputs).toHaveLength(4);
    expect(inputs[3]).toHaveValue('');
  }
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
