import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { MaterialDetail } from '@coldpbc/components';
import { getMaterialGraphQLMock, StoryMockProvider } from '@coldpbc/mocks';
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
      <StoryMockProvider
        memoryRouterProps={{ initialEntries: ['/materials/material_1'] }}
        graphqlMocks={getMaterialGraphQLMock}
      >
        <Routes>
          <Route path={'/materials/:id'} element={<MaterialDetail />} />
        </Routes>
      </StoryMockProvider>
    );
  },
};
