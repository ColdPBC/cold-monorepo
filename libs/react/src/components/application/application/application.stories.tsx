import React, { createContext } from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { SWRConfig } from 'swr';
import { Application } from './application';
import { BrowserRouter } from 'react-router-dom';
import { StoryMockProvider, getFootprintHandler, getCategoriesHandler } from '@coldpbc/mocks';
import { Provider } from 'launchdarkly-react-client-sdk/lib/context';
import { render } from 'react-dom';

const meta: Meta<typeof Application> = {
  title: 'Application/Application',
  component: Application,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

// TODO: Refactor this to use separate storybook LD environment instead of mocking LD flags. Add env variables with STORYBOOK_ prefix

export const Default: Story = {
  render: () => {
    const context = createContext({
      flags: {},
      flagKeyMap: {},
      ldClient: undefined,
    });
    const { Provider } = context;
    return (
      <SWRConfig
        value={{
          provider: (cache) => {
            cache.delete('messages');
            return cache;
          },
        }}
      >
        <BrowserRouter>
          <Application />
        </BrowserRouter>
      </SWRConfig>
    );
  },
  parameters: {
    launchdarkly: {
      flags: {
        showTeamMemberTable: true,
      },
    },
  },
};

export const Loading: Story = {
  render: () => {
    return (
      <BrowserRouter>
        <Application />
      </BrowserRouter>
    );
  },
  parameters: {
    auth0AddOn: null,
  },
};

export const EmptyFootprintData: Story = {
  render: () => {
    return (
      <StoryMockProvider handlers={[getFootprintHandler.empty, getCategoriesHandler.empty]}>
        <Application />
      </StoryMockProvider>
    );
  },
};

export const Handle404 = () => {
  return (
    <StoryMockProvider handlers={[getFootprintHandler.handle404, getCategoriesHandler.handle404]}>
      <Application />
    </StoryMockProvider>
  );
};
