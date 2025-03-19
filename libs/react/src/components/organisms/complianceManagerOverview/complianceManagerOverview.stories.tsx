import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { ComplianceManagerOverview } from '@coldpbc/components';
import { getComplianceManagerOverviewAIProgressPercentageMock, ComplianceManagerContextMockProvider } from '@coldpbc/mocks';
import { ComplianceManagerStatus } from '@coldpbc/enums';

const meta: Meta<typeof ComplianceManagerOverview> = {
  title: 'Organisms/ComplianceManagerOverview',
  component: ComplianceManagerOverview,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const NotActivated: Story = {
  render: args => (
    <ComplianceManagerContextMockProvider>
      <ComplianceManagerOverview />
    </ComplianceManagerContextMockProvider>
  ),
};

export const Activated: Story = {
  render: args => (
    <ComplianceManagerContextMockProvider
      complianceManagerContext={{
        status: ComplianceManagerStatus.activated,
      }}>
      <ComplianceManagerOverview />
    </ComplianceManagerContextMockProvider>
  ),
};

export const UploadedDocuments: Story = {
  render: args => (
    <ComplianceManagerContextMockProvider
      complianceManagerContext={{
        status: ComplianceManagerStatus.uploadedDocuments,
      }}>
      <ComplianceManagerOverview />
    </ComplianceManagerContextMockProvider>
  ),
};

export const AIRunning: Story = {
  render: args => (
    <ComplianceManagerContextMockProvider
      complianceManagerContext={{
        status: ComplianceManagerStatus.startedAi,
        data: {
          currentAIStatus: getComplianceManagerOverviewAIProgressPercentageMock(),
        },
      }}>
      <ComplianceManagerOverview />
    </ComplianceManagerContextMockProvider>
  ),
};

export const CompletedAI: Story = {
  render: args => (
    <ComplianceManagerContextMockProvider
      complianceManagerContext={{
        status: ComplianceManagerStatus.completedAi,
      }}>
      <ComplianceManagerOverview />
    </ComplianceManagerContextMockProvider>
  ),
};

export const StartedQuestions: Story = {
  render: args => (
    <ComplianceManagerContextMockProvider
      complianceManagerContext={{
        status: ComplianceManagerStatus.startedQuestions,
      }}>
      <ComplianceManagerOverview />
    </ComplianceManagerContextMockProvider>
  ),
};

export const CompletedQuestions: Story = {
  render: args => (
    <ComplianceManagerContextMockProvider
      complianceManagerContext={{
        status: ComplianceManagerStatus.completedQuestions,
      }}>
      <ComplianceManagerOverview />
    </ComplianceManagerContextMockProvider>
  ),
};

export const Submitted: Story = {
  render: args => (
    <ComplianceManagerContextMockProvider
      complianceManagerContext={{
        status: ComplianceManagerStatus.submitted,
      }}>
      <ComplianceManagerOverview />
    </ComplianceManagerContextMockProvider>
  ),
};
