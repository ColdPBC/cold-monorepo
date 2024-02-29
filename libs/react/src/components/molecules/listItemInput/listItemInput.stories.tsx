import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { ListItemInput } from '@coldpbc/components';

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
    return <ListItemInput {...args} />;
  },
  args: {
    onChange: (value: string[] | null) => {},
  },
};

export const WithValues: Story = {
  render: args => {
    return <ListItemInput {...args} />;
  },
  args: {
    value: ['Oregon', 'Washington', '11', 'DC'],
    onChange: (value: string[] | null) => {},
  },
};
