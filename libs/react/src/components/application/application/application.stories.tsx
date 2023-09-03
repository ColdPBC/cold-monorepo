import React, {createContext} from "react";
import { withKnobs } from "@storybook/addon-knobs";
import { Meta, StoryObj } from "@storybook/react";
import { SWRConfig } from "swr";
import {Application} from './application';
import {Auth0Context} from '@auth0/auth0-react';
import {BrowserRouter} from 'react-router-dom';

const meta = {
    title: "Application/Application",
    component: Application,
    tags: ["autodocs"],
    decorators: [withKnobs],
} satisfies Meta<typeof Application>;

export default meta;
type Story = StoryObj<typeof meta>;

// TODO: Refactor this to use separate storybook LD environment instead of mocking LD flags. Add env variables with STORYBOOK_ prefix

export const Default: Story = {
    render: (args: any) => {
        const context = createContext({ flags: {}, flagKeyMap: {}, ldClient: undefined });
        const { Provider } = context;
        return (
            <SWRConfig
                value={{
                    provider: (cache) => {
                        cache.delete("messages");
                        return cache;
                    },
                }}
            >
                <BrowserRouter>
                    <Application/>
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
    }
};

export const Loading: Story = {
    render: (args: any) => {
        return (
            <BrowserRouter>
                <Application/>
            </BrowserRouter>
        );
    },
    parameters: {
        auth0AddOn: null,
    }
};
