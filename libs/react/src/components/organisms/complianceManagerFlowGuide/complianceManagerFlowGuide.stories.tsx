import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { ComplianceManagerFlowGuide } from '@coldpbc/components';
import { getSectionGroupList, StoryMockProvider } from '@coldpbc/mocks';
import { ComplianceManagerFlowGuideStatus, ComplianceManagerStatus } from '@coldpbc/enums';

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
          files: undefined,
          orgCompliances: undefined,
          currentAIStatus: undefined,
        },
        status: ComplianceManagerStatus.notActivated,
        setStatus: () => {},
      }}>
      <ComplianceManagerFlowGuide {...args} />
    </StoryMockProvider>
  ),
  args: {
    showModal: false,
    setShowModal: () => {},
    flowGuideStatus: ComplianceManagerFlowGuideStatus.activate,
    setFlowGuideStatus: () => {},
  },
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
          files: undefined,
          orgCompliances: undefined,
          currentAIStatus: undefined,
        },
        status: ComplianceManagerStatus.activated,
        setStatus: () => {},
      }}>
      <ComplianceManagerFlowGuide {...args} />
    </StoryMockProvider>
  ),
  args: {
    showModal: false,
    setShowModal: () => {},
    flowGuideStatus: ComplianceManagerFlowGuideStatus.activate,
    setFlowGuideStatus: () => {},
  },
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
          files: undefined,
          orgCompliances: undefined,
          currentAIStatus: undefined,
        },
        status: ComplianceManagerStatus.uploadedDocuments,
        setStatus: () => {},
      }}>
      <ComplianceManagerFlowGuide {...args} />
    </StoryMockProvider>
  ),
  args: {
    showModal: false,
    setShowModal: () => {},
    flowGuideStatus: ComplianceManagerFlowGuideStatus.activate,
    setFlowGuideStatus: () => {},
  },
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
          files: undefined,
          orgCompliances: undefined,
          currentAIStatus: undefined,
        },
        status: ComplianceManagerStatus.startedAi,
        setStatus: () => {},
      }}>
      <ComplianceManagerFlowGuide {...args} />
    </StoryMockProvider>
  ),
  args: {
    showModal: false,
    setShowModal: () => {},
    flowGuideStatus: ComplianceManagerFlowGuideStatus.activate,
    setFlowGuideStatus: () => {},
  },
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
          files: undefined,
          orgCompliances: undefined,
          currentAIStatus: undefined,
        },
        status: ComplianceManagerStatus.completedAi,
        setStatus: () => {},
      }}>
      <ComplianceManagerFlowGuide {...args} />
    </StoryMockProvider>
  ),
  args: {
    showModal: false,
    setShowModal: () => {},
    flowGuideStatus: ComplianceManagerFlowGuideStatus.activate,
    setFlowGuideStatus: () => {},
  },
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
          files: undefined,
          orgCompliances: undefined,
          currentAIStatus: undefined,
        },
        status: ComplianceManagerStatus.startedQuestions,
        setStatus: () => {},
      }}>
      <ComplianceManagerFlowGuide {...args} />
    </StoryMockProvider>
  ),
  args: {
    showModal: false,
    setShowModal: () => {},
    flowGuideStatus: ComplianceManagerFlowGuideStatus.activate,
    setFlowGuideStatus: () => {},
  },
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
          files: undefined,
          orgCompliances: undefined,
          currentAIStatus: undefined,
        },
        status: ComplianceManagerStatus.completedQuestions,
        setStatus: () => {},
      }}>
      <ComplianceManagerFlowGuide {...args} />
    </StoryMockProvider>
  ),
  args: {
    showModal: false,
    setShowModal: () => {},
    flowGuideStatus: ComplianceManagerFlowGuideStatus.activate,
    setFlowGuideStatus: () => {},
  },
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
          files: undefined,
          orgCompliances: undefined,
          currentAIStatus: undefined,
        },
        status: ComplianceManagerStatus.submitted,
        setStatus: () => {},
      }}>
      <ComplianceManagerFlowGuide {...args} />
    </StoryMockProvider>
  ),
  args: {
    showModal: false,
    setShowModal: () => {},
    flowGuideStatus: ComplianceManagerFlowGuideStatus.activate,
    setFlowGuideStatus: () => {},
  },
};
