import { Compliance, OrgCompliance } from '@coldpbc/interfaces';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { find, forEach } from 'lodash';

/**
 * Verify the Compliance Detail Page.
 * @param orgCompliance
 * @param canvasElement
 */
export const verifyComplianceDetailPage = async (orgCompliance: OrgCompliance, canvasElement: HTMLElement) => {
  const canvas = await within(canvasElement);
  await canvas.findByText(`${orgCompliance.compliance_definition.title} Compliance`);
  // get Sections text
  await canvas.findByText('Sections');
  // find all compliance-section-overview-card
  const complianceSectionOverviewCards = await canvas.findAllByTestId('compliance-section-overview-card');
  // verify the number of compliance-section-overview-card with the number of compliance surveys
  await expect(complianceSectionOverviewCards.length).toEqual(orgCompliance.compliance_definition.surveys.length);
  // loop through each compliance-section-overview-card
  // check if each compliance-section-overview-card has the Review and Answer button
  await forEach(orgCompliance.compliance_definition.surveys, async survey => {
    const complianceSectionOverviewCard = await canvas.findByTestId(`compliance-section-overview-card-${survey}`);
    const button = await within(complianceSectionOverviewCard).findByRole('button', { name: 'Review and Answer' });
    await within(complianceSectionOverviewCard).findByTestId('compliance-section-overview-progress-bar-ready');
    await expect(button).toBeEnabled();
  });
};

export const verifyCompliancePage = async (complianceData: Compliance[], orgCompliance: OrgCompliance[], canvasElement: HTMLElement) => {
  const canvas = await within(canvasElement);
  const complianceOverviewCards = await canvas.findAllByTestId('compliance-overview-card');
  await expect(complianceOverviewCards.length).toEqual(complianceData.length);

  await forEach(complianceData, async compliance => {
    const complianceSet = find(orgCompliance, { compliance_id: compliance.id });
    const complianceCard = await canvas.findByTestId(`compliance-${compliance.id}`);
    let button: HTMLElement;
    if (complianceSet) {
      button = await within(complianceCard).findByRole('button', {
        name: 'See Details',
      });
      await expect(button).toHaveClass('bg-bgc-accent');
    } else {
      button = await within(complianceCard).findByRole('button', {
        name: 'Activate',
      });
      await expect(button).toHaveClass('bg-primary');
    }
    await expect(button).toBeEnabled();
  });
};
