import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { QuestionnaireSidebar } from '@coldpbc/components';
import { QuestionnaireContextMockProvider } from '@coldpbc/mocks';
import { useState } from 'react';

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
    return <SidebarStory {...args} />;
  },
  args: {
    sidebarOpen: true,
    setSidebarOpen: () => {},
  },
};

const SidebarStory = (args: any) => {
  const [open, setOpen] = useState(true);
  return (
    <QuestionnaireContextMockProvider>
      <div className={'w-[407px] h-screen'}>
        <QuestionnaireSidebar
          sidebarOpen={open}
          setSidebarOpen={() => {
            setOpen(!open);
          }}
        />
      </div>
    </QuestionnaireContextMockProvider>
  );
};
