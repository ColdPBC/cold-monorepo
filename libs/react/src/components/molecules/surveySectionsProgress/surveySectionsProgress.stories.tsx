import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { SurveySectionsProgress, SurveySectionsProgressProps } from '@coldpbc/components';
import { getSurveySectionMock, getSurveySectionScrollableMock } from '@coldpbc/mocks';

const meta: Meta<typeof SurveySectionsProgress> = {
	title: 'Molecules/SurveySectionsProgress',
	component: SurveySectionsProgress,
	tags: ['autodocs'],
	decorators: [withKnobs],
	argTypes: {},
	parameters: {
		chromatic: { disableSnapshot: true },
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

const SurveySectionsStory = (args: SurveySectionsProgressProps) => {
	return <SurveySectionsProgress {...args} />;
};

export const Default: Story = {
	render: args => <SurveySectionsStory {...args} />,
	args: {
		sections: getSurveySectionMock(),
		activeKey: {
			value: 'product',
			previousValue: '',
			isFollowUp: false,
		},
	},
	parameters: {
		chromatic: { disableSnapshot: true },
	},
};

export const SectionCompleted: Story = {
	render: args => <SurveySectionsStory {...args} />,
	args: {
		...Default.args,
		activeKey: {
			value: 'facilities',
			previousValue: 'product:3',
			isFollowUp: false,
		},
	},
};

export const SectionWithFollowUp: Story = {
	render: args => <SurveySectionsStory {...args} />,
	args: {
		...Default.args,
		activeKey: {
			value: 'facilities:0',
			previousValue: 'facilities',
			isFollowUp: true,
		},
	},
};

export const SurveyComplete: Story = {
	render: args => <SurveySectionsStory {...args} />,
	args: {
		...Default.args,
		activeKey: {
			value: 'general:3',
			previousValue: 'general:2',
			isFollowUp: true,
		},
	},
};

export const LastSection: Story = {
	render: args => <SurveySectionsStory {...args} />,
	args: {
		...Default.args,
		activeKey: {
			value: 'general',
			previousValue: 'facilities:0',
			isFollowUp: false,
		},
	},
};

export const LargerThanScrollBar: Story = {
	render: args => <SurveySectionsStory {...args} />,
	args: {
		sections: getSurveySectionScrollableMock(),
		activeKey: {
			value: 'product1',
			previousValue: '',
			isFollowUp: false,
		},
	},
};
