import { Meta, StoryObj } from '@storybook/react';
import { SustainabilityPage } from '@coldpbc/components';
import { withKnobs } from '@storybook/addon-knobs';
import { StoryMockProvider } from '@coldpbc/mocks';

const meta: Meta<typeof SustainabilityPage> = {
  title: 'Pages/SustainabilityPage',
  component: SustainabilityPage,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <StoryMockProvider>
        <SustainabilityPage />
      </StoryMockProvider>
    );
  },
};
