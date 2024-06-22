import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { ComplianceManagerOverviewSection } from '@coldpbc/components';
import {
  getComplianceManagerOverviewSectionQuestionListActivatedMock,
  getComplianceManagerOverviewSectionQuestionListMock,
  getComplianceManagerOverviewSectionsMock,
  StoryMockProvider,
} from '@coldpbc/mocks';
import { ComplianceManagerStatus } from '@coldpbc/enums';

const meta: Meta<typeof ComplianceManagerOverviewSection> = {
  title: 'Molecules/ComplianceManagerOverviewSection',
  component: ComplianceManagerOverviewSection,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const NotActivated: Story = {
  render: args => (
    <StoryMockProvider
      mqttTopics={{
        'ui/:env/org_123/:name/:sectionGroupId/:sectionId': getComplianceManagerOverviewSectionQuestionListMock,
      }}>
      <ComplianceManagerOverviewSection {...args} />
    </StoryMockProvider>
  ),
  args: {
    ...getComplianceManagerOverviewSectionsMock(),
    collapseOpen: true,
  },
};

export const Activated: Story = {
  render: args => (
    <StoryMockProvider
      mqttTopics={{
        'ui/:env/org_123/:name/:sectionGroupId/:sectionId': getComplianceManagerOverviewSectionQuestionListActivatedMock,
      }}
      complianceManagerContext={{
        status: ComplianceManagerStatus.activated,
      }}>
      <ComplianceManagerOverviewSection {...args} />
    </StoryMockProvider>
  ),
  args: {
    ...getComplianceManagerOverviewSectionsMock(),
    collapseOpen: true,
  },
};

export const ColdAIRunning: Story = {
  render: args => (
    <StoryMockProvider
      complianceManagerContext={{
        status: ComplianceManagerStatus.startedAi,
        data: {
          currentAIStatus: [
            {
              section: 'CHEM',
              questions: ['CHEM-1', 'CHEM-3'],
            },
          ],
        },
      }}
      mqttTopics={{
        'ui/:env/org_123/:name/:sectionGroupId/:sectionId': getComplianceManagerOverviewSectionQuestionListMock,
      }}>
      <ComplianceManagerOverviewSection {...args} />
    </StoryMockProvider>
  ),
  args: {
    ...getComplianceManagerOverviewSectionsMock(),
    collapseOpen: true,
  },
};
