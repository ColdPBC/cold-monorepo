import React from 'react';
import { SideBar } from './sideBar';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { auth0UserMock, StoryMockProvider } from '@coldpbc/mocks';

const meta: Meta<typeof SideBar> = {
  title: 'Organisms/Sidebar',
  component: SideBar,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => {
    return (
      <StoryMockProvider>
        <SideBar />
      </StoryMockProvider>
    );
  },
};

export const NoActions: Story = {
  render: args => {
    return (
      <StoryMockProvider>
        <SideBar />
      </StoryMockProvider>
    );
  },
};

export const ColdAdmin: Story = {
  render: args => {
    return (
      <StoryMockProvider>
        <SideBar />
      </StoryMockProvider>
    );
  },
  parameters: {
    auth0AddOn: {
      user: {
        ...auth0UserMock,
        coldclimate_claims: {
          ...auth0UserMock.coldclimate_claims,
          roles: ['cold:admin'],
        },
      },
    },
  },
};

