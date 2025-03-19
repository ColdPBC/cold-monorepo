import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { ListItem, ListItemProps } from '@coldpbc/components';
import React, { useState } from 'react';
import { userEvent, within, expect } from '@storybook/test';

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
    let listItems = await canvas.findAllByTestId('listItem');
    await expect(listItems).toHaveLength(1);
    let input = await within(listItems[0]).findByRole('textbox', { name: /listInput/i });
    await expect(input).toHaveValue('');

    // Add new items and type values
    const addButton = await canvas.findByTestId('addListItemButton');
    await user.type(input, 'First item');
    await user.click(addButton);

    listItems = await canvas.findAllByTestId('listItem');
    await expect(listItems).toHaveLength(2);
    input = await within(listItems[1]).findByRole('textbox', { name: /listInput/i });
    await user.type(input, 'Second item');


    await user.click(addButton);
    listItems = await canvas.findAllByTestId('listItem');
    await expect(listItems).toHaveLength(3);
    input = await within(listItems[2]).findByRole('textbox', { name: /listInput/i });
    await user.type(input, 'Third item');

    // Verify added items
    listItems = await canvas.findAllByTestId('listItem');
    await expect(listItems).toHaveLength(3);
    await expect(await within(listItems[0]).findByRole('textbox', { name: /listInput/i })).toHaveValue('First item');
    await expect(await within(listItems[1]).findByRole('textbox', { name: /listInput/i })).toHaveValue('Second item');
    await expect(await within(listItems[2]).findByRole('textbox', { name: /listInput/i })).toHaveValue('Third item');

    // Test remove functionality
    const removeButtons = await canvas.findAllByTestId('removeListItem');
    await user.click(removeButtons[1]);

    // wait 2 seconds for transition to complete
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Verify item was removed
    listItems = await canvas.findAllByTestId('listItem');
    await expect(listItems).toHaveLength(2);
    await expect(await within(listItems[0]).findByRole('textbox', { name: /listInput/i })).toHaveValue('First item');
    await expect(await within(listItems[1]).findByRole('textbox', { name: /listInput/i })).toHaveValue('Third item');
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
    let listItems = await canvas.findAllByTestId('listItem');
    await expect(listItems).toHaveLength(4);
    await expect(await within(listItems[0]).findByRole('textbox', { name: /listInput/i })).toHaveValue('Oregon');
    await expect(await within(listItems[1]).findByRole('textbox', { name: /listInput/i })).toHaveValue('Washington');
    await expect(await within(listItems[2]).findByRole('textbox', { name: /listInput/i })).toHaveValue('11');
    await expect(await within(listItems[3]).findByRole('textbox', { name: /listInput/i })).toHaveValue('DC');

    // Test editing values
    let input = await within(listItems[1]).findByRole('textbox', { name: /listInput/i });
    await user.clear(input);
    await user.type(input, 'California');
    await expect(input).toHaveValue('California');

    // Test removing middle item
    const removeButtons = await canvas.findAllByTestId('removeListItem');
    await user.click(removeButtons[1]);
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Verify correct item was removed
    listItems = await canvas.findAllByTestId('listItem');
    await expect(listItems).toHaveLength(3);
    await expect(await within(listItems[0]).findByRole('textbox', { name: /listInput/i })).toHaveValue('Oregon');
    await expect(await within(listItems[1]).findByRole('textbox', { name: /listInput/i })).toHaveValue('11');
    await expect(await within(listItems[2]).findByRole('textbox', { name: /listInput/i })).toHaveValue('DC');

    // Test adding new item
    const addButton = await canvas.findByTestId('addListItemButton');
    await user.click(addButton);

    // Verify new item added
    listItems = await canvas.findAllByTestId('listItem');
    await expect(listItems).toHaveLength(4);
    await expect(await within(listItems[3]).findByRole('textbox', { name: /listInput/i })).toHaveValue('');
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
      data-testid={'listItem'}
    />
  );
};
