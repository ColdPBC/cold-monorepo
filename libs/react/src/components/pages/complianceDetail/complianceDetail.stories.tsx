import { StoryMockProvider, getCompliancePageHandler, getComplianceDetailPageHandler, getOrganizationComplianceMock } from '@coldpbc/mocks';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { ComplianceDetail } from './complianceDetail';
import { Route, Routes } from 'react-router-dom';
import { waitFor, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { verifyComplianceDetailPage } from '../../../lib/testing/complianceUtils';

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
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement.parentElement === null ? canvasElement : canvasElement.parentElement);

    await step('Check Compliance Detail Screen', async () => {
      // check if the Compliance title is displayed
      await canvas.findByText('REI Compliance');
      // get Sections text
      await canvas.findByText('Sections');
      // find all compliance-section-overview-card
      const complianceSectionOverviewCards = await canvas.findAllByTestId('compliance-section-overview-card');
      const complianceSets = getOrganizationComplianceMock();
      const reiCompliance = complianceSets.find(compliance => compliance.compliance_definition.name === 'rei');
      if (!reiCompliance) {
        throw new Error('Rei compliance is undefined');
      }
      await verifyComplianceDetailPage(reiCompliance, canvasElement);
      // verify the number of compliance-section-overview-card with the number of compliance surveys
      await expect(complianceSectionOverviewCards.length).toEqual(reiCompliance?.compliance_definition.surveys.length);
      // loop through each compliance-section-overview-card
      // check if each compliance-section-overview-card has the Review and Answer button
      complianceSectionOverviewCards.forEach(async complianceSectionOverviewCard => {
        const button = await within(complianceSectionOverviewCard).findByRole('button', { name: 'Review and Answer' });
        await expect(button).toBeEnabled();
        await within(complianceSectionOverviewCard).findByTestId('compliance-section-overview-progress-bar-ready');
      });
    });
  },
};

export const Analyzing: Story = {
  render: args => (
    <StoryMockProvider memoryRouterProps={{ initialEntries: ['/compliance/rei'] }} handlers={getComplianceDetailPageHandler.analyzing}>
      <Routes>
        <Route path="/compliance/:name" element={<ComplianceDetail />} />
      </Routes>
    </StoryMockProvider>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement.parentElement === null ? canvasElement : canvasElement.parentElement);

    await step('Check Compliance Detail Screen Analyzing', async () => {
      // check if the Compliance title is displayed
      await canvas.findByText('REI Compliance');
      // get Sections text
      await canvas.findByText('Sections');
      // find all compliance-section-overview-card
      const complianceSectionOverviewCards = await canvas.findAllByTestId('compliance-section-overview-card');
      const complianceSets = getOrganizationComplianceMock();
      const reiCompliance = complianceSets.find(compliance => compliance.compliance_definition.name === 'rei');
      // verify the number of compliance-section-overview-card with the number of compliance surveys
      await expect(complianceSectionOverviewCards.length).toEqual(reiCompliance?.compliance_definition.surveys.length);
      // find compliance overview card with Overview title compliance-overview-card-title with text Overview
      const complianceOverviewCards = await canvas.findAllByTestId('compliance-overview-card');
      // get the card with title Overview
      const mainComplianceOverviewCard = complianceOverviewCards.find(async complianceOverviewCard => {
        const title = await within(complianceOverviewCard).findByTestId('compliance-overview-card-title');
        return await within(title).findByText('Overview');
      });
      // check analyzing progress bar in the main compliance overview card
      // expect mainComplianceOverviewCard to be defined
      await expect(mainComplianceOverviewCard).toBeDefined();
      if (mainComplianceOverviewCard) {
        await within(mainComplianceOverviewCard).findByTestId('compliance-overview-progress-bar-analyzing');
      }
      const complianceSectionOverviewCard = complianceSectionOverviewCards.find(async complianceSectionOverviewCard => {
        const progressBar = await within(complianceSectionOverviewCard).findByTestId('compliance-section-overview-progress-bar-analyzing');
        return progressBar;
      });
      await expect(complianceSectionOverviewCard).toBeDefined();
    });
  },
};

export const SurveyComplete: Story = {
  render: args => (
    <StoryMockProvider memoryRouterProps={{ initialEntries: ['/compliance/rei'] }} handlers={getComplianceDetailPageHandler.surveyComplete}>
      <Routes>
        <Route path="/compliance/:name" element={<ComplianceDetail />} />
      </Routes>
    </StoryMockProvider>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement.parentElement === null ? canvasElement : canvasElement.parentElement);

    await step('Check Compliance Detail Screen Survey Complete', async () => {
      // find one compliance-section-overview-card with Edit Answers button
      const complianceSectionOverviewCards = await canvas.findAllByTestId('compliance-section-overview-card');
      const completedSurveyOverviewCard = complianceSectionOverviewCards.find(async complianceSectionOverviewCard => {
        // check text 100% Complete. dont error if not found
        const text = await within(complianceSectionOverviewCard).queryByText('100% Complete');
        const button = await within(complianceSectionOverviewCard).queryByRole('button', { name: 'Edit Answers' });
        return button && text;
      });
      await expect(completedSurveyOverviewCard).toBeDefined();
    });
  },
};
