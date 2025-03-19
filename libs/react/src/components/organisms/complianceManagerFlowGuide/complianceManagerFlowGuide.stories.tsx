import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { ComplianceManagerFlowGuide, ComplianceManagerFlowGuideProps } from '@coldpbc/components';
import {
  ComplianceManagerContextMockProvider,
  ComplianceManagerContextMockProviderProps,
} from '@coldpbc/mocks';
import { ComplianceManagerFlowGuideStatus, ComplianceManagerStatus } from '@coldpbc/enums';
import { useState } from 'react';

const meta: Meta<typeof ComplianceManagerFlowGuide> = {
  title: 'Organisms/ComplianceManagerFlowGuide',
  component: ComplianceManagerFlowGuide,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Activate: Story = {
  render: args => (
    <ComplianceFlowGuideStory
      args={args}
      storyMockProps={{
        complianceManagerContext: {
          status: ComplianceManagerStatus.notActivated,
          setStatus: () => {},
        },
      }}
    />
  ),
  args: {
    showModal: false,
    setShowModal: () => {},
    flowGuideStatus: ComplianceManagerFlowGuideStatus.activate,
    setFlowGuideStatus: () => {},
  },
};

export const Upload: Story = {
  render: args => (
    <ComplianceFlowGuideStory
      args={args}
      storyMockProps={{
        complianceManagerContext: {
          status: ComplianceManagerStatus.activated,
          setStatus: () => {},
        },
      }}
    />
  ),
  args: {
    showModal: false,
    setShowModal: () => {},
    flowGuideStatus: ComplianceManagerFlowGuideStatus.activate,
    setFlowGuideStatus: () => {},
  },
};

export const StartedAI: Story = {
  render: args => (
    <ComplianceFlowGuideStory
      args={args}
      storyMockProps={{
        complianceManagerContext: {
          status: ComplianceManagerStatus.startedAi,
          setStatus: () => {},
        },
      }}
    />
  ),
  args: {
    showModal: false,
    setShowModal: () => {},
    flowGuideStatus: ComplianceManagerFlowGuideStatus.activate,
    setFlowGuideStatus: () => {},
  },
};

export const RestartAI: Story = {
  render: args => (
    <ComplianceFlowGuideStory
      args={args}
      storyMockProps={{
        complianceManagerContext: {
          status: ComplianceManagerStatus.completedAi,
          setStatus: () => {},
        },
      }}
    />
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
    <ComplianceFlowGuideStory
      args={args}
      storyMockProps={{
        complianceManagerContext: {
          status: ComplianceManagerStatus.submitted,
          setStatus: () => {},
        },
      }}
    />
  ),
  args: {
    showModal: false,
    setShowModal: () => {},
    flowGuideStatus: ComplianceManagerFlowGuideStatus.activate,
    setFlowGuideStatus: () => {},
  },
};

const ComplianceFlowGuideStory = ({ args, storyMockProps }: { args: ComplianceManagerFlowGuideProps; storyMockProps: ComplianceManagerContextMockProviderProps }) => {
  const [flowGuideStatus, setFlowGuideStatus] = useState(args.flowGuideStatus);

  return (
    <ComplianceManagerContextMockProvider {...storyMockProps}>
      <ComplianceManagerFlowGuide {...args} setFlowGuideStatus={setFlowGuideStatus} flowGuideStatus={flowGuideStatus} />
    </ComplianceManagerContextMockProvider>
  );
};
