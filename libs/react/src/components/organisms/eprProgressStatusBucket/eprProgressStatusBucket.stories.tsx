import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import {EprProgressStatusBucket} from '@coldpbc/components';
import {getEPRMocksFilterByStatus} from "@coldpbc/mocks";
import React from "react";

const meta = {
  title: 'Organisms/EprProgressStatusBucket',
  component: EprProgressStatusBucket,
  tags: ['autodocs'],
  decorators: [withKnobs],
} satisfies Meta<typeof EprProgressStatusBucket>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Upcoming: Story = {
  args: {
    title: 'Upcoming',
    items: getEPRMocksFilterByStatus('Upcoming'),
  },
};

export const InProgress: Story = {
  args: {
    title: 'In Progress',
    items: getEPRMocksFilterByStatus('In Progress'),
  },
};

export const Submitted: Story = {
  args: {
    title: 'Submitted',
    items: getEPRMocksFilterByStatus('Submitted'),
  },
};

export const Empty: Story = {
  args: {
    title: 'Submitted',
    items: [],
  },
  render: (args) => {
    return (
      <div className={'w-full h-screen overflow-x-auto flex flex-row gap-4'}>
        <EprProgressStatusBucket {...args} />
      </div>
    );
  }
};
