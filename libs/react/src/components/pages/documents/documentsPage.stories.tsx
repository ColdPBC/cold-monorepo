import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { DocumentsPage } from '@coldpbc/components';
import {
	filesProcessedWithDatesMocks,
	filesProcessingMocks,
	filesWithAssurancesMocks,
	filesWithOutAssurancesMocks,
	filesWithTooManyRecordsMocks,
	StoryMockProvider,
} from '@coldpbc/mocks';

const meta: Meta<typeof DocumentsPage> = {
	title: 'Pages/DocumentsPage',
	component: DocumentsPage,
	tags: ['autodocs'],
	decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const FilesWithNoAssurancesNoDates: Story = {
	render: () => {
		return (
			<StoryMockProvider graphqlMocks={filesWithOutAssurancesMocks}>
				<DocumentsPage />
			</StoryMockProvider>
		);
	},
};

export const FilesWithAssurances: Story = {
	render: () => {
		return (
			<StoryMockProvider graphqlMocks={filesWithAssurancesMocks}>
				<DocumentsPage />
			</StoryMockProvider>
		);
	},
};

export const FilesProcessing: Story = {
	render: () => {
		return (
			<StoryMockProvider graphqlMocks={filesProcessingMocks}>
				<DocumentsPage />
			</StoryMockProvider>
		);
	},
};

export const FilesProcessedWithDates: Story = {
	render: () => {
		return (
			<StoryMockProvider graphqlMocks={filesProcessedWithDatesMocks}>
				<DocumentsPage />
			</StoryMockProvider>
		);
	},
};

export const FilesWithTooManyRecords: Story = {
	render: () => {
		return (
			<StoryMockProvider graphqlMocks={filesWithTooManyRecordsMocks}>
				<DocumentsPage />
			</StoryMockProvider>
		);
	},
};
