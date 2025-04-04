import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { StoryMockProvider } from '@coldpbc/mocks';
import { RegulatoryComplianceDetail } from '@coldpbc/components';
import { Route, Routes } from 'react-router-dom';

const meta: Meta<typeof RegulatoryComplianceDetail> = {
  title: 'Pages/RegulatoryComplianceDetail',
  component: RegulatoryComplianceDetail,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return (
      <StoryMockProvider memoryRouterProps={{
        initialEntries: [`/regulatory_compliance/responsible-textile-recovery`],
      }}>
        <Routes>
          <Route path={'/regulatory_compliance/:slug'} element={<RegulatoryComplianceDetail />} />
        </Routes>
      </StoryMockProvider>
    );
  },
};
