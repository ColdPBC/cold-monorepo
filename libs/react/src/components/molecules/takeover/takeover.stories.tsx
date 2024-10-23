import React, { PropsWithChildren, useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { BaseButton, TakeoverProps } from '@coldpbc/components';
import { ButtonTypes, GlobalSizes } from '@coldpbc/enums';
import { Takeover } from './takeover';
import { withKnobs } from '@storybook/addon-knobs';

const TakeoverComponent = (args: TakeoverProps) => {
	const [isShow, setIsShow] = useState(args.show);
	const content = () => {
		return <div className={'text-tc-primary'}>Hello</div>;
	};

	return (
		<div>
			<BaseButton
				size={GlobalSizes.medium}
				onClick={() => {
					setIsShow(true);
				}}
				label="Open Take Over"
				rounded={true}
				variant={ButtonTypes.primary}
			/>
			{isShow && (
				<Takeover {...args} show={isShow} setShow={setIsShow}>
					{content()}
				</Takeover>
			)}
		</div>
	);
};

const meta: Meta<typeof TakeoverComponent> = {
	title: 'Molecules/Takeover',
	component: TakeoverComponent,
	tags: ['autodocs'],
	decorators: [withKnobs],
	argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const NoHeader: Story = {
	render: args => <TakeoverComponent {...args} />,
	args: {
		show: true,
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		setShow: (show: boolean) => {},
	},
};
export const HeaderWithButtonOnly: Story = {
	render: args => <TakeoverComponent {...args} />,
	args: {
		show: true,
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		setShow: (show: boolean) => {},
		header: {
			dismiss: {
				label: 'close',
				dismissible: true,
			},
		},
	},
};

export const HeaderWithButtonOnlyNoText: Story = {
	render: args => <TakeoverComponent {...args} />,
	args: {
		show: true,
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		setShow: (show: boolean) => {},
		header: {
			dismiss: {
				label: 'close',
				dismissible: true,
			},
		},
	},
};

export const HeaderWithButtonAndTitle: Story = {
	render: args => <TakeoverComponent {...args} />,
	args: {
		show: true,
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		setShow: (show: boolean) => {},
		header: {
			title: {
				text: 'Takeover Title',
			},
			dismiss: {
				label: 'close',
				dismissible: true,
			},
		},
	},
};

export const HeaderWithButtonAndLogo: Story = {
	render: args => <TakeoverComponent {...args} />,
	args: {
		show: true,
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		setShow: (show: boolean) => {},
		header: {
			title: {},
			dismiss: {
				label: 'close',
				dismissible: true,
			},
		},
	},
};

export const Loading: Story = {
	render: args => <TakeoverComponent {...args} />,
	args: {
		isLoading: true,
		show: true,
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		setShow: (show: boolean) => {},
		header: {
			dismiss: {
				label: 'close',
				dismissible: true,
			},
		},
	},
};
