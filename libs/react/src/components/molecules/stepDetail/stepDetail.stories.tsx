import React, { useState } from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { getActionMock, getOrganizationMembersMock } from '@coldpbc/mocks';
import { StepDetail, StepDetailProps } from '@coldpbc/components';
import { Step } from '@coldpbc/interfaces';

const meta: Meta<typeof StepDetail> = {
	title: 'Molecules/StepDetail',
	component: StepDetail,
	tags: ['autodocs'],
	decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

const StepDetailComponent = (args: StepDetailProps) => {
	const [step, setStep] = useState<Step>(args.step);

	const handleStepUpdate = (step: Step) => {
		setStep(step);
	};

	return <StepDetail {...args} step={step} handleStepUpdate={handleStepUpdate} />;
};

export const WithoutUser: Story = {
	render: args => {
		return <StepDetailComponent {...args} />;
	},
	args: {
		step: getActionMock().action.steps[0],
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		handleStepUpdate: (step: Step) => {},
	},
};

export const WithUser: Story = {
	render: args => {
		return <StepDetailComponent {...args} />;
	},
	args: {
		step: {
			...getActionMock().action.steps[0],
			assignee: getOrganizationMembersMock().members[0],
		},
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		handleStepUpdate: (step: Step) => {},
	},
};
