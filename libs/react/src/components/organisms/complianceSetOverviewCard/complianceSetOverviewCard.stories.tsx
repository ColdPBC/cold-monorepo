import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { ComplianceSetOverviewCard } from '@coldpbc/components';
import { getAllComplianceMocksByStatus, StoryMockProvider } from '@coldpbc/mocks';
import { ColdComplianceSetsProvider } from '@coldpbc/providers';
import { ComplianceStatus } from '@coldpbc/enums';
import { addDays } from 'date-fns';

const meta = {
  title: 'Organisms/ComplianceSetOverviewCard',
  component: ComplianceSetOverviewCard,
  tags: ['autodocs'],
  decorators: [withKnobs],
} satisfies Meta<typeof ComplianceSetOverviewCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NotActive: Story = {
  render: args => {
    return (
      <StoryMockProvider>
        <ColdComplianceSetsProvider>
          <ComplianceSetOverviewCard {...args} />
        </ColdComplianceSetsProvider>
      </StoryMockProvider>
    );
  },
  args: {
    complianceSet: getAllComplianceMocksByStatus(ComplianceStatus.inActive),
  },
};

export const InProgress0Percent: Story = {
  render: args => {
    return (
      <StoryMockProvider>
        <ColdComplianceSetsProvider>
          <ComplianceSetOverviewCard {...args} />
        </ColdComplianceSetsProvider>
      </StoryMockProvider>
    );
  },
  args: {
    complianceSet: getAllComplianceMocksByStatus(ComplianceStatus.inProgress, 0),
  },
};

export const InProgress50Percent: Story = {
  render: args => {
    return (
      <StoryMockProvider>
        <ColdComplianceSetsProvider>
          <ComplianceSetOverviewCard {...args} />
        </ColdComplianceSetsProvider>
      </StoryMockProvider>
    );
  },
  args: {
    complianceSet: getAllComplianceMocksByStatus(ComplianceStatus.inProgress, 50),
  },
};

export const InProgress100Percent: Story = {
  render: args => {
    return (
      <StoryMockProvider>
        <ColdComplianceSetsProvider>
          <ComplianceSetOverviewCard {...args} />
        </ColdComplianceSetsProvider>
      </StoryMockProvider>
    );
  },
  args: {
    complianceSet: getAllComplianceMocksByStatus(ComplianceStatus.inProgress, 100),
  },
};

export const SubmittedByUser: Story = {
  render: args => {
    return (
      <StoryMockProvider>
        <ColdComplianceSetsProvider>
          <ComplianceSetOverviewCard {...args} />
        </ColdComplianceSetsProvider>
      </StoryMockProvider>
    );
  },
  args: {
    complianceSet: getAllComplianceMocksByStatus(ComplianceStatus.submissionInProgress, 0),
  },
};

export const SubmittedByCold: Story = {
  render: args => {
    return (
      <StoryMockProvider>
        <ColdComplianceSetsProvider>
          <ComplianceSetOverviewCard {...args} />
        </ColdComplianceSetsProvider>
      </StoryMockProvider>
    );
  },
  args: {
    complianceSet: getAllComplianceMocksByStatus(ComplianceStatus.submittedByCold, 0),
  },
};

export const WithDueDate: Story = {
  render: args => {
    return (
      <StoryMockProvider>
        <ColdComplianceSetsProvider>
          <ComplianceSetOverviewCard {...args} />
        </ColdComplianceSetsProvider>
      </StoryMockProvider>
    );
  },
  args: {
    complianceSet: getAllComplianceMocksByStatus(ComplianceStatus.inProgress, 0, addDays(new Date(), 30)),
  },
};

export const WithNearDueDate: Story = {
  render: args => {
    return (
      <StoryMockProvider>
        <ColdComplianceSetsProvider>
          <ComplianceSetOverviewCard {...args} />
        </ColdComplianceSetsProvider>
      </StoryMockProvider>
    );
  },
  args: {
    complianceSet: getAllComplianceMocksByStatus(ComplianceStatus.inProgress, 0, addDays(new Date(), 5)),
  },
};

export const WithNearDueDateButSubmitted: Story = {
  render: args => {
    return (
      <StoryMockProvider>
        <ColdComplianceSetsProvider>
          <ComplianceSetOverviewCard {...args} />
        </ColdComplianceSetsProvider>
      </StoryMockProvider>
    );
  },
  args: {
    complianceSet: getAllComplianceMocksByStatus(ComplianceStatus.submittedByCold, 0, addDays(new Date(), 5)),
  },
};
