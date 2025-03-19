import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { TeamMemberSettings } from '@coldpbc/components';
import { StoryMockProvider } from '@coldpbc/mocks';

const meta: Meta<typeof TeamMemberSettings> = {
  title: 'Organisms/TeamMemberSettings',
  component: TeamMemberSettings,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return (
      <StoryMockProvider handlers={[]}>
        <TeamMemberSettings {...args} />
      </StoryMockProvider>
    );
  },
};
