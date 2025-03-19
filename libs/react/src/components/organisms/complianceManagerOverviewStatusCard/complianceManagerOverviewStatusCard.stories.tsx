import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { ComplianceManagerOverviewStatusCard } from '@coldpbc/components';
import { getComplianceManagerOverviewAIProgressPercentageMock, ComplianceManagerContextMockProvider } from '@coldpbc/mocks';
import { ComplianceManagerStatus } from '@coldpbc/enums';

const meta: Meta<typeof ComplianceManagerOverviewStatusCard> = {
  title: 'Organisms/ComplianceManagerOverviewStatusCard',
  component: ComplianceManagerOverviewStatusCard,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const NotActivated: Story = {
  render: args => (
    <ComplianceManagerContextMockProvider
      complianceManagerContext={{
        status: ComplianceManagerStatus.notActivated,
      }}>
      <ComplianceManagerOverviewStatusCard />
    </ComplianceManagerContextMockProvider>
  ),
};

export const Activated: Story = {
  render: args => (
    <ComplianceManagerContextMockProvider
      complianceManagerContext={{
        status: ComplianceManagerStatus.activated,
      }}>
      <ComplianceManagerOverviewStatusCard />
    </ComplianceManagerContextMockProvider>
  ),
};

export const Uploaded: Story = {
  render: args => (
    <ComplianceManagerContextMockProvider
      complianceManagerContext={{
        status: ComplianceManagerStatus.uploadedDocuments,
      }}>
      <ComplianceManagerOverviewStatusCard />
    </ComplianceManagerContextMockProvider>
  ),
};

export const StartedAI: Story = {
  render: args => (
    <ComplianceManagerContextMockProvider
      complianceManagerContext={{
        status: ComplianceManagerStatus.startedAi,
        data: {
          currentAIStatus: getComplianceManagerOverviewAIProgressPercentageMock(),
        },
      }}>
      <ComplianceManagerOverviewStatusCard />
    </ComplianceManagerContextMockProvider>
  ),
};

export const CompletedAI: Story = {
  render: args => (
    <ComplianceManagerContextMockProvider
      complianceManagerContext={{
        status: ComplianceManagerStatus.completedAi,
      }}>
      <ComplianceManagerOverviewStatusCard />
    </ComplianceManagerContextMockProvider>
  ),
};

export const StartedQuestions: Story = {
  render: args => (
    <ComplianceManagerContextMockProvider
      complianceManagerContext={{
        status: ComplianceManagerStatus.startedQuestions,
      }}>
      <ComplianceManagerOverviewStatusCard />
    </ComplianceManagerContextMockProvider>
  ),
};

export const CompletedQuestions: Story = {
  render: args => (
    <ComplianceManagerContextMockProvider
      complianceManagerContext={{
        status: ComplianceManagerStatus.completedQuestions,
      }}>
      <ComplianceManagerOverviewStatusCard />
    </ComplianceManagerContextMockProvider>
  ),
};

export const Submitted: Story = {
  render: args => (
    <ComplianceManagerContextMockProvider
      complianceManagerContext={{
        status: ComplianceManagerStatus.submitted,
      }}>
      <ComplianceManagerOverviewStatusCard />
    </ComplianceManagerContextMockProvider>
  ),
};
