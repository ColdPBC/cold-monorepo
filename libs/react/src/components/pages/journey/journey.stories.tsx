import {StoryMockProvider, getCategoriesHandler, getAssessmentsHandler} from '@coldpbc/mocks';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { Journey } from './journey';
import {ColdAssessmentsProvider} from "@coldpbc/providers";

const meta: Meta<typeof Journey> = {
  title: 'Pages/Journey',
  component: Journey,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => (
    <StoryMockProvider {...args} handlers={getAssessmentsHandler.default}>
      <ColdAssessmentsProvider>
        <Journey />
      </ColdAssessmentsProvider>
    </StoryMockProvider>
  ),
};

export const EmptyData = () => {
  return (
    <StoryMockProvider handlers={getAssessmentsHandler.empty}>
      <ColdAssessmentsProvider>
        <Journey />
      </ColdAssessmentsProvider>
    </StoryMockProvider>
  );
};
