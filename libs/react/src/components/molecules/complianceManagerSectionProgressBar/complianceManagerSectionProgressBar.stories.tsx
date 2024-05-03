import { Meta, StoryObj } from '@storybook/react';
import { ComplianceManagerSectionProgressBar } from '@coldpbc/components';
import { withKnobs } from '@storybook/addon-knobs';
import { ComplianceProgressStatus } from '@coldpbc/enums';

const meta: Meta<typeof ComplianceManagerSectionProgressBar> = {
  title: 'Molecules/ComplianceManagerSectionProgressBar',
  component: ComplianceManagerSectionProgressBar,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => {
    return (
      <div className="w-[620px]">
        <ComplianceManagerSectionProgressBar {...args} />
      </div>
    );
  },
  args: {
    questions: [
      {
        prompt: 'Did your company advocate and/or engage in climate action in 2023?',
        status: ComplianceProgressStatus.not_started,
      },
      {
        prompt: 'What actions did your company take to advocate and/or engage?',
        status: ComplianceProgressStatus.complete,
      },
      {
        prompt: "Indicate your company's public exposure on climate action",
        status: ComplianceProgressStatus.needs_review,
      },
      {
        prompt: "Do you have any additional details to share publicly about your company's efforts to\naddress climate change?",
        status: ComplianceProgressStatus.needs_review,
      },
      {
        prompt: 'Please share any information on the types of climate policy and advocacy information\nand/or support that would be helpful for your organization:',
        status: ComplianceProgressStatus.bookmarked,
      },
    ],
  },
};
