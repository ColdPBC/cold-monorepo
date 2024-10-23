import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { QuestionnaireContainer } from '@coldpbc/components';
import { StoryMockProvider } from '@coldpbc/mocks';
import { useState } from 'react';

const meta: Meta<typeof QuestionnaireContainer> = {
	title: 'Organisms/QuestionnaireContainer',
	component: QuestionnaireContainer,
	tags: ['autodocs'],
	decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: args => {
		return <QuestionnaireContainerStory {...args} />;
	},
};

const QuestionnaireContainerStory = (args: any) => {
	return (
		<StoryMockProvider>
			<div className={'w-[982px] h-screen'}>
				<QuestionnaireContainer />
			</div>
		</StoryMockProvider>
	);
};
