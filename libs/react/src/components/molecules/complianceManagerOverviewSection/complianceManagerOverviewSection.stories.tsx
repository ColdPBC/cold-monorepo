import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { ComplianceManagerOverviewSection } from '@coldpbc/components';
import { getComplianceManagerOverviewSectionsMock, StoryMockProvider } from '@coldpbc/mocks';

const meta: Meta<typeof ComplianceManagerOverviewSection> = {
  title: 'Molecules/ComplianceManagerOverviewSection',
  component: ComplianceManagerOverviewSection,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => (
    <StoryMockProvider>
      <ComplianceManagerOverviewSection {...args} />
    </StoryMockProvider>
  ),
  args: {
    ...getComplianceManagerOverviewSectionsMock(),
  },
};
