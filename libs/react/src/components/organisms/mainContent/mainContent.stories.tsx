import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import {BaseButton, MainContent} from '@coldpbc/components';
import {StoryMockProvider} from "@coldpbc/mocks";
import {ButtonTypes} from "@coldpbc/enums";
import React from "react";

const meta = {
  title: 'Organisms/MainContent',
  component: MainContent,
  tags: ['autodocs'],
  decorators: [withKnobs],
} satisfies Meta<typeof MainContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithPageButtons: Story = {
	args: {
		title: 'Main Content',
		headerElement: (
			<div className={'flex flex-row gap-[16px] h-full items-center'}>
				<BaseButton
					label={'Cancel'}
					variant={ButtonTypes.warning}
					className={'h-[40px]'}
				/>
				<BaseButton
					label={'Save'}
					variant={ButtonTypes.primary}
					className={'h-[40px]'}
				/>
			</div>
		),
	},
	render: args => {
		return (
			<StoryMockProvider>
				<MainContent {...args} />
			</StoryMockProvider>
		);
	},
};

export const Loading: Story = {
	args: {
		isLoading: true,
		title: 'Main Content',
	},
	render: args => {
		return (
			<StoryMockProvider>
				<MainContent {...args} />
			</StoryMockProvider>
		);
	},
};

export const WithBreadCrumbs: Story = {
	args: {
		title: 'MainContent',
		breadcrumbs: [{ label: 'Home', href: '/home' }, { label: 'Create New' }],
	},
	render: args => {
		return (
			<StoryMockProvider>
				<MainContent {...args} />
			</StoryMockProvider>
		);
	},
};

export const WithSubtitle: Story = {
  args: {
    title: 'MainContent',
    subTitle: 'Subtitle Under Content',
  },
  render: args => {
    return (
      <StoryMockProvider>
        <MainContent {...args} />
      </StoryMockProvider>
    );
  },
};
