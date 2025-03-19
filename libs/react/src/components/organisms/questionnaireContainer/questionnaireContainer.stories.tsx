import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { QuestionnaireContainer } from '@coldpbc/components';
import { QuestionnaireContextMockProvider } from '@coldpbc/mocks';

const meta: Meta<typeof QuestionnaireContainer> = {
  title: 'Organisms/QuestionnaireContainer',
  component: QuestionnaireContainer,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => {
    return <QuestionnaireContainerStory {...args} />;
  },
};

const QuestionnaireContainerStory = (args: any) => {
  return (
    <QuestionnaireContextMockProvider>
      <div className={'w-[982px] h-screen'}>
        <QuestionnaireContainer />
      </div>
    </QuestionnaireContextMockProvider>
  );
};
