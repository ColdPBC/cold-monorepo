import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { MaterialClassificationIcon } from '@coldpbc/components';
import { MaterialClassificationCategory } from '@coldpbc/enums';

const meta: Meta<typeof MaterialClassificationIcon> = {
	title: 'Atoms/Icons/MaterialClassificationIcon',
	component: MaterialClassificationIcon,
	tags: ['autodocs'],
	decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

const iconWithLabel = (materialClassificationCategory: MaterialClassificationCategory) => (
	<div className={'flex items-center justify-start gap-2'}>
		<MaterialClassificationIcon materialClassificationCategory={materialClassificationCategory} />
		<span className={'text-body text-tc-primary'}>{materialClassificationCategory}</span>
	</div>
);

export const Default: Story = {
	render: () => {
		return (
			<div className={'flex flex-col justify-start items-start gap-2'}>
				{Object.values(MaterialClassificationCategory).map(materialClassificationCategory => iconWithLabel(materialClassificationCategory))}
			</div>
		);
	},
};
