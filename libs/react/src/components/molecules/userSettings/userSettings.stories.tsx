import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { UserSettings } from './userSettings';
import { StoryMockProvider } from '@coldpbc/mocks';
import { MainContent } from '../../organisms/mainContent';

const meta: Meta<typeof UserSettings> = {
  title: 'Molecules/UserSettings',
  component: UserSettings,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return (
      <StoryMockProvider handlers={[]}>
        <MainContent>
            <UserSettings />
        </MainContent>
      </StoryMockProvider>
    );
  },
};
