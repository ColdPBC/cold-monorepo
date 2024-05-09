import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { ComplianceSetOverviewCard } from '@coldpbc/components';
import { getComplianceSetOverviewHandler, StoryMockProvider } from '@coldpbc/mocks';
import { ColdComplianceSetsProvider } from '../../../providers/coldComplianceSetsProvider';

const meta = {
  title: 'Organisms/ComplianceSetOverviewCard',
  component: ComplianceSetOverviewCard,
  tags: ['autodocs'],
  decorators: [withKnobs],
  parameters: {
    launchdarkly: {
      flags: {
        showNewCompliancePageHomeCold671: true,
      },
    },
  },
} satisfies Meta<typeof ComplianceSetOverviewCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NotActive: Story = {
  render: args => {
    return (
      <StoryMockProvider handlers={getComplianceSetOverviewHandler.notActive}>
        <ColdComplianceSetsProvider>
          <ComplianceSetOverviewCard {...args} />
        </ColdComplianceSetsProvider>
      </StoryMockProvider>
    );
  },
  args: {
    name: 'b_corp_2024',
  },
};

export const InProgress0Percent: Story = {
  render: args => {
    return (
      <StoryMockProvider handlers={getComplianceSetOverviewHandler.inProgress}>
        <ColdComplianceSetsProvider>
          <ComplianceSetOverviewCard {...args} />
        </ColdComplianceSetsProvider>
      </StoryMockProvider>
    );
  },
  args: {
    name: 'b_corp_2024',
  },
};

export const InProgress50Percent: Story = {
  render: args => {
    return (
      <StoryMockProvider handlers={getComplianceSetOverviewHandler.inProgress50Percent}>
        <ColdComplianceSetsProvider>
          <ComplianceSetOverviewCard {...args} />
        </ColdComplianceSetsProvider>
      </StoryMockProvider>
    );
  },
  args: {
    name: 'b_corp_2024',
  },
};

export const InProgress100Percent: Story = {
  render: args => {
    return (
      <StoryMockProvider handlers={getComplianceSetOverviewHandler.inProgress100Percent}>
        <ColdComplianceSetsProvider>
          <ComplianceSetOverviewCard {...args} />
        </ColdComplianceSetsProvider>
      </StoryMockProvider>
    );
  },
  args: {
    name: 'b_corp_2024',
  },
};

export const SubmittedByUser: Story = {
  render: args => {
    return (
      <StoryMockProvider handlers={getComplianceSetOverviewHandler.submittedByUser}>
        <ColdComplianceSetsProvider>
          <ComplianceSetOverviewCard {...args} />
        </ColdComplianceSetsProvider>
      </StoryMockProvider>
    );
  },
  args: {
    name: 'b_corp_2024',
  },
};

export const SubmittedByCold: Story = {
  render: args => {
    return (
      <StoryMockProvider handlers={getComplianceSetOverviewHandler.submittedByCold}>
        <ColdComplianceSetsProvider>
          <ComplianceSetOverviewCard {...args} />
        </ColdComplianceSetsProvider>
      </StoryMockProvider>
    );
  },
  args: {
    name: 'b_corp_2024',
  },
};

export const WithDueDate: Story = {
  render: args => {
    return (
      <StoryMockProvider handlers={getComplianceSetOverviewHandler.withDueDate}>
        <ColdComplianceSetsProvider>
          <ComplianceSetOverviewCard {...args} />
        </ColdComplianceSetsProvider>
      </StoryMockProvider>
    );
  },
  args: {
    name: 'rei_pia_2024',
  },
};

export const WithNearDueDate: Story = {
  render: args => {
    return (
      <StoryMockProvider handlers={getComplianceSetOverviewHandler.withNearDueDate}>
        <ColdComplianceSetsProvider>
          <ComplianceSetOverviewCard {...args} />
        </ColdComplianceSetsProvider>
      </StoryMockProvider>
    );
  },
  args: {
    name: 'rei_pia_2024',
  },
};

export const WithNearDueDateButSubmitted: Story = {
  render: args => {
    return (
      <StoryMockProvider handlers={getComplianceSetOverviewHandler.withNearDueDateButSubmitted}>
        <ColdComplianceSetsProvider>
          <ComplianceSetOverviewCard {...args} />
        </ColdComplianceSetsProvider>
      </StoryMockProvider>
    );
  },
  args: {
    name: 'rei_pia_2024',
  },
};
