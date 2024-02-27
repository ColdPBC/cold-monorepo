import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { getComplianceWizardFlowHandler, StoryMockProvider } from '@coldpbc/mocks';
import { Route, Routes } from 'react-router-dom';
import { ComplianceWizard, WizardRoutes } from '@coldpbc/components';

const meta: Meta<typeof ComplianceWizard> = {
  title: 'Pages/ComplianceWizard',
  component: ComplianceWizard,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const DocumentsUploadStep: Story = {
  render: args => {
    return (
      <StoryMockProvider memoryRouterProps={{ initialEntries: ['/wizard/compliance/rei2/documents'] }}>
        <Routes>
          <Route path={'/compliance'} element={<div className={'text-tc-primary'}>Compliance Home</div>} />
          {WizardRoutes()}
          <Route path={'/assessments'} element={<div className={'text-tc-primary'}>Assessments</div>} />
        </Routes>
      </StoryMockProvider>
    );
  },
};

export const AutomateStep: Story = {
  render: args => {
    return (
      <StoryMockProvider memoryRouterProps={{ initialEntries: ['/wizard/compliance/rei2/automate'] }}>
        <Routes>
          <Route path={'/compliance'} element={<div className={'text-tc-primary'}>Compliance Home</div>} />
          {WizardRoutes()}
          <Route path={'/assessments'} element={<div className={'text-tc-primary'}>Assessments</div>} />
        </Routes>
      </StoryMockProvider>
    );
  },
};

export const ProcessingStep: Story = {
  render: args => {
    return (
      <StoryMockProvider memoryRouterProps={{ initialEntries: ['/wizard/compliance/rei2/processing'] }} handlers={getComplianceWizardFlowHandler.processing}>
        <Routes>
          <Route path={'/compliance'} element={<div className={'text-tc-primary'}>Compliance Home</div>} />
          {WizardRoutes()}
          <Route path={'/assessments'} element={<div className={'text-tc-primary'}>Assessments</div>} />
        </Routes>
      </StoryMockProvider>
    );
  },
};

export const QuestionnaireStep: Story = {
  render: args => {
    return (
      <StoryMockProvider memoryRouterProps={{ initialEntries: ['/wizard/compliance/rei2/questionnaire'] }}>
        <Routes>
          <Route path={'/compliance'} element={<div className={'text-tc-primary'}>Compliance Home</div>} />
          {WizardRoutes()}
          <Route path={'/assessments'} element={<div className={'text-tc-primary'}>Assessments</div>} />
        </Routes>
      </StoryMockProvider>
    );
  },
};
