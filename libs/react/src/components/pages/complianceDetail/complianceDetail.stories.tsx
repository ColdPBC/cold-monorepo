import { StoryMockProvider, getCompliancePageHandler, getComplianceDetailPageHandler } from '@coldpbc/mocks';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { ComplianceDetail } from './complianceDetail';
import { Route, Routes } from 'react-router-dom';
import { SubcategoryActionsList } from '@coldpbc/components';

const meta: Meta<typeof ComplianceDetail> = {
  title: 'Pages/ComplianceDetail',
  component: ComplianceDetail,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => (
    <StoryMockProvider memoryRouterProps={{ initialEntries: ['/compliance/rei'] }} handlers={getComplianceDetailPageHandler.default}>
      <Routes>
        <Route path="/compliance/:name" element={<ComplianceDetail />} />
      </Routes>
    </StoryMockProvider>
  ),
};

export const Analyzing: Story = {
  render: args => (
    <StoryMockProvider memoryRouterProps={{ initialEntries: ['/compliance/rei'] }} handlers={getComplianceDetailPageHandler.analyzing}>
      <Routes>
        <Route path="/compliance/:name" element={<ComplianceDetail />} />
      </Routes>
    </StoryMockProvider>
  ),
};

export const SurveyComplete: Story = {
  render: args => (
    <StoryMockProvider memoryRouterProps={{ initialEntries: ['/compliance/rei'] }} handlers={getComplianceDetailPageHandler.surveyComplete}>
      <Routes>
        <Route path="/compliance/:name" element={<ComplianceDetail />} />
      </Routes>
    </StoryMockProvider>
  ),
};
