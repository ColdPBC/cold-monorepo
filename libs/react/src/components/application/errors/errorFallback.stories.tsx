import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { StoryMockProvider } from '@coldpbc/mocks';
import {ApplicationToaster, ErrorFallback} from "@coldpbc/components";

const meta: Meta<typeof ErrorFallback> = {
  title: 'Application/ErrorFallback',
  component: ErrorFallback,
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
        <ErrorFallback {...args} />
        <ApplicationToaster/>
      </StoryMockProvider>
    );
  },
};
