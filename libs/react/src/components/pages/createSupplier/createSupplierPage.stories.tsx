import { Meta, StoryObj } from '@storybook/react';
import {CreateSupplierPage} from '@coldpbc/components';
import { withKnobs } from '@storybook/addon-knobs';
import { StoryMockProvider } from '@coldpbc/mocks';
import {waitForElementToBeRemoved, within} from "@storybook/testing-library";

const meta: Meta<typeof CreateSupplierPage> = {
  title: 'Pages/CreateSupplierPage',
  component: CreateSupplierPage,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <StoryMockProvider>
        <CreateSupplierPage />
      </StoryMockProvider>
    );
  },
};

export const Tier1Selected: Story = {
  render: () => {
    return (
      <StoryMockProvider>
        <CreateSupplierPage />
      </StoryMockProvider>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const spinner = canvas.queryByRole('status');

    await waitForElementToBeRemoved(() => canvas.queryByRole('status'));

  }
};
