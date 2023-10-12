import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { AssigneeSelector } from './assigneeSelector';
import { Assignee } from '@coldpbc/interfaces';

const meta = {
  title: 'Molecules/AssigneeSelector',
  component: AssigneeSelector,
  tags: ['autodocs'],
  decorators: [withKnobs],
} satisfies Meta<typeof AssigneeSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithAssignee: Story = {
  args: {
    assignee: {
      name: 'John Doe',
      picture: 'https://picsum.photos/200',
      given_name: 'John',
      family_name: 'Doe',
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    handleAssigneeSelection: (assignee: Assignee | undefined) => {},
    assigneeList: [
      {
        name: 'John Doe',
        picture: 'https://picsum.photos/200',
        given_name: 'John',
        family_name: 'Doe',
      },
      {
        name: 'John Doe',
        picture: 'https://picsum.photos/200',
        given_name: 'John',
        family_name: 'Doe',
      },
    ],
  },
};

export const WithoutUser: Story = {
  args: {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    handleAssigneeSelection: (assignee: Assignee | undefined) => {},
    assigneeList: [
      {
        name: 'John Doe',
        picture: 'https://picsum.photos/200',
        given_name: 'John',
        family_name: 'Doe',
      },
      {
        name: 'John Doe',
        picture: 'https://picsum.photos/200',
        given_name: 'John',
        family_name: 'Doe',
      },
    ],
  },
};
