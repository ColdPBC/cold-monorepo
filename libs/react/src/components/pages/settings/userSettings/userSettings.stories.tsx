import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { UserSettingsPage } from './userSettings';
import { StoryMockProvider } from '@coldpbc/mocks';

const meta: Meta<typeof UserSettingsPage> = {
  title: 'Pages/UserSettingsPage',
  component: UserSettingsPage,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => {
    return (
      <StoryMockProvider handlers={[]}>
        <UserSettingsPage {...args} />
      </StoryMockProvider>
    );
  },
};
