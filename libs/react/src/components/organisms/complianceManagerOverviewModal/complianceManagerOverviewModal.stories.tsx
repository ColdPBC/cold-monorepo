import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { ComplianceManagerOverviewModal, ComplianceManagerOverviewModalProps } from '@coldpbc/components';
import { ComplianceManagerContextMockProvider } from '@coldpbc/mocks';
import { useState } from 'react';
import { ComplianceManagerFlowGuideStatus, ComplianceManagerStatus } from '@coldpbc/enums';

const meta: Meta<typeof ComplianceManagerOverviewModal> = {
  title: 'Organisms/ComplianceManagerOverviewModal',
  component: ComplianceManagerOverviewModal,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ActivateCompliance: Story = {
  render: args => <ModalStory status={undefined} props={args} />,
  args: {
    show: true,
    setShowModal: () => {},
    flowGuideStatus: ComplianceManagerFlowGuideStatus.activate,
    setFlowGuideStatus: () => {},
  },
};

const ModalStory = ({ status = ComplianceManagerStatus.notActivated, props }: { status?: ComplianceManagerStatus; props: ComplianceManagerOverviewModalProps }) => {
  const [show, setShowModal] = useState(true);
  const [flowGuideStatus, setFlowGuideStatus] = useState<ComplianceManagerFlowGuideStatus>(props.flowGuideStatus || ComplianceManagerFlowGuideStatus.activate);
  return (
    <ComplianceManagerContextMockProvider
      complianceManagerContext={{
        status,
      }}>
      <ComplianceManagerOverviewModal {...props} setShowModal={setShowModal} show={show} flowGuideStatus={flowGuideStatus} setFlowGuideStatus={setFlowGuideStatus} />
    </ComplianceManagerContextMockProvider>
  );
};

export const UploadDocuments: Story = {
  render: args => <ModalStory status={ComplianceManagerStatus.uploadedDocuments} props={args} />,
  args: {
    show: true,
    setShowModal: () => {},
    flowGuideStatus: ComplianceManagerFlowGuideStatus.upload,
    setFlowGuideStatus: () => {},
  },
};

export const StartAI: Story = {
  render: args => <ModalStory props={args} />,
  args: {
    show: true,
    setShowModal: () => {},
    flowGuideStatus: ComplianceManagerFlowGuideStatus.startAI,
    setFlowGuideStatus: () => {},
  },
};
