import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { Survey } from '@coldpbc/components';
import { StoryMockProvider } from '@coldpbc/mocks';
import { getSurveyHandler } from '@coldpbc/mocks';

const meta = {
  title: 'Pages/Survey',
  component: Survey,
  tags: ['autodocs'],
  decorators: [withKnobs],
} satisfies Meta<typeof Survey>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <StoryMockProvider handlers={getSurveyHandler.DEFAULT}>
      <Survey {...args} />
    </StoryMockProvider>
  ),
  args: {
    surveyName: 'qaalib_test',
  },
};

export const InitialSurvey: Story = {
  render: (args) => (
    <StoryMockProvider handlers={getSurveyHandler.DEFAULT}>
      <Survey {...args} />
    </StoryMockProvider>
  ),
  args: {
    surveyName: 'journey_overview',
  },
};
