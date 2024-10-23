import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { getSurveyFormDataPayload } from '@coldpbc/mocks';
import { SurveyRightNav, SurveyRightNavProps } from './surveyRightNav';

const meta: Meta<typeof SurveyRightNav> = {
	title: 'Organisms/SurveyRightNav',
	component: SurveyRightNav,
	tags: ['autodocs'],
	decorators: [withKnobs],
	argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

const SurveyRightNavStory = (args: SurveyRightNavProps) => {
	const [activeKey, setActiveKey] = React.useState(args.activeKey);
	const [surveyData, setSurveyData] = React.useState(args.surveyData);
	const [submitted, setSubmitted] = React.useState(args.submitted);
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	const submitSurvey = () => {
		setSubmitted(true);
	};
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	const startSurvey = () => {
		setActiveKey({
			value: Object.keys(surveyData.definition.sections)[0],
			previousValue: '',
			isFollowUp: false,
		});
	};

	return (
		<SurveyRightNav
			{...args}
			activeKey={activeKey}
			setActiveKey={setActiveKey}
			surveyData={surveyData}
			setSurveyData={setSurveyData}
			submitSurvey={submitSurvey}
			startSurvey={startSurvey}
			submitted={submitted}
		/>
	);
};

export const Default: Story = {
	render: args => <SurveyRightNavStory {...args} />,
	args: {
		activeKey: {
			value: '',
			previousValue: '',
			isFollowUp: false,
		},
		surveyData: getSurveyFormDataPayload(),
		submitted: false,
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		closeSurvey: () => {},
	},
};
