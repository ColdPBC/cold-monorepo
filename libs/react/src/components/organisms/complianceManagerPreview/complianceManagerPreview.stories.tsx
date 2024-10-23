import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { ComplianceManagerPreview } from '@coldpbc/components';
import { getComplianceCountsMockWithOrgScore, getComplianceMock, StoryMockProvider } from '@coldpbc/mocks';
import { SWRResponse } from 'swr';
import { ComplianceManagerCountsPayload } from '@coldpbc/interfaces';

const meta: Meta<typeof ComplianceManagerPreview> = {
	title: 'Organisms/ComplianceManagerPreview',
	component: ComplianceManagerPreview,
	tags: ['autodocs'],
	decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const NonTargetScoreCompliance: Story = {
	render: args => (
		<StoryMockProvider>
			<ComplianceManagerPreview />
		</StoryMockProvider>
	),
};

export const TargetScoreCompliance: Story = {
	render: args => (
		<StoryMockProvider
			complianceManagerContext={{
				data: {
					complianceCounts: {
						data: getComplianceCountsMockWithOrgScore(),
						error: undefined,
						revalidate: () => {},
						isValidating: false,
						isLoading: false,
						mutate: () => Promise.resolve(),
					} as SWRResponse<ComplianceManagerCountsPayload, any, any>,
					compliance: getComplianceMock().find(c => c.metadata.target_score !== undefined),
				},
			}}>
			<ComplianceManagerPreview />
		</StoryMockProvider>
	),
};
