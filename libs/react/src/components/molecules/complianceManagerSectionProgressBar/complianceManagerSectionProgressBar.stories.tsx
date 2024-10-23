import { Meta, StoryObj } from '@storybook/react';
import { ComplianceManagerSectionProgressBar } from '@coldpbc/components';
import { withKnobs } from '@storybook/addon-knobs';
import { getComplianceSectionProgressBarQuestionsMock, StoryMockProvider } from '@coldpbc/mocks';

const meta: Meta<typeof ComplianceManagerSectionProgressBar> = {
	title: 'Molecules/ComplianceManagerSectionProgressBar',
	component: ComplianceManagerSectionProgressBar,
	tags: ['autodocs'],
	decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: args => {
		return (
			<StoryMockProvider>
				<div className="w-[620px]">
					<ComplianceManagerSectionProgressBar {...args} />
				</div>
			</StoryMockProvider>
		);
	},
	args: {
		questions: getComplianceSectionProgressBarQuestionsMock(),
	},
};

export const QuestionsProcessing: Story = {
	render: args => {
		return (
			<StoryMockProvider>
				<div className="w-[620px]">
					<ComplianceManagerSectionProgressBar {...args} />
				</div>
			</StoryMockProvider>
		);
	},
	args: {
		questions: getComplianceSectionProgressBarQuestionsMock(),
		sectionAIStatus: {
			questions: ['APK-1', 'APK-2'],
			section: 'APK',
		},
	},
};
