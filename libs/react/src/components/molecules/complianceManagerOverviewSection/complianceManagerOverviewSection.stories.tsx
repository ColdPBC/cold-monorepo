import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { ComplianceManagerOverviewSection } from '@coldpbc/components';
import { getComplianceManagerOverviewSectionsMock, ComplianceManagerContextMockProvider } from '@coldpbc/mocks';
import { ComplianceManagerStatus } from '@coldpbc/enums';

const meta: Meta<typeof ComplianceManagerOverviewSection> = {
  title: 'Molecules/ComplianceManagerOverviewSection',
  component: ComplianceManagerOverviewSection,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const NotActivated: Story = {
  render: args => (
    <ComplianceManagerContextMockProvider>
      <ComplianceManagerOverviewSection {...args} />
    </ComplianceManagerContextMockProvider>
  ),
  args: {
    section: getComplianceManagerOverviewSectionsMock(),
    groupId: 'csg_u52xp76tclba5djc',
    collapseOpen: true,
  },
};

export const Activated: Story = {
  render: args => (
    <ComplianceManagerContextMockProvider
      complianceManagerContext={{
        status: ComplianceManagerStatus.activated,
      }}>
      <ComplianceManagerOverviewSection {...args} />
    </ComplianceManagerContextMockProvider>
  ),
  args: {
    section: getComplianceManagerOverviewSectionsMock(),
    groupId: 'csg_u52xp76tclba5djc',
    collapseOpen: true,
  },
};

export const ColdAIRunning: Story = {
  render: args => (
    <ComplianceManagerContextMockProvider
      complianceManagerContext={{
        status: ComplianceManagerStatus.startedAi,
        data: {
          currentAIStatus: [
            {
              section: 'CHEM',
              questions: ['CHEM-1', 'CHEM-3'],
            },
          ],
        },
      }}>
      <ComplianceManagerOverviewSection {...args} />
    </ComplianceManagerContextMockProvider>
  ),
  args: {
    section: getComplianceManagerOverviewSectionsMock(),
    groupId: 'csg_u52xp76tclba5djc',
    collapseOpen: true,
  },
};
