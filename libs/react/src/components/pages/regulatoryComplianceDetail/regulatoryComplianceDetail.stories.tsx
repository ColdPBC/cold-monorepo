import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { StoryMockProvider } from '@coldpbc/mocks';
import { RegulatoryComplianceDetail } from "@coldpbc/components";

const meta: Meta<typeof RegulatoryComplianceDetail> = {
  title: 'Pages/RegulatoryComplianceDetail',
  component: RegulatoryComplianceDetail,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => {
    return (
      <StoryMockProvider>
        <RegulatoryComplianceDetail {...args} />
      </StoryMockProvider>
    );
  },
};
