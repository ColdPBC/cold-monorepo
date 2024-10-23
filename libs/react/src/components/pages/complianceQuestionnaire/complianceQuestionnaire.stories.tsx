import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { ComplianceQuestionnaire } from '@coldpbc/components';
import { StoryMockProvider } from '@coldpbc/mocks';
import { Route, Routes } from 'react-router-dom';

const meta: Meta<typeof ComplianceQuestionnaire> = {
	title: 'Pages/ComplianceQuestionnaire',
	component: ComplianceQuestionnaire,
	tags: ['autodocs'],
	decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: args => {
		return (
			<div className={'h-screen w-screen'}>
				<StoryMockProvider memoryRouterProps={{ initialEntries: ['/questionnaire/rei_pia_2024'] }}>
					<Routes>
						<Route path={'/questionnaire'}>
							<Route path={':complianceName'} element={<ComplianceQuestionnaire />} />
						</Route>
					</Routes>
				</StoryMockProvider>
			</div>
		);
	},
};
