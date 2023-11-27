import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { GuidanceButton } from './guidanceButton';

const meta: Meta<typeof GuidanceButton> = {
  title: 'Molecules/GuidanceButton',
  component: GuidanceButton,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <BrowserRouter>
        <div className='w-[1440px] h-[100vh] m-auto'>
            <GuidanceButton />
        </div>
    </BrowserRouter>
  )
};