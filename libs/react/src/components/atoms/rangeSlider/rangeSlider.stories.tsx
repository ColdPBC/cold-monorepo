import React, { useState } from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { RangeSlider } from './rangeSlider';

const meta: Meta<typeof RangeSlider> = {
  title: 'Atoms/RangeSlider',
  component: RangeSlider,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: any) => {
    return <RenderSliderStory {...args} />;
  },
  args: {
    min: 0,
    max: 10,
    label: 'Number of employees',
    inputName: 'employee_number',
    title: 'Select estimated value',
  },
};


const RenderSliderStory = (args: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [values, setValues] = useState([0] as number[]);

  const onChange = (values: number[]) => {
    setValues(values);
  };

  return (
    <div className={'w-96'}>
      <RangeSlider {...args} defaultValue={values[0]} onChange={onChange} />
    </div>
  );
}
