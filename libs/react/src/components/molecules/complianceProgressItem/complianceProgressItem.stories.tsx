import { Meta, StoryObj } from '@storybook/react';
import { ComplianceProgressItem } from '@coldpbc/components';
import { withKnobs } from '@storybook/addon-knobs';
import { ComplianceProgressStatus } from '@coldpbc/enums';

const meta: Meta<typeof ComplianceProgressItem> = {
  title: 'Molecules/ComplianceProgressItem',
  component: ComplianceProgressItem,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const NotStarted: Story = {
  render: args => {
    return (
      <div className="w-[300px]">
        <ComplianceProgressItem {...args} />
      </div>
    );
  },
  args: {
    type: ComplianceProgressStatus.not_started,
  },
};

export const NeedsReview: Story = {
  render: args => {
    return (
      <div className="w-[300px]">
        <ComplianceProgressItem {...args} />
      </div>
    );
  },
  args: {
    type: ComplianceProgressStatus.needs_review,
  },
};

export const Bookmarked: Story = {
  render: args => {
    return (
      <div className="w-[300px]">
        <ComplianceProgressItem {...args} />
      </div>
    );
  },
  args: {
    type: ComplianceProgressStatus.bookmarked,
  },
};

export const Complete: Story = {
  render: args => {
    return (
      <div className="w-[300px]">
        <ComplianceProgressItem {...args} />
      </div>
    );
  },
  args: {
    type: ComplianceProgressStatus.complete,
  },
};
