import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { StoryMockProvider } from '@coldpbc/mocks';
import {ErrorPage} from "@coldpbc/components";

const meta: Meta<typeof ErrorPage> = {
  title: 'Application/ErrorPage',
  component: ErrorPage,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    error: 'A connection error occurred. Please refresh the page or re-login.',
  },
  render: (args) => {
    return (
      <StoryMockProvider>
        <ErrorPage {...args} />
      </StoryMockProvider>
    );
  },
};

export const AlreadyAcceptedInvitation: Story = {
  args: {
    error: 'This invitation has either expired or already been used. If you have already accepted the invite, try logging in again with the button below.',
  },
  render: (args) => {
    return (
      <StoryMockProvider>
        <ErrorPage {...args} />
      </StoryMockProvider>
    );
  },
};
