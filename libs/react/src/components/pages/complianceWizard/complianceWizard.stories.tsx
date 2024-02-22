import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { StoryMockProvider } from '@coldpbc/mocks';
import { Route, Routes } from 'react-router-dom';
import { ApplicationToaster, ComplianceWizard, WizardRoutes } from '@coldpbc/components';
import React from 'react';

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
          {WizardRoutes()}
          <Route path={'/assessments'} element={<div className={'text-tc-primary'}>Assessments</div>} />
        </Routes>
        <ApplicationToaster />
      </StoryMockProvider>
    );
  },
};

export const AutomationProcessingStep: Story = {
  render: args => {
    return (
      <StoryMockProvider memoryRouterProps={{ initialEntries: ['/wizard/compliance/rei/processing'] }}>
        <Routes>
          <Route path={'/compliance'} element={<div className={'text-tc-primary'}>Compliance Home</div>} />
          {WizardRoutes()}
          <Route path={'/assessments'} element={<div className={'text-tc-primary'}>Assessments</div>} />
        </Routes>
        <ApplicationToaster />
      </StoryMockProvider>
    );
  },
};

export const QuestionnaireStep: Story = {
  render: args => {
    return (
      <StoryMockProvider memoryRouterProps={{ initialEntries: ['/wizard/compliance/rei/questionnaire'] }}>
        <Routes>
          <Route path={'/compliance'} element={<div className={'text-tc-primary'}>Compliance Home</div>} />
          {WizardRoutes()}
          <Route path={'/assessments'} element={<div className={'text-tc-primary'}>Assessments</div>} />
        </Routes>
        <ApplicationToaster />
      </StoryMockProvider>
    );
  },
};
