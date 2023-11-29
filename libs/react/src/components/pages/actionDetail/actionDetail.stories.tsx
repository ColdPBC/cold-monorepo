import {
  StoryMockProvider,
  getCategoriesHandler,
  getActionHandler,
} from '@coldpbc/mocks';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { ActionDetail } from './actionDetail';
import { fireEvent, userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof ActionDetail> = {
  title: 'Pages/ActionDetail',
  component: ActionDetail,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <StoryMockProvider>
      <ActionDetail id={'1'} />
    </StoryMockProvider>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(
      canvasElement.parentElement === null
        ? canvasElement
        : canvasElement.parentElement,
    );
    await step('Assign Steward', async () => {
      // find Add Steward button
      const addStewardButton = (await canvas.findByText('Add Steward')).closest(
        'button',
      );
      // click Add Steward button
      if (addStewardButton) {
        await userEvent.click(addStewardButton);
      }
      const stewardDropdown = await canvas.findByTestId('flowbite-dropdown');
      const option = await within(stewardDropdown).findByText('Qaalib Farah');
      await userEvent.click(option);
      await canvas.findByText('Qaalib Farah');
    });
  },
};

export const NoResources: Story = {
  render: (args) => (
    <StoryMockProvider handlers={[getActionHandler.noResources]}>
      <ActionDetail id={'1'} />
    </StoryMockProvider>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(
      canvasElement.parentElement === null
        ? canvasElement
        : canvasElement.parentElement,
    );
    await step('No Resources', async () => {
      // check if the Resources element is not present
      await expect(canvas.queryByText('Resources')).toBeNull();
    });
    await step('Set all steps to complete', async () => {
      // query Keep it up! text. expect it to be null
      await expect(canvas.queryByText('Keep it up!')).toBeNull();
      // find all steps using data-testid = step-detail
      const steps = await canvas.findAllByTestId('step-detail');
      // find all empty checkboxes
      const emptyCheckboxes = await canvas.findAllByTestId(
        'step-detail-empty-checkbox',
      );
      console.log('emptyCheckboxes', emptyCheckboxes);
      fireEvent.click(emptyCheckboxes[0]);
      fireEvent.click(emptyCheckboxes[1]);
    });
  },
};

export const AllStepsComplete: Story = {
  render: (args) => (
    <StoryMockProvider handlers={[getActionHandler.allStepsComplete]}>
      <ActionDetail id={'1'} />
    </StoryMockProvider>
  ),
};

export const NoDueDateSet: Story = {
  render: (args) => (
    <StoryMockProvider handlers={[getActionHandler.noDueDateSet]}>
      <ActionDetail id={'1'} />
    </StoryMockProvider>
  ),
};

export const ActionWithUsersAssigned: Story = {
  render: (args) => (
    <StoryMockProvider handlers={[getActionHandler.usersAssigned]}>
      <ActionDetail id={'1'} />
    </StoryMockProvider>
  ),
};
