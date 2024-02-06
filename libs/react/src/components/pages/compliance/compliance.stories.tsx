import { StoryMockProvider, getActionHandler, getCompliancePageHandler, getComplianceMock } from '@coldpbc/mocks';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { CompliancePage } from '@coldpbc/components';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof CompliancePage> = {
  title: 'Pages/Compliance',
  component: CompliancePage,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => (
    <StoryMockProvider handlers={getCompliancePageHandler.default}>
      <CompliancePage />
    </StoryMockProvider>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement.parentElement === null ? canvasElement : canvasElement.parentElement);

    await step('Check Compliance Screen Default', async () => {
      // find all compliance-overview-card
      const complianceOverviewCards = await canvas.findAllByTestId('compliance-overview-card');
      const complianceSets = getComplianceMock();
      await expect(complianceOverviewCards.length).toEqual(complianceSets.length);
      complianceOverviewCards.forEach(async (complianceOverviewCard, index) => {
        const complianceSet = complianceSets[index];
        const title = await within(complianceOverviewCard).findByTestId('compliance-overview-card-title');
        await expect(title).toHaveTextContent(complianceSet.title);
        const button = await within(complianceOverviewCard).findByRole('button', { name: 'See Details' });
        await expect(button).toBeEnabled();
        await expect(button).toHaveClass('bg-bgc-accent');
      });
    });
  },
};

export const Activate: Story = {
  render: args => (
    <StoryMockProvider handlers={getCompliancePageHandler.activate}>
      <CompliancePage />
    </StoryMockProvider>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement.parentElement === null ? canvasElement : canvasElement.parentElement);

    await step('Check Compliance Screen Activate', async () => {
      // find all compliance-overview-card
      const complianceOverviewCards = await canvas.findAllByTestId('compliance-overview-card');
      const complianceSets = getComplianceMock();
      await expect(complianceOverviewCards.length).toEqual(complianceSets.length);
      complianceOverviewCards.forEach(async (complianceOverviewCard, index) => {
        const complianceSet = complianceSets[index];
        const title = await within(complianceOverviewCard).findByTestId('compliance-overview-card-title');
        await expect(title).toHaveTextContent(complianceSet.title);
        const button = await within(complianceOverviewCard).findByRole('button', { name: 'Activate' });
        await expect(button).toBeEnabled();
        await expect(button).toHaveClass('bg-primary');
      });
    });
  },
};
