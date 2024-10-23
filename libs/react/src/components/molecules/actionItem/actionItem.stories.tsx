import { ActionItem, ActionItemProps } from './actionItem';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { StoryMockProvider } from '@coldpbc/mocks';
import { ActionItemVariants } from '@coldpbc/enums';
import { getActionMock } from '@coldpbc/mocks';

const meta: Meta<typeof ActionItem> = {
	title: 'Molecules/ActionItem',
	component: ActionItem,
	tags: ['autodocs'],
	decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

const ActionItemTemplate = (args: ActionItemProps) => {
	return (
		<StoryMockProvider handlers={[]}>
			<ActionItem {...args} />;
		</StoryMockProvider>
	);
};

export const WideVariant: Story = {
	render: args => {
		return <ActionItemTemplate {...args} />;
	},
	args: {
		actionPayload: getActionMock(),
		variant: ActionItemVariants.wide,
	},
};

export const NarrowVariant: Story = {
	render: args => {
		return <ActionItemTemplate {...args} />;
	},
	args: {
		actionPayload: getActionMock(),
		variant: ActionItemVariants.narrow,
	},
};
