import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { ComplianceManagerOverviewSection } from '@coldpbc/components';
import { getComplianceManagerOverviewSectionQuestionListMock, getComplianceManagerOverviewSectionsMock, StoryMockProvider } from '@coldpbc/mocks';
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
        'ui/qaalib/org_123/:name/:sectionGroupId/:sectionId': getComplianceManagerOverviewSectionQuestionListMock,
      }}>
      <ComplianceManagerOverviewSection {...args} />
    </StoryMockProvider>
  ),
  args: {
    ...getComplianceManagerOverviewSectionsMock(),
    collapseOpen: true,
    setGroupCounts: () => {},
  },
};

export const ColdAIRunning: Story = {
  render: args => (
    <StoryMockProvider
      complianceManagerContext={{
        status: ComplianceManagerStatus.startedAi,
      }}
      mqttTopics={{
        'ui/qaalib/org_123/:name/:sectionGroupId/:sectionId': getComplianceManagerOverviewSectionQuestionListMock,
      }}>
      <ComplianceManagerOverviewSection {...args} />
    </StoryMockProvider>
  ),
  args: {
    ...getComplianceManagerOverviewSectionsMock(),
    collapseOpen: true,
    setGroupCounts: () => {},
  },
};
