import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { Assignee, Step } from '@coldpbc/interfaces';
import { StepDetailsCheckbox } from './stepDetailsCheckbox';
import React from 'react';
import { getActionMock } from '@coldpbc/mocks';

const meta = {
  title: 'Molecules/StepDetailsCheckbox',
  component: StepDetailsCheckbox,
  tags: ['autodocs'],
  decorators: [withKnobs],
} satisfies Meta<typeof StepDetailsCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

const StepDetailsCheckboxStory = (args: any) => {
  const [complete, setComplete] = React.useState(args.complete);
  return (
    <StepDetailsCheckbox
      {...args}
      complete={complete}
      setComplete={setComplete}
    />
  );
};

export const Default: Story = {
  render: (args) => <StepDetailsCheckboxStory {...args} />,
  args: {
    complete: getActionMock().definition.steps[0].complete,
  },
};
