import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { StatusChecklist } from '@coldpbc/components';

const meta: Meta<typeof StatusChecklist> = {
  title: 'Molecules/StatusChecklist',
  component: StatusChecklist,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return <StatusChecklist {...args} />;
  },
  args: {
    className: 'w-[347px]',
    checklist: [{
      label: 'Step 1',
      completed: true,
      showProgressBarGradient: false,
    }, {
      label: 'Step 2',
      completed: true,
      showProgressBarGradient: false,
    }, {
      label: 'Step 3',
      progress: 50,
      completed: false,
      showProgressBarGradient: false,
    }]
  },
};

export const WithGradient: Story = {
  render: (args) => {
    return <StatusChecklist {...args} />;
  },
  args: {
    className: 'w-[347px]',
    checklist: [{
      label: 'Step 1',
      completed: true,
      showProgressBarGradient: false,
    }, {
      label: 'Step 2',
      completed: true,
      showProgressBarGradient: true,
    }, {
      label: 'Step 3',
      progress: 0,
      completed: false,
      showProgressBarGradient: false,
    }]
  },
};

export const TwoItems: Story = {
  render: (args) => {
    return <StatusChecklist {...args} />;
  },
  args: {
    className: 'w-[347px]',
    checklist: [{
      label: 'Step 1',
      completed: true,
      showProgressBarGradient: false,
    }, {
      label: 'Step 2',
      completed: true,
      showProgressBarGradient: false,
    }]
  },
};

export const OneItem: Story = {
  render: (args) => {
    return <StatusChecklist {...args} />;
  },
  args: {
    className: 'w-[347px]',
    checklist: [{
      label: 'Step 1',
      completed: true,
      showProgressBarGradient: false,
    }]
  },
};
