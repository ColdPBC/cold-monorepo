import { Meta, StoryObj } from '@storybook/react';
import { ComplianceManagerOverviewSection } from '@coldpbc/components';
import { withKnobs } from '@storybook/addon-knobs';
import { getComplianceManagerSectionGroupMock } from '@coldpbc/mocks';

const meta: Meta<typeof ComplianceManagerOverviewSection> = {
  title: 'Organisms/ComplianceManagerOverviewSection',
  component: ComplianceManagerOverviewSection,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => {
    return (
      <div className="w-[900px]">
        <ComplianceManagerOverviewSection {...args} />
      </div>
    );
  },
  args: {
    sectionGroup: getComplianceManagerSectionGroupMock(),
  },
};
