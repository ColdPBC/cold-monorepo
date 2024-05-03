import { Meta, StoryObj } from '@storybook/react';
import { ComplianceManagerAssessmentPreview } from '@coldpbc/components';
import { withKnobs } from '@storybook/addon-knobs';

const meta: Meta<typeof ComplianceManagerAssessmentPreview> = {
  title: 'Organisms/ComplianceManagerAssessmentPreview',
  component: ComplianceManagerAssessmentPreview,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => {
    return (
      <div className="w-[647px]">
        <ComplianceManagerAssessmentPreview {...args} />
      </div>
    );
  },
  args: {},
};
