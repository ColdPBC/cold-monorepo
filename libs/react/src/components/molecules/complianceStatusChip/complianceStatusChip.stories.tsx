import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { ComplianceStatusChip } from '@coldpbc/components';
import { ComplianceStatus } from '@coldpbc/enums';

const meta: Meta<typeof ComplianceStatusChip> = {
	title: 'Molecules/ComplianceStatusChip',
	component: ComplianceStatusChip,
	tags: ['autodocs'],
	decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const NotActive: Story = {
	args: {
		status: ComplianceStatus.inActive,
	},
};

export const InProgress0Answered: Story = {
	args: {
		status: ComplianceStatus.inProgress,
		percentage: 0,
	},
};

export const InProgress50Answered: Story = {
	args: {
		status: ComplianceStatus.inProgress,
		percentage: 50,
	},
};

export const InProgress100Answered: Story = {
	args: {
		status: ComplianceStatus.inProgress,
		percentage: 100,
	},
};

export const SubmissionInProgress: Story = {
	args: {
		status: ComplianceStatus.submissionInProgress,
	},
};

export const SubmittedByCold: Story = {
	args: {
		status: ComplianceStatus.submittedByCold,
	},
};
