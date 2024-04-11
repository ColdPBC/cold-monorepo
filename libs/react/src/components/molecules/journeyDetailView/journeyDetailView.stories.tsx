import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { JourneyDetailView } from './journeyDetailView';
import { getAssessmentsHandler, StoryMockProvider } from '@coldpbc/mocks';
import { Card } from '../card';
import { CenterColumnContent } from '../../organisms';
import { ColdAssessmentsProvider } from '@coldpbc/providers';

const meta: Meta<typeof JourneyDetailView> = {
  title: 'Molecules/JourneyDetailView',
  component: JourneyDetailView,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => {
    return (
      <StoryMockProvider handlers={getAssessmentsHandler.default}>
        <ColdAssessmentsProvider>
          <CenterColumnContent>
            <Card>
              <JourneyDetailView />
            </Card>
          </CenterColumnContent>
        </ColdAssessmentsProvider>
      </StoryMockProvider>
    );
  },
};

export const SingleCompliance: Story = {
  render: args => {
    return (
      <StoryMockProvider handlers={getAssessmentsHandler.single}>
        <ColdAssessmentsProvider>
          <CenterColumnContent>
            <Card>
              <JourneyDetailView />
            </Card>
          </CenterColumnContent>
        </ColdAssessmentsProvider>
      </StoryMockProvider>
    );
  },
};

export const Empty: Story = {
  render: args => {
    return (
      <StoryMockProvider handlers={getAssessmentsHandler.empty}>
        <ColdAssessmentsProvider>
          <CenterColumnContent>
            <Card>
              <JourneyDetailView />
            </Card>
          </CenterColumnContent>
        </ColdAssessmentsProvider>
      </StoryMockProvider>
    );
  },
};

export const ScoreBasedCompliance: Story = {
  render: args => {
    return (
      <StoryMockProvider handlers={getAssessmentsHandler.scoreBasedCompliance}>
        <ColdAssessmentsProvider>
          <CenterColumnContent>
            <Card>
              <JourneyDetailView />
            </Card>
          </CenterColumnContent>
        </ColdAssessmentsProvider>
      </StoryMockProvider>
    );
  },
};
