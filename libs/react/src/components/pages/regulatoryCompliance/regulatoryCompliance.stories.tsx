import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { StoryMockProvider } from '@coldpbc/mocks';
import { RegulatoryCompliance } from "@coldpbc/components";

const meta: Meta<typeof RegulatoryCompliance> = {
  title: 'Pages/RegulatoryCompliance',
  component: RegulatoryCompliance,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => {
    return (
      <StoryMockProvider>
        <RegulatoryCompliance {...args} />
      </StoryMockProvider>
    );
  },
};
