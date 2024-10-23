import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { FootprintDetailCard } from './footprintDetailCard';
import { BrowserRouter } from 'react-router-dom';
import { getSchemeForColor, HexColors } from '@coldpbc/themes';
import { render } from 'react-dom';
import { getFootprintHandler, StoryMockProvider } from '@coldpbc/mocks';
import { InputTypes } from '@coldpbc/enums';

const meta: Meta<typeof FootprintDetailCard> = {
	title: 'Molecules/FootprintDetailCard',
	component: FootprintDetailCard,
	tags: ['autodocs'],
	decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = () => {
	return (
		<BrowserRouter>
			<div className="w-[668px]">
				<FootprintDetailCard colors={getSchemeForColor(HexColors.lightblue)} period={2022} subcategory_key="facilities" />
			</div>
		</BrowserRouter>
	);
};
export const NoActionButton: Story = {
	render: args => {
		return (
			<BrowserRouter>
				<div className="w-[668px]">
					<FootprintDetailCard colors={getSchemeForColor(HexColors.lightblue)} period={2022} subcategory_key="facilities" />
				</div>
			</BrowserRouter>
		);
	},
	parameters: {
		launchdarkly: {
			flags: {
				showActions261: false,
			},
		},
	},
	args: {
		colors: getSchemeForColor(HexColors.lightblue),
		period: 2022,
		subcategory_key: 'facilities',
	},
};

export const GreenProduct = () => {
	return (
		<BrowserRouter>
			<div className="w-[668px]">
				<FootprintDetailCard colors={getSchemeForColor(HexColors.green)} period={2022} subcategory_key="product" />
			</div>
		</BrowserRouter>
	);
};

export const EmptySubcategory = () => {
	return (
		<BrowserRouter>
			<div className="w-[668px]">
				<FootprintDetailCard colors={getSchemeForColor(HexColors.green)} period={2022} subcategory_key="no_data_for_this_key" />
			</div>
		</BrowserRouter>
	);
};

export const GetFootprintDataFacilitiesAllFootprintsNull = () => {
	return (
		<StoryMockProvider handlers={[getFootprintHandler.getFootprintDataFacilitiesAllFootprintsNull]}>
			<FootprintDetailCard colors={getSchemeForColor(HexColors.lightblue)} period={2022} subcategory_key="facilities" />
		</StoryMockProvider>
	);
};
