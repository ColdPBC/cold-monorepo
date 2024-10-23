import React, { useState } from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { SurveyIntro } from './surveyIntro';
import { getSurveyFormDataPayload } from '@coldpbc/mocks';

const meta: Meta<typeof SurveyIntro> = {
	title: 'Molecules/SurveyIntro',
	component: SurveyIntro,
	tags: ['autodocs'],
	decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: args => {
		return <SurveyIntro {...args} />;
	},
	args: {
		surveyFormData: getSurveyFormDataPayload().definition,
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		startSurvey: () => {},
		submitted: false,
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		closeSurvey: () => {},
	},
};

export const LastPage: Story = {
	render: args => {
		return <SurveyIntro {...args} />;
	},
	args: {
		surveyFormData: getSurveyFormDataPayload().definition,
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		startSurvey: () => {},
		submitted: true,
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		closeSurvey: () => {},
	},
};
