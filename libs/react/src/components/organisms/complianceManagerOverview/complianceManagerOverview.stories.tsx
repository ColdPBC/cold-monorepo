import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { ComplianceManagerOverview } from '@coldpbc/components';
import { StoryMockProvider } from '@coldpbc/mocks';

const meta: Meta<typeof ComplianceManagerOverview> = {
  title: 'Organisms/ComplianceManagerOverview',
  component: ComplianceManagerOverview,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => (
    <StoryMockProvider>
      <ComplianceManagerOverview />
    </StoryMockProvider>
  ),
};
