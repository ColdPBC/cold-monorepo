import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { JourneyDetailView } from './journeyDetailView';
import { StoryMockProvider } from '@coldpbc/mocks';
import { Card } from '../card';
import { CenterColumnContent } from '../../organisms';

const meta: Meta<typeof JourneyDetailView> = {
  title: 'Molecules/JourneyDetailView',
  component: JourneyDetailView,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return (
      <StoryMockProvider handlers={[]}>
        <CenterColumnContent>
          <Card>
            <JourneyDetailView />
          </Card>
        </CenterColumnContent>
      </StoryMockProvider>
    );
  },
};
