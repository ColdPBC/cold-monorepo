import { StoryMockProvider, getActionHandler, getCompliancePageHandler } from '@coldpbc/mocks';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { ComplianceOverview } from '@coldpbc/components';

const meta: Meta<typeof ComplianceOverview> = {
  title: 'Pages/Compliance',
  component: ComplianceOverview,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => (
    <StoryMockProvider handlers={getCompliancePageHandler.default}>
      <ComplianceOverview />
    </StoryMockProvider>
  ),
};

export const Processing: Story = {
  render: args => (
    <StoryMockProvider handlers={getCompliancePageHandler.processing}>
      <ComplianceOverview />
    </StoryMockProvider>
  ),
};

export const Activate: Story = {
  render: args => (
    <StoryMockProvider handlers={getCompliancePageHandler.activate}>
      <ComplianceOverview />
    </StoryMockProvider>
  ),
};
