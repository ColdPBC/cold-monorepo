import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { SurveyLeftNav, SurveyLeftNavProps } from './surveyLeftNav';
import { getSurveyFormDataPayload, getTestingSurveyFormDefinitionData } from '@coldpbc/mocks';

const meta: Meta<typeof SurveyLeftNav> = {
	title: 'Organisms/SurveyLeftNav',
	component: SurveyLeftNav,
	tags: ['autodocs'],
	decorators: [withKnobs],
	argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

const SurveyLeftNavStory = (args: SurveyLeftNavProps) => {
	const [activeKey, setActiveKey] = React.useState(args.activeKey);

	return <SurveyLeftNav {...args} activeKey={activeKey} setActiveKey={setActiveKey} />;
};

export const Intro: Story = {
	render: args => <SurveyLeftNavStory {...args} />,
	args: {
		activeKey: {
			value: '',
			previousValue: '',
			isFollowUp: false,
		},
		surveyData: getSurveyFormDataPayload(),
		submitted: false,
	},
};

export const InSurvey: Story = {
	render: args => <SurveyLeftNavStory {...args} />,
	args: {
		activeKey: {
			value: 'product',
			previousValue: '',
			isFollowUp: false,
		},
		surveyData: getSurveyFormDataPayload(),
		submitted: false,
	},
};

export const LastPage: Story = {
	render: args => <SurveyLeftNavStory {...args} />,
	args: {
		activeKey: {
			value: '',
			previousValue: '',
			isFollowUp: false,
		},
		surveyData: getSurveyFormDataPayload(),
		submitted: true,
	},
};
