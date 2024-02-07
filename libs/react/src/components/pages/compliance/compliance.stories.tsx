import {
  StoryMockProvider,
  getActionHandler,
  getCompliancePageHandler,
  getComplianceMock,
  getDefaultCompliancePageMock,
  getDefaultOrgCompliancePageMock,
  getActivateCompliancePageMock,
  getActivateOrgCompliancePageMock,
} from '@coldpbc/mocks';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { CompliancePage } from '@coldpbc/components';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { verifyCompliancePage } from '@coldpbc/lib';

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
      const complianceSets = getDefaultCompliancePageMock();
      const orgComplianceSets = getDefaultOrgCompliancePageMock();
      await verifyCompliancePage(complianceSets, orgComplianceSets, canvasElement);
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
      const complianceSets = getActivateCompliancePageMock();
      const orgComplianceSets = getActivateOrgCompliancePageMock();
      await verifyCompliancePage(complianceSets, orgComplianceSets, canvasElement);
    });
  },
};
