import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { UserSettingsPage } from './userSettings';
import { StoryMockProvider } from '@coldpbc/mocks';
import { fireEvent, userEvent, waitFor, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof UserSettingsPage> = {
	title: 'Pages/UserSettingsPage',
	component: UserSettingsPage,
	tags: ['autodocs'],
	decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: args => {
		return (
			<StoryMockProvider handlers={[]}>
				<UserSettingsPage {...args} />
			</StoryMockProvider>
		);
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
			// switch back to members
			await userEvent.click(canvas.getByText('Invitations'));
			await userEvent.click(canvas.getByText('Members'));
		});
		await step('Check Update Role', async () => {
			// select a row with role cell with Member
			const tableRows = await canvas.findAllByTestId('table-row-element');
			// find the first row that has role cell with Admin
			const memberRow = tableRows.find(row => {
				// get all child elements in the row
				const roleCells = row.querySelectorAll('td');
				return roleCells[1].textContent === 'dan.lindquist+8-27_1@coldclimate.com';
			});
			if (!memberRow) throw new Error('Member row not found');
			// click the button in that row
			const tableButton = within(memberRow).getByTestId('table-actions');
			await userEvent.click(tableButton);
			// click update role button
			const updateRoleButton = await within(memberRow).findByText('Update Role');
			await userEvent.click(updateRoleButton);
			// get Modal element
			const modal = await canvas.findByTestId('modal-overlay');
			// get Update Role and Cancel buttons
			const updateRole = await within(modal).findByRole('button', { name: 'Update Role' });
			const cancel = await within(modal).findByRole('button', { name: 'Cancel' });
			// click Update Role
			await userEvent.click(updateRole);
			// check the table again to see if the role has changed
			const updatedTableRows = await canvas.findAllByTestId('table-row-element');
			// find the first row that has role cell with Admin
			const updatedMemberRow = updatedTableRows.find(row => {
				const roleCells = row.querySelectorAll('td');
				return roleCells[1].textContent === 'dan.lindquist+8-27_1@coldclimate.com';
			});
			if (!updatedMemberRow) throw new Error('Updated member row not found');
			await waitFor(async () => {
				const roleCells = await within(updatedMemberRow).findAllByRole('cell');
				await expect(roleCells[2].textContent).toBe('Member');
			});
		});
		await step('Check Remove User', async () => {
			// get all table rows using data-testid table-row-element
			const tableRows = await canvas.findAllByTestId('table-row-element');
			// find the first row that has role cell with Admin
			const adminRow = tableRows.find(row => {
				const roleCells = within(row).getAllByRole('cell');
				return roleCells[2].textContent === 'Admin';
			});
			if (!adminRow) throw new Error('Admin row not found');
			const secondCell = within(adminRow).getAllByRole('cell')[1];
			const email = secondCell.textContent as string;
			// find the button in that row
			const tableButton = within(adminRow).getByTestId('table-actions');
			// click the button
			await userEvent.click(tableButton);
			// click Remove User
			const removeUserButton = await canvas.findByText('Remove User');
			await userEvent.click(removeUserButton);
			// find by test id modal-overlay
			const modal = await canvas.findByTestId('modal-overlay');
			// find text Remove User
			const removeButton = within(modal).getByRole('button', { name: 'Remove User' });
			const cancelButton = within(modal).getByRole('button', { name: 'Cancel' });
			within(modal).getByText((content, element: Element | null) => {
				const hasText = (element: Element | null) => element?.textContent === `Are you sure you want to remove ${email} from your company?`;
				const elementHasText = hasText(element);
				const childrenDontHaveText = Array.from(element?.children || []).every(child => !hasText(child));
				return elementHasText && childrenDontHaveText;
			});
			// click Remove User
			await userEvent.click(removeButton);
			// make sure the users email text is not in the table
			const tableRowsAfter = await canvas.findByTestId('table-element');
			await waitFor(async () => {
				await expect(within(tableRowsAfter).queryByText(email)).toBeNull();
			});
		});
		await step('Check Cancel Invite', async () => {
			// click Members button and then Invitations button
			await userEvent.click(canvas.getByText('Members'));
			await userEvent.click(canvas.getByText('Invitations'));
			// get all table rows using data-testid table-row-element
			const tableRows = await canvas.findAllByTestId('table-row-element');
			// find the first row with email troy.morvant+api_test@coldclimate.com
			const inviteRow = tableRows.find(row => {
				const roleCells = within(row).getAllByRole('cell');
				return roleCells[1].textContent === 'troy.morvant+api_test@coldclimate.com';
			});
			if (!inviteRow) throw new Error('Invite row not found');
			// find the button in that row
			const tableButton = within(inviteRow).getByTestId('table-actions');
			// click the button
			await userEvent.click(tableButton);
			// click Delete Invite
			const deleteInviteButton = await canvas.findByText('Cancel Invite');
			await userEvent.click(deleteInviteButton);
			// check user is removed from the table
			const tableRowsAfter = await canvas.findByTestId('table-element');
			await waitFor(async () => {
				await expect(within(tableRowsAfter).queryByText('troy.morvant+api_test@coldclimate.com')).toBeNull();
			});
		});
		await step('Check Resend Invite', async () => {
			// get all table rows using data-testid table-row-element
			const tableRows = await canvas.findAllByTestId('table-row-element');
			// find the first row with email
			const inviteRow = tableRows.find(row => {
				const roleCells = within(row).getAllByRole('cell');
				return roleCells[1].textContent === 'troy.morvant+TEST_OWNER@coldclimate.com';
			});
			if (!inviteRow) throw new Error('Invite row not found');
			// find the button in that row
			const tableButton = within(inviteRow).getByTestId('table-actions');
			// click the button
			await userEvent.click(tableButton);
			// click Delete Invite
			const resendInviteButton = await canvas.findByText('Resend Invite');
			await userEvent.click(resendInviteButton);
		});
	},
};
