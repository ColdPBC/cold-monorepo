import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { SubcategoryActionsList } from './subcategoryActionsList';
import { getActionHandler, StoryMockProvider } from '@coldpbc/mocks';
import { Route, Routes } from 'react-router-dom';

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
