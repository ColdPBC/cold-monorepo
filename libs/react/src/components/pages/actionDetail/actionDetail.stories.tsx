import { StoryMockProvider, getCategoriesHandler, getActionHandler } from '@coldpbc/mocks';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { ActionDetail } from './actionDetail';
import { fireEvent, waitFor, within } from '@storybook/testing-library';
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
  render: args => (
    <StoryMockProvider>
      <ActionDetail id={'1'} />
    </StoryMockProvider>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement.parentElement === null ? canvasElement : canvasElement.parentElement);
    await step('Assign Steward', async () => {
      // find Add Steward button
      const addStewardButton = (await canvas.findByText('Add Steward')).closest('button');
      // click Add Steward button
      if (addStewardButton) {
        fireEvent.click(addStewardButton);
      }
      await waitFor(async () => {
        const stewardDropdown = await canvas.findByTestId('flowbite-dropdown');
        const option = await within(stewardDropdown).findByText('Qaalib Farah');
        fireEvent.click(option);
      });
      await waitFor(async () => {
        await canvas.findByText('Qaalib Farah');
      });
    });

    await step('Assign Target Date', async () => {
      const targetDateText = await canvas.findByText('Target Date: December 10, 2023');
      const targetDateButton = await canvas.findByRole('button', { name: 'Edit Target Date' });
      fireEvent.click(targetDateButton);
      await waitFor(async () => {
        // find button with 10 text
        const button20 = await canvas.findByRole('button', { name: '20' });
        fireEvent.click(button20);
      });
      await waitFor(async () => {
        const currentMonth = new Date().toLocaleString('default', { month: 'long' });
        const currentYear = new Date().getFullYear();
        await canvas.findByText(`Target Date: ${currentMonth} 20, ${currentYear}`);
      });
      fireEvent.click(targetDateButton);
    });
  },
};

export const NoResources: Story = {
  render: args => (
    <StoryMockProvider handlers={[getActionHandler.noResources]}>
      <ActionDetail id={'1'} />
    </StoryMockProvider>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement.parentElement === null ? canvasElement : canvasElement.parentElement);

    await step('No Resources', async () => {
      await expect(canvas.queryByText('Resources')).toBeNull();
    });

    await step('Set all steps to complete', async () => {
      await expect(canvas.queryByText('Keep it up!')).toBeNull();
      const emptyCheckboxes = await canvas.findAllByTestId('step-detail-empty-checkbox');
      fireEvent.click(emptyCheckboxes[0]);
      await waitFor(async () => {
        // expect the empty checkboxes to be less than the original number
        await expect(await canvas.findAllByTestId('step-detail-empty-checkbox')).toHaveLength(emptyCheckboxes.length - 1);
        fireEvent.click(emptyCheckboxes[1]);
      });

      await waitFor(async () => {
        // expect the empty checkboxes to be less than the original number
        await expect(await canvas.findAllByTestId('step-detail-checkbox')).toHaveLength(4);
      });

      await canvas.findByText('Keep it up!');
      await canvas.findByText("You've done everything you can here for now.");
      await canvas.findByText('4/4 Completed');
    });
  },
};

export const AllStepsComplete: Story = {
  render: args => (
    <StoryMockProvider handlers={[getActionHandler.allStepsComplete]}>
      <ActionDetail id={'1'} />
    </StoryMockProvider>
  ),
};

export const NoDueDateSet: Story = {
  render: args => (
    <StoryMockProvider handlers={[getActionHandler.noDueDateSet]}>
      <ActionDetail id={'1'} />
    </StoryMockProvider>
  ),
};

export const ActionWithUsersAssigned: Story = {
  render: args => (
    <StoryMockProvider handlers={[getActionHandler.usersAssigned]}>
      <ActionDetail id={'1'} />
    </StoryMockProvider>
  ),
};
