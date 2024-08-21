import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { Settings } from './settings';
import { getMembersHandler, StoryMockProvider } from '@coldpbc/mocks';

const meta: Meta<typeof Settings> = {
  title: 'Pages/Settings',
  component: Settings,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => {
    return (
      <StoryMockProvider handlers={[]}>
        <Settings {...args} />
      </StoryMockProvider>
    );
  },
  parameters: {
    launchdarkly: {
      flags: {
        showTeamMemberTable: true,
      },
    },
  },
};

export const NoInvitations: Story = {
  render: args => {
    return (
      <StoryMockProvider handlers={[getMembersHandler.noInvitations]}>
        <Settings {...args} />
      </StoryMockProvider>
    );
  },
  parameters: {
    launchdarkly: {
      flags: {
        showTeamMemberTable: true,
      },
    },
  },
};
