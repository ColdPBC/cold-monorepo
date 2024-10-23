import { ButtonTypes } from '@coldpbc/enums';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { BaseButton } from '../../atoms';
import { UserSelectDropdown } from './userSelectDropdown';

const meta: Meta<typeof UserSelectDropdown> = {
	title: 'Molecules/UserSelectDropdown',
	component: UserSelectDropdown,
	tags: ['autodocs'],
	decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => {
		return (
			<div className="max-w-[200px]">
				<UserSelectDropdown
					onSelect={() => {}}
					label={
						<BaseButton variant={ButtonTypes.secondary} onClick={() => {}}>
							<span className="flex items-center">
								Select a user <ChevronDownIcon className="w-[18px] ml-2" />
							</span>
						</BaseButton>
					}
				/>
			</div>
		);
	},
};
