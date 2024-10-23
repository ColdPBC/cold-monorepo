import { Meta, StoryObj } from '@storybook/react';
import { ComplianceManagerPreviewOverallGraphCard } from '@coldpbc/components';
import { withKnobs } from '@storybook/addon-knobs';
import { getComplianceCountsMock, getComplianceCountsMockWithOrgScore, getComplianceMock, StoryMockProvider } from '@coldpbc/mocks';
import { SWRResponse } from 'swr';
import { ComplianceManagerCountsPayload } from '@coldpbc/interfaces';

const meta: Meta<typeof ComplianceManagerPreviewOverallGraphCard> = {
	title: 'Molecules/ComplianceManagerPreviewOverallGraphCard',
	component: ComplianceManagerPreviewOverallGraphCard,
	tags: ['autodocs'],
	decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const NoScore: Story = {
	render: args => {
		return (
			<StoryMockProvider
				complianceManagerContext={{
					data: {
						complianceCounts: {
							data: getComplianceCountsMock(),
							error: undefined,
							revalidate: () => {},
							isValidating: false,
							isLoading: false,
							mutate: () => Promise.resolve(),
						} as SWRResponse<ComplianceManagerCountsPayload, any, any>,
					},
				}}>
				<div className="w-[1285px]">
					<ComplianceManagerPreviewOverallGraphCard />
				</div>
			</StoryMockProvider>
		);
	},
};

export const WithOrgScore: Story = {
	render: args => {
		return (
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
					},
				}}>
				<div className="w-[1285px]">
					<ComplianceManagerPreviewOverallGraphCard />
				</div>
			</StoryMockProvider>
		);
	},
};

export const WithTargetScore: Story = {
	render: args => {
		return (
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
				<div className="w-[1285px]">
					<ComplianceManagerPreviewOverallGraphCard />
				</div>
			</StoryMockProvider>
		);
	},
};
