import React, { useState } from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { SurveyInput, SurveyInputProps } from './surveyInput';

const meta: Meta<typeof SurveyInput> = {
	title: 'Molecules/SurveyInput',
	component: SurveyInput,
	tags: ['autodocs'],
	decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
	render: args => {
		return <SurveyInputStory {...args} />;
	},
	args: {
		input_key: 'general:1',
		prompt: "What is your company's name?",
		options: [],
		tooltip: 'Enter your company name',
		component: 'text',
		placeholder: 'Yourco',
		value: null,
	},
};

export const MultiSelect: Story = {
	render: args => {
		return <SurveyInputStory {...args} />;
	},
	args: {
		input_key: 'general:0',
		prompt: 'Which regions do you sell your product into?',
		options: ['North America United States', 'South America, Central America, Mexico', 'Europe', 'Asia', 'Australia', 'Africa'],
		tooltip: 'Select correct regions',
		component: 'multi_select',
		placeholder: '',
		value: null,
	},
};

export const Select: Story = {
	render: args => {
		return <SurveyInputStory {...args} />;
	},
	args: {
		input_key: 'general:2',
		prompt: 'What is your favorite color of the primary colors?',
		options: ['Limited (0-5% Year-over-Year)', 'Blue', 'Yellow'],
		tooltip: 'Pick the one you like the most',
		component: 'select',
		placeholder: '',
		value: null,
	},
};

export const Currency: Story = {
	render: args => {
		return <SurveyInputStory {...args} />;
	},
	args: {
		input_key: 'product:1',
		prompt: 'How much does your product cost, in dollars?',
		options: [],
		tooltip: 'Enter the cost to your company to produce',
		component: 'currency',
		placeholder: '45',
		value: null,
	},
};

export const PercentSlider: Story = {
	render: args => {
		return <SurveyInputStory {...args} />;
	},
	args: {
		input_key: 'product:2',
		prompt: 'What percent of your product is leather?',
		options: [],
		tooltip: 'Select the estimated percentage',
		component: 'percent_slider',
		placeholder: '',
		value: null,
	},
};

export const Number: Story = {
	render: args => {
		return <SurveyInputStory {...args} />;
	},
	args: {
		input_key: 'product:3',
		prompt: 'How many factories make your product?',
		options: [],
		tooltip: 'Choose the number across all countries',
		component: 'number',
		placeholder: '2',
		value: null,
	},
};

export const YesNo: Story = {
	render: args => {
		return <SurveyInputStory {...args} />;
	},
	args: {
		input_key: 'product:0',
		prompt: 'Is your product made of metal?',
		options: [],
		tooltip: 'Select yes or no',
		component: 'yes_no',
		placeholder: '',
		value: null,
	},
};

export const TextArea: Story = {
	render: args => {
		return <SurveyInputStory {...args} />;
	},
	args: {
		input_key: 'product:0',
		prompt: 'Tell me about your product',
		options: [],
		tooltip: '',
		component: 'textarea',
		placeholder: 'Write a few sentences about your product',
	},
};

export const AiAnswer: Story = {
	render: args => {
		return <SurveyInputStory {...args} />;
	},
	args: {
		input_key: 'product:0',
		prompt: 'Tell me about your product',
		options: [],
		tooltip: '',
		component: 'yes_no',
		placeholder: 'Write a few sentences about your product',
		ai_attempted: true,
		ai_response: {
			justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
			answer: true,
		},
	},
};

export const UserAnswersAfterAIAnswers: Story = {
	render: args => {
		return <SurveyInputStory {...args} />;
	},
	args: {
		input_key: 'product:0',
		prompt: 'Tell me about your product',
		options: [],
		tooltip: '',
		component: 'yes_no',
		placeholder: 'Write a few sentences about your product',
		ai_attempted: true,
		ai_response: {
			justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
			answer: true,
		},
		value: true,
	},
};

export const AIAttemptedButNoAnswer: Story = {
	render: args => {
		return <SurveyInputStory {...args} />;
	},
	args: {
		input_key: 'product:0',
		prompt: 'Tell me about your product',
		options: [],
		tooltip: '',
		component: 'yes_no',
		placeholder: 'Write a few sentences about your product',
		ai_attempted: true,
		ai_response: {
			justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
		},
	},
};

export const MultiText: Story = {
	render: args => {
		return <SurveyInputStory {...args} />;
	},
	args: {
		input_key: 'facilties:0',
		prompt: 'For which brands are you completing this assessment?',
		options: [],
		tooltip:
			"Note: In the boxes below, enter the name of the brand(s) for which you are completing the assessment. If completing the assessment on behalf of multiple brands, enter each brand's name in its own text box.",
		component: 'multi_text',
		placeholder: 'Write a few sentences about your product',
	},
};

export const AIIncorrectAIAnswer: Story = {
	render: args => {
		return <SurveyInputStory {...args} />;
	},
	args: {
		input_key: 'product:0',
		prompt: 'Tell me about your product',
		options: [],
		tooltip: '',
		component: 'yes_no',
		placeholder: 'Write a few sentences about your product',
		ai_attempted: true,
		ai_response: {
			justification: '*Lorem Ipsum Dolor Et Amo sflksjdflksdjfldsjkfs*',
			answer: 'true',
		},
	},
};

const SurveyInputStory = (props: SurveyInputProps) => {
	const { input_key, prompt, options, tooltip, component, placeholder, value } = props;
	const [stateValue, setStateValue] = useState<any>(value);
	return (
		<SurveyInput
			{...props}
			onFieldUpdated={(name: string, value: any) => {
				setStateValue(value);
			}}
			value={stateValue}
		/>
	);
};
