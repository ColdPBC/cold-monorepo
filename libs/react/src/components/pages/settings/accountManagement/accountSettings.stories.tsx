import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { AccountSettingsPage } from './accountSettings';
import { getMembersHandler, StoryMockProvider } from '@coldpbc/mocks';
import { fireEvent, userEvent, within, expect } from '@storybook/test';

const meta: Meta<typeof AccountSettingsPage> = {
  title: 'Pages/AccountSettingsPage',
  component: AccountSettingsPage,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => {
    return (
      <StoryMockProvider handlers={[]}>
        <AccountSettingsPage {...args} />
      </StoryMockProvider>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement.parentElement === null ? canvasElement : canvasElement.parentElement);
    await step('Update First and Last Name', async () => {
      const firstName = await canvas.getByLabelText('first-name');
      const editFirstNameButton = await within(await canvas.getByTestId('edit-first-name-button')).getByRole('button', { name: 'Edit' });
      fireEvent.click(editFirstNameButton);
      const firstNameInput = await canvas.findByLabelText('firstName');
      fireEvent.change(firstNameInput, { target: { value: 'Qaalib1' } });
      const saveButton = await canvas.findByText('Save');
      await userEvent.click(saveButton);
      // check first name input value
      await expect(firstNameInput).toHaveValue('Qaalib1');

      // update last name
      const editLastNameButton = await within(await canvas.getByTestId('edit-last-name-button')).getByRole('button', { name: 'Edit' });
      fireEvent.click(editLastNameButton);
      const lastNameInput = await canvas.findByLabelText('lastName');
      fireEvent.change(lastNameInput, { target: { value: 'Farah1' } });
      const saveLastNameButton = await canvas.findByText('Save');
      await userEvent.click(saveLastNameButton);
      // check last name input value
      await expect(lastNameInput).toHaveValue('Farah1');
    });
    await step('Check Logout Button', async () => {
      await canvas.findByText('Log Out');
    });
  },
};

export const NoInvitations: Story = {
  render: args => {
    return (
      <StoryMockProvider handlers={[getMembersHandler.noInvitations]}>
        <AccountSettingsPage {...args} />
      </StoryMockProvider>
    );
  },
};
