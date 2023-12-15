import { getCategoriesHandler, getFootprintHandler, StoryMockProvider } from '@coldpbc/mocks';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { Home } from './home';
import { within } from '@storybook/testing-library';

const meta: Meta<typeof Home> = {
  title: 'Pages/Home',
  component: Home,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <StoryMockProvider handlers={[]}>
      <Home />
    </StoryMockProvider>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('FootprintOverviewCard', async () => {
      // find text 2022 Company Footprint
      const cardTitle = await canvas.findByText('2022 Company Footprint');
      const card = cardTitle.parentElement.parentElement;
      // find Learn More button within card
      await within(card).findByText('Learn More');
      await within(card).findByTestId('footprint-overview-chart');
    });
    await step('JourneyOverviewCard', async () => {
      // find text 2022 Company Footprint
      const cardTitle = await canvas.findByText('Climate Journey');
      const card = cardTitle.parentElement.parentElement;
      // find Learn More button within card
      await within(card).findByText('Learn More');
      // find spider chart
      await within(card).findByTestId('journey-spider-chart');
    });
    await step('TemperatureCheckCard', async () => {
      await canvas.findByText('Temperature Check');
    });
    await step('NextActionsCard', async () => {
      const cardTitle = await canvas.findByText('Your Next Actions');
      const card = cardTitle.parentElement.parentElement;
      await within(card).findByText('Learn More');
    });
  },
  parameters: {
    launchdarkly: {
      flags: {
        showNextStepsCard: false,
      }
    }
  },
};

export const EmptyFootprintData: Story = {
  render: () => {
    return (
      <StoryMockProvider handlers={[getFootprintHandler.empty, getCategoriesHandler.empty]}>
        <Home />
      </StoryMockProvider>
    );
  },
};
