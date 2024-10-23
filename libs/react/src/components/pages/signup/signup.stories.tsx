import { auth0UserMock, getEmptyPoliciesSignedMock, getPoliciesSignedMock, getSignUpHandler, StoryMockProvider } from '@coldpbc/mocks';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { ApplicationToaster, SignupPage } from '@coldpbc/components';
import { fireEvent, userEvent, waitFor, waitForElementToBeRemoved, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof SignupPage> = {
	title: 'Pages/SignupPage',
	component: SignupPage,
	tags: ['autodocs'],
	decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const NewUserExistingCompany: Story = {
	render: args => (
		<StoryMockProvider handlers={getSignUpHandler.DEFAULT}>
			<SignupPage
				userData={{
					...auth0UserMock,
					given_name: undefined,
					family_name: undefined,
				}}
				signedPolicyData={getEmptyPoliciesSignedMock()}
			/>
		</StoryMockProvider>
	),
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);

		const spinner = canvas.queryByRole('status');

		await waitForElementToBeRemoved(() => canvas.queryByRole('status'));

		let continueButton = await canvas.findByRole('button', { name: 'Continue' });

		const firstNameInput = canvas.getByRole('textbox', {
			name: 'firstName',
		});
		const lastNameInput = canvas.getByRole('textbox', {
			name: 'lastName',
		});
		const companyNameInput = canvas.getByRole('textbox', {
			name: 'companyName',
		});
		const isAgreedToPrivacyAndTOSInput = canvas.getByRole('checkbox', {
			name: 'isAgreedToPrivacyAndTOS',
		});
		await step('Validate the form', async () => {
			await waitFor(async () => {
				fireEvent.change(firstNameInput, { target: { value: 'John' } });
				fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
				await expect(companyNameInput).toBeDisabled();
				fireEvent.click(isAgreedToPrivacyAndTOSInput);
			});
			await expect(continueButton).not.toBeDisabled();
		});

		await step('Invalidate the form', async () => {
			await waitFor(async () => {
				fireEvent.change(firstNameInput, { target: { value: '' } });
				fireEvent.change(lastNameInput, { target: { value: '' } });
				fireEvent.click(isAgreedToPrivacyAndTOSInput);
				continueButton = await canvas.findByRole('button', { name: 'Continue' });
				await expect(continueButton).toBeDisabled();
			});
		});
	},
};

export const OnSignupError: Story = {
	render: args => (
		<StoryMockProvider handlers={getSignUpHandler.server500Error}>
			<SignupPage
				userData={{
					...auth0UserMock,
					given_name: undefined,
					family_name: undefined,
				}}
				signedPolicyData={getEmptyPoliciesSignedMock()}
			/>
			<ApplicationToaster />
		</StoryMockProvider>
	),
	play: async ({ canvasElement, step }) => {
		// fill out form, when click continue, get error toast message 'Error creating account'
		await step('Fill out form', async () => {
			const canvas = within(canvasElement);
			const spinner = canvas.queryByRole('status');

			await waitForElementToBeRemoved(() => canvas.queryByRole('status'));

			const firstNameInput = canvas.getByRole('textbox', {
				name: 'firstName',
			});
			const lastNameInput = canvas.getByRole('textbox', {
				name: 'lastName',
			});
			const companyNameInput = canvas.getByRole('textbox', {
				name: 'companyName',
			});
			const isAgreedToPrivacyAndTOSInput = canvas.getByRole('checkbox', {
				name: 'isAgreedToPrivacyAndTOS',
			});
			const continueButton = canvas.getByRole('button', { name: 'Continue' });
			await waitFor(async () => {
				fireEvent.change(firstNameInput, { target: { value: 'John' } });
				fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
				fireEvent.change(companyNameInput, { target: { value: 'Company' } });
				fireEvent.click(isAgreedToPrivacyAndTOSInput);
				fireEvent.click(continueButton);
			});
			await waitFor(async () => {
				await expect(canvas.getByText('Error creating account')).toBeInTheDocument();
			});
		});
	},
};
