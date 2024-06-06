import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { QuestionnaireYesNo } from './questionnaireYesNo';

const meta: Meta<typeof QuestionnaireYesNo> = {
  title: 'Molecules/QuestionnaireYesNo',
  component: QuestionnaireYesNo,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = React.useState(args.value);

    const onChange = (value: any) => {
      setValue(value);
    };

    return <QuestionnaireYesNo value={value} onChange={onChange} />;
  },
  args: {
    value: null,
  },
};
