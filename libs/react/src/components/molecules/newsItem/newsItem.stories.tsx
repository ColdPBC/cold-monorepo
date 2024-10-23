import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { NewsItem } from './newsItem';
import { StoryMockProvider, CenterColumnContent, getNewsDefault } from '../../../';

const meta: Meta<typeof NewsItem> = {
	title: 'Molecules/NewsItem',
	component: NewsItem,
	tags: ['autodocs'],
	decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => {
		return (
			<StoryMockProvider handlers={[]}>
				<CenterColumnContent>
					<NewsItem item={getNewsDefault()[0]} />
				</CenterColumnContent>
			</StoryMockProvider>
		);
	},
};

export const NoSourceName: Story = {
	render: () => {
		return (
			<StoryMockProvider handlers={[]}>
				<CenterColumnContent>
					<NewsItem item={{ ...getNewsDefault()[0], source_name: '' }} />
				</CenterColumnContent>
			</StoryMockProvider>
		);
	},
};

export const NoPublishDate: Story = {
	render: () => {
		return (
			<StoryMockProvider handlers={[]}>
				<CenterColumnContent>
					<NewsItem item={{ ...getNewsDefault()[0], published_at: '' }} />
				</CenterColumnContent>
			</StoryMockProvider>
		);
	},
};
