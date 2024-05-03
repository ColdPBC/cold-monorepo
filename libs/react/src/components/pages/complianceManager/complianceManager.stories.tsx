import { StoryMockProvider } from '@coldpbc/mocks';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { ComplianceManager } from '@coldpbc/components';
import { Route, Routes } from 'react-router-dom';

const meta: Meta<typeof ComplianceManager> = {
  title: 'Pages/ComplianceManager',
  component: ComplianceManager,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => (
    <StoryMockProvider
      memoryRouterProps={{
        initialEntries: ['/compliance/rei_pia_2024'],
      }}>
      <Routes>
        <Route path={'/compliance/:name'} element={<ComplianceManager />} />
      </Routes>
    </StoryMockProvider>
  ),
};
