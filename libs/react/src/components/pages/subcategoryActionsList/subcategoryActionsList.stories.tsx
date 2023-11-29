import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { SubcategoryActionsList } from './subcategoryActionsList';
import { getActionHandler, StoryMockProvider } from '@coldpbc/mocks';
import { Route, Routes } from 'react-router-dom';
import { fireEvent, waitFor } from '@storybook/testing-library';

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
      await waitFor(() => {
        fireEvent.click(getStartedButton);
      });
      const text = await canvas.findByText(
        'Take a few moments to provide the data necessary for this action. After the surveys are complete, CØLD will step away to evaluate your data and build the optimal solution for your company.',
      );
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
