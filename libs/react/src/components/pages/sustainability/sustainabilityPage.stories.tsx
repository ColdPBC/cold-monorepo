import { Meta, StoryObj } from '@storybook/react';
import { SustainabilityPage } from '@coldpbc/components';
import { withKnobs } from '@storybook/addon-knobs';
import { StoryMockProvider, sustainabilityAttributesMocks } from '@coldpbc/mocks';
import { fireEvent, within } from '@storybook/testing-library';
import { GET_ALL_SUSTAINABILITY_ATTRIBUTES_FOR_ORG } from '@coldpbc/lib';

const meta: Meta<typeof SustainabilityPage> = {
	title: 'Pages/SustainabilityPage',
	component: SustainabilityPage,
	tags: ['autodocs'],
	decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => {
		return (
			<StoryMockProvider>
				<SustainabilityPage />
			</StoryMockProvider>
		);
	},
};

export const OtherAttributesTab: Story = {
	render: () => {
		return (
			<StoryMockProvider>
				<SustainabilityPage />
			</StoryMockProvider>
		);
	},
	play: async ({ canvasElement }) => {
		const otherAttributesTabLabel = await within(canvasElement).findByText('Other Attributes (0)');
		fireEvent.click(otherAttributesTabLabel);
	},
};

export const MyAttributesWithMockData: Story = {
	render: () => {
		return (
			<StoryMockProvider graphqlMocks={sustainabilityAttributesMocks}>
				<SustainabilityPage />
			</StoryMockProvider>
		);
	},
};

export const OtherAttributesWithMockData: Story = {
	render: () => {
		return (
			<StoryMockProvider graphqlMocks={sustainabilityAttributesMocks}>
				<SustainabilityPage />
			</StoryMockProvider>
		);
	},
	play: async ({ canvasElement }) => {
		const otherAttributesTabLabel = await within(canvasElement).findByText('Other Attributes (1)');
		fireEvent.click(otherAttributesTabLabel);
	},
};
