import { Meta, StoryObj } from '@storybook/react';
import { CreateMaterialPage } from '@coldpbc/components';
import { withKnobs } from '@storybook/addon-knobs';
import { StoryMockProvider } from '@coldpbc/mocks';

const meta: Meta<typeof CreateMaterialPage> = {
	title: 'Pages/CreateMaterialPage',
	component: CreateMaterialPage,
	tags: ['autodocs'],
	decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => {
		return (
			<StoryMockProvider>
				<CreateMaterialPage />
			</StoryMockProvider>
		);
	},
};
