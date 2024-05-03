import { Meta, StoryObj } from '@storybook/react';
import { ComplianceManagerQuestionnaireProgress } from '@coldpbc/components';
import { withKnobs } from '@storybook/addon-knobs';
import { ColdComplianceManagerContext } from '@coldpbc/context';
import { ComplianceManagerStatus } from '@coldpbc/enums';
import { getOrganizationComplianceManagerMock, getSingleComplianceManagerMock } from '@coldpbc/mocks';

const meta: Meta<typeof ComplianceManagerQuestionnaireProgress> = {
  title: 'Organisms/ComplianceManagerQuestionnaireProgress',
  component: ComplianceManagerQuestionnaireProgress,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => {
    return (
      <div className="w-[647px]">
        <ColdComplianceManagerContext.Provider
          value={{
            status: ComplianceManagerStatus.activated,
            setStatus: () => {},
            data: {
              complianceSet: getSingleComplianceManagerMock(),
              orgComplianceSet: getOrganizationComplianceManagerMock()[0],
            },
          }}>
          <ComplianceManagerQuestionnaireProgress {...args} />
        </ColdComplianceManagerContext.Provider>
      </div>
    );
  },
  args: {},
};
