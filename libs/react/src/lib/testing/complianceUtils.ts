import { OrgCompliance } from '@coldpbc/interfaces';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { getOrganizationComplianceMock } from '@coldpbc/mocks';

export const verifyComplianceDetailPage = async (complianceData: OrgCompliance, canvasElement: HTMLElement) => {
  const canvas = await within(canvasElement);
  await canvas.findByText(`${complianceData.compliance_definition.title} Compliance`);
  // get Sections text
  await canvas.findByText('Sections');
  // find all compliance-section-overview-card
  const complianceSectionOverviewCards = await canvas.findAllByTestId('compliance-section-overview-card');
  const complianceSets = getOrganizationComplianceMock();
  const reiCompliance = complianceSets.find(compliance => compliance.compliance_definition.name === 'rei');
  // verify the number of compliance-section-overview-card with the number of compliance surveys
  await expect(complianceSectionOverviewCards.length).toEqual(reiCompliance?.compliance_definition.surveys.length);
  // loop through each compliance-section-overview-card
  // check if each compliance-section-overview-card has the Review and Answer button
  complianceSectionOverviewCards.forEach(async complianceSectionOverviewCard => {
    const button = await within(complianceSectionOverviewCard).findByRole('button', { name: 'Review and Answer' });
    await expect(button).toBeEnabled();
    await within(complianceSectionOverviewCard).findByTestId('compliance-section-overview-progress-bar-ready');
  });
};
