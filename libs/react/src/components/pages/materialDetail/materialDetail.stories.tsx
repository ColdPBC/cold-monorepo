import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { MaterialDetail } from '@coldpbc/components';
import { StoryMockProvider } from '@coldpbc/mocks';
import { Route, Routes } from 'react-router-dom';

const meta: Meta<typeof MaterialDetail> = {
  title: 'Pages/MaterialDetail',
  component: MaterialDetail,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <StoryMockProvider memoryRouterProps={{ initialEntries: ['/materials/mat_qg9aabgn9a81mb90bijv9dtf'] }}>
        <Routes>
          <Route path={'/materials/:id'} element={<MaterialDetail />} />
        </Routes>
      </StoryMockProvider>
    );
  },
};
