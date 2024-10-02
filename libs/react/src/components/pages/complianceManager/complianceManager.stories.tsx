import { getApiUrl, StoryMockProvider } from '@coldpbc/mocks';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { ComplianceManager, ComplianceRoutes } from '@coldpbc/components';
import { Routes } from 'react-router-dom';
import { http, HttpResponse } from 'msw';

const meta: Meta<typeof ComplianceManager> = {
  title: 'Pages/ComplianceManager',
  component: ComplianceManager,
  tags: ['autodocs'],
  decorators: [withKnobs],
  parameters: {
    launchdarkly: {
      flags: {
        showNewComplianceManagerCold711: true,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => (
    <StoryMockProvider
      memoryRouterProps={{
        initialEntries: ['/questionnaires/rei_pia_2024'],
      }}>
      <Routes>{ComplianceRoutes()}</Routes>
    </StoryMockProvider>
  ),
};

export const Error: Story = {
  render: args => (
    <StoryMockProvider
      memoryRouterProps={{
        initialEntries: ['/questionnaires/rei_pia_2024'],
      }}
      handlers={[
        http.get(getApiUrl('/compliance/:name/organizations/:orgId/responses/counts'), ({ request, params, cookies }) => {
          // return 500 server error
          return HttpResponse.json({}, { status: 500 });
        }),
        http.get(getApiUrl('/compliance/:name/organizations/:orgId/section_groups/responses'), ({ request, params, cookies }) => {
          // return 500 server error
          return HttpResponse.json({}, { status: 500 });
        }),
      ]}>
      <Routes>{ComplianceRoutes()}</Routes>
    </StoryMockProvider>
  ),
};
