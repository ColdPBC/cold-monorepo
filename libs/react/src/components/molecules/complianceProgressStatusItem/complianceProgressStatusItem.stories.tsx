import { Meta, StoryObj } from '@storybook/react';
import { ComplianceProgressStatusItem } from '@coldpbc/components';
import { withKnobs } from '@storybook/addon-knobs';
import { ComplianceProgressStatus } from '@coldpbc/enums';
import { ComplianceManagerContextMockProvider } from "@coldpbc/mocks";

const meta: Meta<typeof ComplianceProgressStatusItem> = {
  title: 'Molecules/ComplianceProgressStatusItem',
  component: ComplianceProgressStatusItem,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const NotStarted: Story = {
  render: args => {
    return (
      <ComplianceManagerContextMockProvider complianceManagerContext={{}}>
        <div className="w-[300px]">
          <ComplianceProgressStatusItem {...args} />
        </div>
      </ComplianceManagerContextMockProvider>
    );
  },
  args: {
    type: ComplianceProgressStatus.not_started,
  },
};

export const NeedsReview: Story = {
  render: args => {
    return (
      <ComplianceManagerContextMockProvider complianceManagerContext={{}}>
        <div className="w-[300px]">
          <ComplianceProgressStatusItem {...args} />
        </div>
      </ComplianceManagerContextMockProvider>
    );
  },
  args: {
    type: ComplianceProgressStatus.ai_answered,
  },
};

export const Bookmarked: Story = {
  render: args => {
    return (
      <ComplianceManagerContextMockProvider complianceManagerContext={{}}>
        <div className="w-[300px]">
          <ComplianceProgressStatusItem {...args} />
        </div>
      </ComplianceManagerContextMockProvider>
    );
  },
  args: {
    type: ComplianceProgressStatus.bookmarked,
  },
};

export const Complete: Story = {
  render: args => {
    return (
      <ComplianceManagerContextMockProvider complianceManagerContext={{}}>
        <div className="w-[300px]">
          <ComplianceProgressStatusItem {...args} />
        </div>
      </ComplianceManagerContextMockProvider>
    );
  },
  args: {
    type: ComplianceProgressStatus.user_answered,
  },
};
