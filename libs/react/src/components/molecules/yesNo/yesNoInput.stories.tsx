import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { YesNoInput } from './yesNoInput';

const meta: Meta<typeof YesNoInput> = {
  title: 'Molecules/YesNo',
  component: YesNoInput,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return <RenderYesNoStory {...args} />;
  },
  args: {
    value: null,
  },
};


const RenderYesNoStory = (args: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [value, setValue] = React.useState(args.value);

  const onChange = (value: any) => {
    setValue(value);
  };

  return <YesNoInput value={value} onChange={onChange} />;

}
