import { StoryMockProvider, getCompliancePageHandler } from '@coldpbc/mocks';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { ComplianceDetail } from './complianceDetail';

const meta: Meta<typeof ComplianceDetail> = {
  title: 'Pages/ComplianceDetail',
  component: ComplianceDetail,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => (
    <StoryMockProvider handlers={[getCompliancePageHandler.default]}>
      <ComplianceDetail />
    </StoryMockProvider>
  ),
};
