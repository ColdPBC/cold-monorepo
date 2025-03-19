import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { ComplianceManagerQuestionnaireProgress } from '@coldpbc/components';
import {ComplianceManagerContextMockProvider} from '@coldpbc/mocks';

const meta: Meta<typeof ComplianceManagerQuestionnaireProgress> = {
  title: 'Organisms/ComplianceManagerQuestionnaireProgress',
  component: ComplianceManagerQuestionnaireProgress,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => (
    <ComplianceManagerContextMockProvider>
      <ComplianceManagerQuestionnaireProgress />
    </ComplianceManagerContextMockProvider>
  ),
};
