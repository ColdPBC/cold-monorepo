import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { SubcategoryActionsList } from './subcategoryActionsList';
import { getActionHandler, StoryMockProvider } from '@coldpbc/mocks';
import { Route, Routes } from 'react-router-dom';
import { expect, fireEvent, waitFor, within } from '@storybook/test';

const meta: Meta<typeof SubcategoryActionsList> = {
  title: 'Pages/SubcategoryActionsList',
  component: SubcategoryActionsList,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => {
    return (
      <StoryMockProvider memoryRouterProps={{ initialEntries: ['/actions/facilities'] }} handlers={getActionHandler.subCategoryActionsList}>
        <Routes>
          <Route path="/actions/:name" element={<SubcategoryActionsList {...args} />} />
        </Routes>
      </StoryMockProvider>
    );
  },
  play: async ({ canvasElement, step }) => {
    // click Get Started with this action
    const canvas = within(canvasElement);

    await step('Click Get Started with this action', async () => {
      const getStartedButton = await canvas.findByRole('button', {
        name: 'Get Started with this action',
      });
      await waitFor(async () => {
        fireEvent.click(getStartedButton);
      });
      const text = canvas.getByText(
        'Take a few moments to provide the data necessary for this action. After the surveys are complete, CØLD will step away to evaluate your data and build the optimal solution for your company.',
      );
      await expect(text).toBeInTheDocument();
      // look for footprint survey and Energy survey buttons
      const footprintSurveyButton = await canvas.findByRole('button', {
        name: 'Footprint Survey',
      });
      const energySurveyButton = await canvas.findByRole('button', {
        name: 'Energy Survey',
      });
      // check if footprint survey button is disabled
      await expect(footprintSurveyButton).toBeDisabled();
      // check if energy survey button is enabled
      await expect(energySurveyButton).toBeEnabled();
      await waitFor(async () => {
        fireEvent.click(getStartedButton);
      });
    });

    await step('Not Ready to Execute', async () => {
      // find Hold tight while we build out your plan text
      const text = canvas.getByText('Hold tight while we build out your plan');
      await expect(text).toBeInTheDocument();
      // find We’re working on building the optimal solution for your company text
      const text2 = canvas.getByText('We’re working on building the optimal solution for your company');
      await expect(text2).toBeInTheDocument();
    });

    await step('Check Subcategory Description', async () => {
      const text = canvas.getByTestId('subcategory-description');
      await expect(text).toBeInTheDocument();
    });
  },
};

export const ActionsStarted: Story = {
  render: args => {
    return (
      <StoryMockProvider memoryRouterProps={{ initialEntries: ['/actions/facilities'] }} handlers={getActionHandler.subCategoryActionsListActionsStarted}>
        <Routes>
          <Route path="/actions/:name" element={<SubcategoryActionsList {...args} />} />
        </Routes>
      </StoryMockProvider>
    );
  },
};
