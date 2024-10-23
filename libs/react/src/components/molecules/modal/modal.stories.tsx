import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { BaseButton } from '../../atoms/button/button';
import { ColorNames } from '../../../enums/colors';
import { GlobalSizes } from '../../../enums/sizes';
import { Modal } from '../modal/modal';
import { ButtonTypes } from '@coldpbc/enums';

const meta: Meta<typeof Modal> = {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: 'Molecules/Modal',
	component: Modal,
};
export default meta;

type Story = StoryObj<typeof Modal>;

/*
 * Example Button story with React Hooks.
 * See note below related to this example.
 */
const DefaultComponent = () => {
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
			<Modal
				show={isShow}
				setShowModal={setIsShow}
				header={{
					title: 'Modal Title',
				}}
				body={
					<div className="bg-white px-3 pb-10 flex justify-center">
						<div>Hello, I am a modal</div>
					</div>
				}
			/>
		</div>
	);
};

export const Default: Story = {
	render: () => <DefaultComponent />,
};

const ModalWithContentComponent = () => {
	const [isShow, setIsShow] = useState(false);
	const modelBody = () => {
		return (
			<div className="bg-white px-3 py-5 flex justify-center">
				<div>Hello, I am a modal with content</div>
			</div>
		);
	};
	return (
		<div>
			<BaseButton
				textSize={GlobalSizes.medium}
				onClick={() => {
					setIsShow(true);
				}}
				label="Open Modal"
			/>
			<Modal
				show={isShow}
				setShowModal={setIsShow}
				body={modelBody()}
				header={{
					title: 'Modal Title',
				}}
				footer={{
					rejectButton: {
						label: 'Cancel',
						color: ColorNames.alert,
						textSize: GlobalSizes.medium,
						variant: ButtonTypes.secondary,
						onClick: () => {
							setIsShow(false);
						},
					},
					resolveButton: {
						label: 'Confirm',
						color: ColorNames.jetBlack,
						textSize: GlobalSizes.medium,
						onClick: () => {
							setIsShow(false);
						},
					},
				}}
			/>
		</div>
	);
};

export const ModalWithContent: Story = {
	render: () => <ModalWithContentComponent />,
};
