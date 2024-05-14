import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { ComplianceManagerOverviewStatusCard } from '@coldpbc/components';
import { getSectionGroupList, StoryMockProvider } from '@coldpbc/mocks';
import { ComplianceManagerStatus } from '@coldpbc/enums';

const meta: Meta<typeof ComplianceManagerOverviewStatusCard> = {
  title: 'Organisms/ComplianceManagerOverviewStatusCard',
  component: ComplianceManagerOverviewStatusCard,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => (
    <StoryMockProvider>
      <ComplianceManagerOverviewStatusCard />
    </StoryMockProvider>
  ),
};

export const Activated: Story = {
  render: args => (
    <StoryMockProvider
      complianceManagerContext={{
        status: ComplianceManagerStatus.activated,
        setStatus: () => {},
        data: {
          mqttComplianceSet: getSectionGroupList({
            name: 'rei_pia_2024',
          }),
          name: 'rei_pia_2024',
        },
      }}>
      <ComplianceManagerOverviewStatusCard />
    </StoryMockProvider>
  ),
};
