import React, { createContext } from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { SWRConfig } from 'swr';
import { Application } from './application';
import { BrowserRouter } from 'react-router-dom';
import {
  StoryMockProvider,
  getFootprintHandler,
  getCategoriesHandler,
  auth0UserMock,
} from '@coldpbc/mocks';
import ColdContext from '../../../context/coldContext';
import { Auth0ProviderOptions } from '@auth0/auth0-react';

const meta: Meta<typeof Application> = {
  title: 'Application/Application',
  component: Application,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
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
          <ColdContext.Provider
            value={{
              auth0Options: {
                domain: '',
                clientId: '',
                authorizationParams: {
                  audience: '',
                },
              } as Auth0ProviderOptions,
              launchDarklyClientSideId: '',
            }}
          >
            <Application />
          </ColdContext.Provider>
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
      <StoryMockProvider
        handlers={[getFootprintHandler.empty, getCategoriesHandler.empty]}
      >
        <Application />
      </StoryMockProvider>
    );
  },
};

export const NeedsSignup: Story = {
  render: () => {
    return (
      <BrowserRouter>
        <Application />
      </BrowserRouter>
    );
  },
  parameters: {
    auth0AddOn: {
      user: {
        ...auth0UserMock,
        family_name: null,
        given_name: null,
      },
    },
  },
};
