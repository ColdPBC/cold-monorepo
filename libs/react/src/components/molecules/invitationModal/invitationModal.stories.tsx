import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { BaseButton } from '../../atoms/button/button';
import { GlobalSizes } from '../../../enums/sizes';
import { InvitationModal, InvitationModalProps } from './invitationModal';
import { auth0UserMock } from '../../../__mocks__/userMock';
import { StoryMockProvider } from '@coldpbc/mocks';
import { TeamMemberSettings } from '@coldpbc/components';
import { userEvent, waitFor, waitForElementToBeRemoved, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof InvitationModal> = {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: 'Molecules/InvitationModal',
	component: InvitationModal,
};
export default meta;

type Story = StoryObj<typeof InvitationModal>;

/*
 * Example Button story with React Hooks.
 * See note below related to this example.
 */
const DefaultComponent = (args: InvitationModalProps) => {
	const [isShow, setIsShow] = useState(false);
	return (
		<div>
			<BaseButton
				textSize={GlobalSizes.medium}
				onClick={() => {
					setIsShow(true);
				}}
				label="Open Modal"
			/>
			<InvitationModal {...args} setShown={setIsShow} shown={isShow} />
		</div>
	);
};

export const Default: Story = {
	render: args => <DefaultComponent {...args} />,
	args: {
		companyName: 'Cold Climate',
	},
};
