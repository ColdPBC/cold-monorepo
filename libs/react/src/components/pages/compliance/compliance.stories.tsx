import { StoryMockProvider } from '@coldpbc/mocks';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { CompliancePage } from '@coldpbc/components';

const meta: Meta<typeof CompliancePage> = {
	title: 'Pages/Compliance',
	component: CompliancePage,
	tags: ['autodocs'],
	decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: args => (
		<StoryMockProvider>
			<CompliancePage />
		</StoryMockProvider>
	),
	parameters: {
		launchdarkly: {
			flags: {
				showNewCompliancePageHomeCold671: true,
			},
		},
	},
};
