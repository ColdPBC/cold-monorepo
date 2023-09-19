import { StoryMockProvider, getCategoriesHandler } from '@coldpbc/mocks';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { Journey } from './journey';

const meta: Meta<typeof Journey> = {
  title: 'Pages/Journey',
  component: Journey,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <StoryMockProvider {...args} handlers={[]}>
      <Journey />
    </StoryMockProvider>
  ),
};

export const EmptyData = () => {
  return (
    <StoryMockProvider handlers={[getCategoriesHandler.empty]}>
      <div className="w-[668px]">
        <Journey />
      </div>
    </StoryMockProvider>
  );
};
