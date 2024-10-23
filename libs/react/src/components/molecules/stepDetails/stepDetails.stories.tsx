import React, { useState } from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { StepDetails, StepDetailsProps } from '@coldpbc/components';
import { getActionMock, getOrganizationMembersMock } from '@coldpbc/mocks';
import { Assignee, Step } from '@coldpbc/interfaces';
import { StepDetailsVariants } from '@coldpbc/enums';

const meta: Meta<typeof StepDetails> = {
	title: 'Molecules/StepDetails',
	component: StepDetails,
	tags: ['autodocs'],
	decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

const StepDetailsComponent = (args: StepDetailsProps) => {
	const [steps, setSteps] = useState<Step[]>(args.steps);

	const handleStepsUpdate = (steps: Step[]) => {
		setSteps(steps);
	};

	return <StepDetails {...args} steps={steps} handleStepsUpdate={handleStepsUpdate} />;
};

export const Default: Story = {
	render: args => {
		return <StepDetailsComponent {...args} />;
	},
	args: {
		steps: getActionMock().action.steps,
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		handleStepsUpdate: (steps: Step[]) => {},
	},
};

export const SubcategoryActionDetailsCardVariant: Story = {
	render: args => {
		return <StepDetailsComponent {...args} />;
	},
	args: {
		steps: getActionMock().action.steps,
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		handleStepsUpdate: (steps: Step[]) => {},
		variant: StepDetailsVariants.SubcategoryActionDetailsCard,
	},
};
