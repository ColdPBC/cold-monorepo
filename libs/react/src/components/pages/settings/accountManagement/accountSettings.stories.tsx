import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { AccountSettingsPage } from './accountSettings';
import { getMembersHandler, StoryMockProvider } from '@coldpbc/mocks';

const meta: Meta<typeof AccountSettingsPage> = {
  title: 'Pages/AccountSettingsPage',
  component: AccountSettingsPage,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => {
    return (
      <StoryMockProvider handlers={[]}>
        <AccountSettingsPage {...args} />
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
        <AccountSettingsPage {...args} />
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
