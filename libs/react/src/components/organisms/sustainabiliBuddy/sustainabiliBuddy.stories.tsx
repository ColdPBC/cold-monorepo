import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { StoryMockProvider } from '@coldpbc/mocks';
import { SustainabiliBuddy } from "@coldpbc/components";

const meta: Meta<typeof SustainabiliBuddy> = {
  title: 'Organisms/SustainabiliBuddy',
  component: SustainabiliBuddy,
  tags: ['autodocs'],
  decorators: [withKnobs],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <StoryMockProvider>
      <SustainabiliBuddy />
    </StoryMockProvider>
  ),
};
