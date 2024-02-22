import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { StoryMockProvider } from '@coldpbc/mocks';
import { AutomateComplianceFlowStep } from '@coldpbc/components';

const meta: Meta<typeof AutomateComplianceFlowStep> = {
  title: 'Organisms/AutomateComplianceFlowStep',
  component: AutomateComplianceFlowStep,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => {
    return (
      <StoryMockProvider>
        <AutomateComplianceFlowStep />
      </StoryMockProvider>
    );
  },
};
