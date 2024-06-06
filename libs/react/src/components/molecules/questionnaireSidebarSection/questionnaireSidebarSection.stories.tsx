import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { QuestionnaireSidebarSection } from '@coldpbc/components';
import { ComplianceProgressStatus } from '@coldpbc/enums';

const meta: Meta<typeof QuestionnaireSidebarSection> = {
  title: 'Molecules/QuestionnaireSidebarSection',
  component: QuestionnaireSidebarSection,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => {
    return (
      <div className={'w-[407px]'}>
        <QuestionnaireSidebarSection {...args} />
      </div>
    );
  },
  args: {
    section: {
      name: 'Brand Information',
      questions: [
        {
          id: 'question_1',
          prompt: 'What is your brand name?',
          order: 1,
          status: ComplianceProgressStatus.user_answered,
        },
        {
          id: 'question_2',
          prompt: 'What is your brand logo?',
          order: 2,
          status: ComplianceProgressStatus.user_answered,
        },
        {
          id: 'question_3',
          prompt: 'What is your brand tagline?',
          order: 3,
          status: ComplianceProgressStatus.bookmarked,
        },
        {
          id: 'question_4',
          prompt: 'What is your brand name?',
          order: 4,
          status: ComplianceProgressStatus.not_started,
        },
        {
          id: 'question_5',
          prompt: 'What is your brand logo?',
          order: 5,
          status: ComplianceProgressStatus.ai_answered,
        },
        {
          id: 'question_6',
          prompt: 'What is your brand tagline?',
          order: 6,
          status: ComplianceProgressStatus.ai_answered,
        },
        {
          id: 'question_7',
          prompt: 'What is your brand name?',
          order: 7,
          status: ComplianceProgressStatus.not_started,
        },
        {
          id: 'question_8',
          prompt: 'What is your brand logo?',
          order: 8,
          status: ComplianceProgressStatus.not_started,
        },
        {
          id: 'question_9',
          prompt: 'What is your brand tagline?',
          order: 9,
          status: ComplianceProgressStatus.not_started,
        },
        {
          id: 'question_10',
          prompt: 'What is your brand name?',
          order: 10,
          status: ComplianceProgressStatus.not_started,
        },
        {
          id: 'question_11',
          prompt: 'What is your brand logo?',
          order: 11,
          status: ComplianceProgressStatus.not_started,
        },
        {
          id: 'question_12',
          prompt: 'What is your brand tagline?',
          order: 12,
          status: ComplianceProgressStatus.bookmarked,
        },
      ],
    },
    sideBarExpanded: true,
  },
};
