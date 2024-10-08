import { Meta, StoryObj } from '@storybook/react';
import { SustainabilityPage } from '@coldpbc/components';
import { withKnobs } from '@storybook/addon-knobs';
import { StoryMockProvider } from '@coldpbc/mocks';
import { fireEvent, within } from '@storybook/testing-library';

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

export const OtherAttributesTab: Story = {
  render: () => {
    return (
      <StoryMockProvider>
        <SustainabilityPage />
      </StoryMockProvider>
    );
  },
  play: async ({ canvasElement }) => {
    const otherAttributesTabLabel = within(canvasElement).getByText('Other Attributes');
    fireEvent.click(otherAttributesTabLabel);
  },
};
