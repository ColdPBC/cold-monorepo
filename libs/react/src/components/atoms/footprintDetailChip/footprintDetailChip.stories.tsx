import { FootprintDetailChip } from './footprintDetailChip';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Atoms/FootprintDetailChip',
  component: FootprintDetailChip,
  tags: ['autodocs'],
  decorators: [],
} satisfies Meta<typeof FootprintDetailChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = () => {
  return (
    <div>
      <FootprintDetailChip emissions={120} />
    </div>
  )
};

export const Large = () => {
  return (
    <div>
      <FootprintDetailChip emissions={120} large />
    </div>
  )
};

export const Center = () => {
  return (
    <div className='w-[200px] h-[200px] bg-red relative'>
      <FootprintDetailChip emissions={120} center />
    </div>
  )
};
