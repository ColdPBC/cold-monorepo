import { StoryMockProvider, getActionHandler, getCompliancePageHandler } from '@coldpbc/mocks';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { Compliance } from '@coldpbc/components';

const meta: Meta<typeof Compliance> = {
  title: 'Pages/Compliance',
  component: Compliance,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => (
    <StoryMockProvider handlers={[getCompliancePageHandler.default]}>
      <Compliance />
    </StoryMockProvider>
  ),
};
