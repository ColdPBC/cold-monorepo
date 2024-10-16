import { Meta, StoryObj } from '@storybook/react';
import {CreateSupplierPage} from '@coldpbc/components';
import { withKnobs} from '@storybook/addon-knobs';
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
    await waitForElementToBeRemoved(() => canvas.queryByRole('status'));
    const comboBox = await canvas.findByTestId('tier select');
    const comboBoxInput = await within(comboBox).findByTestId('tier select_input');
    comboBoxInput.click();
    // find Tier 1 and click it
    const tier1Option = await within(comboBox).findByTestId('option_1');
    tier1Option.click();
  }
};

export const Tier2Selected: Story = {
  render: () => {
    return (
      <StoryMockProvider>
        <CreateSupplierPage />
      </StoryMockProvider>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await waitForElementToBeRemoved(() => canvas.queryByRole('status'));
    const comboBox = await canvas.findByTestId('tier select');
    const comboBoxInput = await within(comboBox).findByTestId('tier select_input');
    //  find the button and click it
    comboBoxInput.click();
    // find Tier 1 and click it
    const tier1Option = await within(comboBox).findByTestId('option_2');
    tier1Option.click();
  }
};
