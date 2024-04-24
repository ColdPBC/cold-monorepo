import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { StoryMockProvider } from '@coldpbc/mocks';
import { Route, Routes } from 'react-router-dom';
import { ComplianceWizard, WizardRoutes } from '@coldpbc/components';
import { getComplianceWizardFlowHandler } from '../../../__mocks__/complianceFlowHandlers';

const meta: Meta<typeof ComplianceWizard> = {
  title: 'Pages/ComplianceWizardUserProgress',
  component: ComplianceWizard,
  tags: ['autodocs'],
  decorators: [withKnobs],
  parameters: {
    launchdarkly: {
      flags: {
        showNewCompliancePageHomeCold671: true,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ProgressNoUploadedDocuments: Story = {
  render: args => {
    return (
      <StoryMockProvider memoryRouterProps={{ initialEntries: ['/wizard/compliance/rei_pia_2024'] }} handlers={getComplianceWizardFlowHandler.documentUpload}>
        <Routes>
          <Route path={'/compliance'} element={<div className={'text-tc-primary'}>Compliance Home</div>} />
          {WizardRoutes()}
          <Route path={'/assessments'} element={<div className={'text-tc-primary'}>Assessments</div>} />
        </Routes>
      </StoryMockProvider>
    );
  },
};

export const ProgressHasUploadedDocuments: Story = {
  render: args => {
    return (
      <StoryMockProvider memoryRouterProps={{ initialEntries: ['/wizard/compliance/rei_pia_2024'] }} handlers={getComplianceWizardFlowHandler.automate}>
        <Routes>
          <Route path={'/compliance'} element={<div className={'text-tc-primary'}>Compliance Home</div>} />
          {WizardRoutes()}
          <Route path={'/assessments'} element={<div className={'text-tc-primary'}>Assessments</div>} />
        </Routes>
      </StoryMockProvider>
    );
  },
};

export const ProgressAutomationComplete: Story = {
  render: args => {
    return (
      <StoryMockProvider memoryRouterProps={{ initialEntries: ['/wizard/compliance/rei_pia_2024'] }} handlers={getComplianceWizardFlowHandler.questionnaire}>
        <Routes>
          <Route path={'/compliance'} element={<div className={'text-tc-primary'}>Compliance Home</div>} />
          {WizardRoutes()}
          <Route path={'/assessments'} element={<div className={'text-tc-primary'}>Assessments</div>} />
        </Routes>
      </StoryMockProvider>
    );
  },
};
