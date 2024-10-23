import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { ComplianceManagerOverviewStatusCard } from '@coldpbc/components';
import { getComplianceManagerOverviewAIProgressPercentageMock, StoryMockProvider } from '@coldpbc/mocks';
import { ComplianceManagerStatus } from '@coldpbc/enums';

const meta: Meta<typeof ComplianceManagerOverviewStatusCard> = {
	title: 'Organisms/ComplianceManagerOverviewStatusCard',
	component: ComplianceManagerOverviewStatusCard,
	tags: ['autodocs'],
	decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const NotActivated: Story = {
	render: args => (
		<StoryMockProvider
			complianceManagerContext={{
				status: ComplianceManagerStatus.notActivated,
			}}>
			<ComplianceManagerOverviewStatusCard />
		</StoryMockProvider>
	),
};

export const Activated: Story = {
	render: args => (
		<StoryMockProvider
			complianceManagerContext={{
				status: ComplianceManagerStatus.activated,
			}}>
			<ComplianceManagerOverviewStatusCard />
		</StoryMockProvider>
	),
};

export const Uploaded: Story = {
	render: args => (
		<StoryMockProvider
			complianceManagerContext={{
				status: ComplianceManagerStatus.uploadedDocuments,
			}}>
			<ComplianceManagerOverviewStatusCard />
		</StoryMockProvider>
	),
};

export const StartedAI: Story = {
	render: args => (
		<StoryMockProvider
			complianceManagerContext={{
				status: ComplianceManagerStatus.startedAi,
				data: {
					currentAIStatus: getComplianceManagerOverviewAIProgressPercentageMock(),
				},
			}}>
			<ComplianceManagerOverviewStatusCard />
		</StoryMockProvider>
	),
};

export const CompletedAI: Story = {
	render: args => (
		<StoryMockProvider
			complianceManagerContext={{
				status: ComplianceManagerStatus.completedAi,
			}}>
			<ComplianceManagerOverviewStatusCard />
		</StoryMockProvider>
	),
};

export const StartedQuestions: Story = {
	render: args => (
		<StoryMockProvider
			complianceManagerContext={{
				status: ComplianceManagerStatus.startedQuestions,
			}}>
			<ComplianceManagerOverviewStatusCard />
		</StoryMockProvider>
	),
};

export const CompletedQuestions: Story = {
	render: args => (
		<StoryMockProvider
			complianceManagerContext={{
				status: ComplianceManagerStatus.completedQuestions,
			}}>
			<ComplianceManagerOverviewStatusCard />
		</StoryMockProvider>
	),
};

export const Submitted: Story = {
	render: args => (
		<StoryMockProvider
			complianceManagerContext={{
				status: ComplianceManagerStatus.submitted,
			}}>
			<ComplianceManagerOverviewStatusCard />
		</StoryMockProvider>
	),
};
