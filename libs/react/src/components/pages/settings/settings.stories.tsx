import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { Settings } from './settings';
import { getMembersHandler, StoryMockProvider } from '@coldpbc/mocks';
import { fireEvent, userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof Settings> = {
  title: 'Pages/Settings',
  component: Settings,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => {
    return (
      <StoryMockProvider handlers={[]}>
        <Settings {...args} />
      </StoryMockProvider>
    );
  },
  args: {
    user: {
      coldclimate_claims: {
        org_id: 'org_123',
      },
      name: 'John Doe',
    },
  },
  parameters: {
    launchdarkly: {
      flags: {
        showTeamMemberTable: true,
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement.parentElement === null ? canvasElement : canvasElement.parentElement);
    await step('Invite New User', async () => {
      await userEvent.click(await canvas.findByText('Invite Member'));
      const element = await canvas.getByText('Invite new Users');
      const cancelButton = (await canvas.findByText('Cancel')).closest('button');
      const inviteButton = (await canvas.findByText('Invite')).closest('button');
      // get email address input
      const emailInput = await canvas.findByLabelText('Email Address');
      // type incorrect email format. make sure invite button is disabled
      fireEvent.change(emailInput, { target: { value: 'test' } });
      await expect(inviteButton).toBeDisabled();
      fireEvent.change(emailInput, {
        target: { value: '' },
      });
      fireEvent.change(emailInput, {
        target: { value: 'qaalib.farah@coldclimate.com' },
      });
      console.log(canvasElement.parentElement);
      await expect(inviteButton).toBeEnabled();
      if (inviteButton) {
        await userEvent.click(inviteButton);
      }
      // find a message that says "An invite was sent to qaalib.farah@coldclimate.com"
      await canvas.findAllByText((_, element) => element?.textContent === 'An invite was sent to qaalib.farah@coldclimate.com');
    });
    await step('Switch Between Invitations and Members', async () => {
      await userEvent.click(canvas.getByText('Members'));
      await userEvent.click(canvas.getByText('Invitations'));
      const memberEmails = await canvas.queryAllByText('brec.hanson@coldclimate.com');
      await expect(memberEmails.length).toBe(0);
    });
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
        <Settings {...args} />
      </StoryMockProvider>
    );
  },
  args: {
    user: {
      coldclimate_claims: {
        org_id: 'org_123',
      },
      name: 'John Doe',
    },
  },
  parameters: {
    launchdarkly: {
      flags: {
        showTeamMemberTable: true,
      },
    },
  },
};
