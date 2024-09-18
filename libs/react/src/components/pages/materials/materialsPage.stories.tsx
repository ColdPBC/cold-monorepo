import { Meta, StoryObj } from '@storybook/react';
import { MaterialsPage } from '@coldpbc/components';
import { withKnobs } from '@storybook/addon-knobs';
import { materialsGraphqlMock, StoryMockProvider } from '@coldpbc/mocks';

const meta: Meta<typeof MaterialsPage> = {
	title: 'Pages/MaterialsPage',
	component: MaterialsPage,
	tags: ['autodocs'],
	decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => {
		return (
			<StoryMockProvider graphqlMocks={materialsGraphqlMock}>
				<MaterialsPage />
			</StoryMockProvider>
		);
	},
};
