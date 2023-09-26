import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { TeamMembersSettings } from './teamMembersSettings';
import { SWRConfig } from 'swr';
import { StoryMockProvider } from '@coldpbc/mocks';

const meta: Meta<typeof TeamMembersSettings> = {
  title: 'Pages/TeamMembersSettings',
  component: TeamMembersSettings,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return (
      <StoryMockProvider handlers={[]}>
        <TeamMembersSettings {...args} />
      </StoryMockProvider>
    );
  },
  args: {
    user: {
      coldclimate_claims: {
        org_id: 'org_123',
      },
      name: 'John Doe',
    },
  },
  parameters: {
    launchdarkly: {
      flags: {
        showTeamMemberTable: true,
      },
    },
  },
};
