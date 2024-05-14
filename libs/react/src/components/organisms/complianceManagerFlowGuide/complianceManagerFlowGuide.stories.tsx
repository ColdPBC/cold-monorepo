import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { ComplianceManagerFlowGuide } from '@coldpbc/components';
import { getSectionGroupList, StoryMockProvider } from '@coldpbc/mocks';
import { ComplianceManagerStatus } from '@coldpbc/enums';

const meta: Meta<typeof ComplianceManagerFlowGuide> = {
  title: 'Organisms/ComplianceManagerFlowGuide',
  component: ComplianceManagerFlowGuide,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const NotActivated: Story = {
  render: args => (
    <StoryMockProvider
      complianceManagerContext={{
        data: {
          name: 'name',
          mqttComplianceSet: getSectionGroupList({
            name: 'rei_pia_2024',
          }),
        },
        status: ComplianceManagerStatus.notActivated,
        setStatus: () => {},
      }}>
      <ComplianceManagerFlowGuide />
    </StoryMockProvider>
  ),
};

export const Activated: Story = {
  render: args => (
    <StoryMockProvider
      complianceManagerContext={{
        data: {
          name: 'name',
          mqttComplianceSet: getSectionGroupList({
            name: 'rei_pia_2024',
          }),
        },
        status: ComplianceManagerStatus.activated,
        setStatus: () => {},
      }}>
      <ComplianceManagerFlowGuide />
    </StoryMockProvider>
  ),
};

export const UploadedDocuments: Story = {
  render: args => (
    <StoryMockProvider
      complianceManagerContext={{
        data: {
          name: 'name',
          mqttComplianceSet: getSectionGroupList({
            name: 'rei_pia_2024',
          }),
        },
        status: ComplianceManagerStatus.uploadedDocuments,
        setStatus: () => {},
      }}>
      <ComplianceManagerFlowGuide />
    </StoryMockProvider>
  ),
};

export const StartedColdAI: Story = {
  render: args => (
    <StoryMockProvider
      complianceManagerContext={{
        data: {
          name: 'name',
          mqttComplianceSet: getSectionGroupList({
            name: 'rei_pia_2024',
          }),
        },
        status: ComplianceManagerStatus.startedAi,
        setStatus: () => {},
      }}>
      <ComplianceManagerFlowGuide />
    </StoryMockProvider>
  ),
};

export const CompletedAI: Story = {
  render: args => (
    <StoryMockProvider
      complianceManagerContext={{
        data: {
          name: 'name',
          mqttComplianceSet: getSectionGroupList({
            name: 'rei_pia_2024',
          }),
        },
        status: ComplianceManagerStatus.completedAi,
        setStatus: () => {},
      }}>
      <ComplianceManagerFlowGuide />
    </StoryMockProvider>
  ),
};

export const StartedQuestions: Story = {
  render: args => (
    <StoryMockProvider
      complianceManagerContext={{
        data: {
          name: 'name',
          mqttComplianceSet: getSectionGroupList({
            name: 'rei_pia_2024',
          }),
        },
        status: ComplianceManagerStatus.startedQuestions,
        setStatus: () => {},
      }}>
      <ComplianceManagerFlowGuide />
    </StoryMockProvider>
  ),
};

export const CompletedQuestions: Story = {
  render: args => (
    <StoryMockProvider
      complianceManagerContext={{
        data: {
          name: 'name',
          mqttComplianceSet: getSectionGroupList({
            name: 'rei_pia_2024',
          }),
        },
        status: ComplianceManagerStatus.completedQuestions,
        setStatus: () => {},
      }}>
      <ComplianceManagerFlowGuide />
    </StoryMockProvider>
  ),
};

export const Submitted: Story = {
  render: args => (
    <StoryMockProvider
      complianceManagerContext={{
        data: {
          name: 'name',
          mqttComplianceSet: getSectionGroupList({
            name: 'rei_pia_2024',
          }),
        },
        status: ComplianceManagerStatus.submitted,
        setStatus: () => {},
      }}>
      <ComplianceManagerFlowGuide />
    </StoryMockProvider>
  ),
};
