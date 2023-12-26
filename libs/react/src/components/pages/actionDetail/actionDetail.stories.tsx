import { StoryMockProvider, getCategoriesHandler, getActionHandler } from '@coldpbc/mocks';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { ActionDetail } from './actionDetail';
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { expect } from '@storybook/jest';
import { addYears, format } from "date-fns";

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
        await userEvent.click(addStewardButton);
      }
      await waitFor(async () => {
        const stewardDropdown = await canvas.findByTestId('flowbite-dropdown');
        const option = await within(stewardDropdown).findByText('Qaalib Farah');
        await userEvent.click(option);
      });
      await waitFor(async () => {
        await canvas.findByText('Qaalib Farah');
      });
    });

    await step('Assign Target Date', async () => {
      const targetDateText = await canvas.findByText('Target Date: December 10, 2023');
      const targetDateButton = await canvas.findByRole('button', { name: 'Edit Target Date' });
      await userEvent.click(targetDateButton);
      // click button that has text of current month and year. example: December 2023
      const currentMonthYearButton = await canvas.findByRole('button', { name: format(new Date(), 'MMMM yyyy') });
      await userEvent.click(currentMonthYearButton);
      //click button with year text
      const currentYearButton = await canvas.findByRole('button', { name: format(new Date(), 'yyyy') });
      await userEvent.click(currentYearButton);
      // find button with text of next year
      const nextYearButton = await canvas.findByRole('button', { name: format(addYears(new Date(), 1), 'yyyy') });
      await userEvent.click(nextYearButton);
      // choose the Jan month button
      const janButton = await canvas.findByRole('button', { name: 'Jan' });
      await userEvent.click(janButton);
      // click button with text of 15
      const dayButton = await canvas.findByRole('button', { name: '15' });
      await userEvent.click(dayButton);
      await waitFor(async () => {
        // expect the target date text to be updated to be January 15 of next year
        const nextYear = format(addYears(new Date(), 1), 'yyyy');
        await expect(canvas.findByText(`Target Date: January 15, ${nextYear}`)).toBeTruthy();
      });
      // click outside of the calendar to close it
      await userEvent.click(targetDateText);
      // verify its closed
      await waitFor(async () => {
        await expect(canvas.queryByRole('button', { name: '15' })).toBeNull();
      });
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
      await userEvent.click(emptyCheckboxes[0]);
      await waitFor(async () => {
        // expect the empty checkboxes to be less than the original number
        await expect(await canvas.findAllByTestId('step-detail-empty-checkbox')).toHaveLength(emptyCheckboxes.length - 1);
        await userEvent.click(emptyCheckboxes[1]);
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
