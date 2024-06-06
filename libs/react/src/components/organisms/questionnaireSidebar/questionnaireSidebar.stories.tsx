import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { QuestionnaireSidebar } from '@coldpbc/components';
import { getQuestionnaireSidebarComplianceMock } from '@coldpbc/mocks';

const meta: Meta<typeof QuestionnaireSidebar> = {
  title: 'Organisms/QuestionnaireSidebar',
  component: QuestionnaireSidebar,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => {
    return (
      <div className={'w-[407px] h-screen'}>
        <QuestionnaireSidebar {...args} />
      </div>
    );
  },
  args: {
    sectionGroups: getQuestionnaireSidebarComplianceMock(),
  },
};
