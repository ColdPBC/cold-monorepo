import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { StoryMockProvider } from '@coldpbc/mocks';
import { Route, Routes } from 'react-router-dom';
import { ComplianceWizard } from '@coldpbc/components';

const meta: Meta<typeof ComplianceWizard> = {
  title: 'Pages/ComplianceWizard',
  component: ComplianceWizard,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => {
    return (
      <StoryMockProvider memoryRouterProps={{ initialEntries: ['/wizard/compliance/rei'] }}>
        <Routes>
          <Route path={'/compliance'} element={<div className={'text-tc-primary'}>Compliance Home</div>} />
          <Route path={'/wizard'}>
            <Route path="compliance/:name" element={<ComplianceWizard />}>
              <Route path={'documents'} element={<div className={'text-tc-primary'}>Documents Upload Step</div>} />
              <Route path={'automate'} element={<div className={'text-tc-primary'}>Automation Step</div>} />
              <Route path={'automation'} element={<div className={'text-tc-primary'}>Automation Processing Step</div>} />
              <Route path={'survey'} element={<div className={'text-tc-primary'}>Survey Taking Step</div>} />
            </Route>
          </Route>
          <Route path={'/assessments'} element={<div className={'text-tc-primary'}>Assessments</div>} />
        </Routes>
      </StoryMockProvider>
    );
  },
};

export const AutomationProcessingStep: Story = {
  render: args => {
    return (
      <StoryMockProvider memoryRouterProps={{ initialEntries: ['/wizard/compliance/rei/automation'] }}>
        <Routes>
          <Route path={'/compliance'} element={<div className={'text-tc-primary'}>Compliance Home</div>} />
          <Route path={'/wizard'}>
            <Route path="compliance/:name" element={<ComplianceWizard />}>
              <Route path={'documents'} element={<div className={'text-tc-primary'}>Documents Upload Step</div>} />
              <Route path={'automate'} element={<div className={'text-tc-primary'}>Automation Step</div>} />
              <Route path={'automation'} element={<div className={'text-tc-primary'}>Automation Processing Step</div>} />
              <Route path={'survey'} element={<div className={'text-tc-primary'}>Survey Taking Step</div>} />
            </Route>
          </Route>
          <Route path={'/assessments'} element={<div className={'text-tc-primary'}>Assessments</div>} />
        </Routes>
      </StoryMockProvider>
    );
  },
};

export const QuestionnaireStep: Story = {
  render: args => {
    return (
      <StoryMockProvider memoryRouterProps={{ initialEntries: ['/wizard/compliance/rei/survey'] }}>
        <Routes>
          <Route path={'/compliance'} element={<div className={'text-tc-primary'}>Compliance Home</div>} />
          <Route path={'/wizard'}>
            <Route path="compliance/:name" element={<ComplianceWizard />}>
              <Route path={'documents'} element={<div className={'text-tc-primary'}>Documents Upload Step</div>} />
              <Route path={'automate'} element={<div className={'text-tc-primary'}>Automation Step</div>} />
              <Route path={'automation'} element={<div className={'text-tc-primary'}>Automation Processing Step</div>} />
              <Route path={'survey'} element={<div className={'text-tc-primary'}>Survey Taking Step</div>} />
            </Route>
          </Route>
          <Route path={'/assessments'} element={<div className={'text-tc-primary'}>Assessments</div>} />
        </Routes>
      </StoryMockProvider>
    );
  },
};
