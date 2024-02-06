import React from 'react';
import { SideBar } from './sideBar';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { StoryMockProvider } from '@coldpbc/mocks';
import { Popover } from '@coldpbc/components';

const meta: Meta<typeof SideBar> = {
  title: 'Organisms/Sidebar',
  component: SideBar,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return (
      <StoryMockProvider>
        <SideBar />
      </StoryMockProvider>
    );
  },
};

export const NoActions: Story = {
  render: (args) => {
    return (
      <StoryMockProvider>
        <SideBar />
      </StoryMockProvider>
    );
  },
  parameters: {
    launchdarkly: {
      flags: {
        showActions261: false,
      },
    },
  },
};
