import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { ComplianceManagerOverviewModal } from '@coldpbc/components';
import { StoryMockProvider } from '@coldpbc/mocks';

const meta: Meta<typeof ComplianceManagerOverviewModal> = {
  title: 'Organisms/ComplianceManagerOverviewModal',
  component: ComplianceManagerOverviewModal,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => (
    <StoryMockProvider>
      <ComplianceManagerOverviewModal {...args} />
    </StoryMockProvider>
  ),
  args: {
    show: true,
    setShowModal: () => {},
  },
};
