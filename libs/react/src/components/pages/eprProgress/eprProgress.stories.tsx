import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import {EprProgress} from '@coldpbc/components';
import {
  getEPRMocksWithoutSubmitted,
  StoryMockProvider
} from "@coldpbc/mocks";
import React from "react";
import {GET_EPR_SUBMISSIONS} from "@coldpbc/lib";

const meta = {
  title: 'Pages/EprProgress',
  component: EprProgress,
  tags: ['autodocs'],
  decorators: [withKnobs],
} satisfies Meta<typeof EprProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return (
      <StoryMockProvider
      >
        <EprProgress {...args} />
      </StoryMockProvider>
    );
  },
};

export const WithEmptySubmission: Story = {
  render: (args) => {
    return (
      <StoryMockProvider
        graphqlMocks={[
          {
            query: GET_EPR_SUBMISSIONS,
            handler: () => {
              return Promise.resolve({
                data: {
                  eprSubmissions: getEPRMocksWithoutSubmitted()
                }
              });
            }
          }
        ]}
      >
        <EprProgress {...args} />
      </StoryMockProvider>
    );
  },
};
