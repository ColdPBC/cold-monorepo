import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { ComplianceManagerOverview } from '@coldpbc/components';
import { getComplianceManagerOverviewAIProgressPercentageMock, StoryMockProvider } from '@coldpbc/mocks';
import { ComplianceManagerStatus } from '@coldpbc/enums';

const meta: Meta<typeof ComplianceManagerOverview> = {
	title: 'Organisms/ComplianceManagerOverview',
	component: ComplianceManagerOverview,
	tags: ['autodocs'],
	decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const NotActivated: Story = {
	render: args => (
		<StoryMockProvider>
			<ComplianceManagerOverview />
		</StoryMockProvider>
	),
};

export const Activated: Story = {
	render: args => (
		<StoryMockProvider
			complianceManagerContext={{
				status: ComplianceManagerStatus.activated,
			}}>
			<ComplianceManagerOverview />
		</StoryMockProvider>
	),
};

export const UploadedDocuments: Story = {
	render: args => (
		<StoryMockProvider
			complianceManagerContext={{
				status: ComplianceManagerStatus.uploadedDocuments,
			}}>
			<ComplianceManagerOverview />
		</StoryMockProvider>
	),
};

export const AIRunning: Story = {
	render: args => (
		<StoryMockProvider
			complianceManagerContext={{
				status: ComplianceManagerStatus.startedAi,
				data: {
					currentAIStatus: getComplianceManagerOverviewAIProgressPercentageMock(),
				},
			}}>
			<ComplianceManagerOverview />
		</StoryMockProvider>
	),
};

export const CompletedAI: Story = {
	render: args => (
		<StoryMockProvider
			complianceManagerContext={{
				status: ComplianceManagerStatus.completedAi,
			}}>
			<ComplianceManagerOverview />
		</StoryMockProvider>
	),
};

export const StartedQuestions: Story = {
	render: args => (
		<StoryMockProvider
			complianceManagerContext={{
				status: ComplianceManagerStatus.startedQuestions,
			}}>
			<ComplianceManagerOverview />
		</StoryMockProvider>
	),
};

export const CompletedQuestions: Story = {
	render: args => (
		<StoryMockProvider
			complianceManagerContext={{
				status: ComplianceManagerStatus.completedQuestions,
			}}>
			<ComplianceManagerOverview />
		</StoryMockProvider>
	),
};

export const Submitted: Story = {
	render: args => (
		<StoryMockProvider
			complianceManagerContext={{
				status: ComplianceManagerStatus.submitted,
			}}>
			<ComplianceManagerOverview />
		</StoryMockProvider>
	),
};
