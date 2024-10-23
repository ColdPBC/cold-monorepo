import { Meta, StoryObj } from '@storybook/react';

import { SustainabilityAttributeTab } from '@coldpbc/components';
import { AttributeAssuranceMock } from '@coldpbc/mocks';
import { EntityLevel } from '@coldpbc/enums';

const meta: Meta<typeof SustainabilityAttributeTab> = {
	title: 'Molecules/SustainabilityAttributeTab',
	component: SustainabilityAttributeTab,
	tags: ['autodocs'],
	decorators: [],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		tab: 'My Attributes',
		sustainabilityAttributes: [
			{
				id: 'a',
				name: 'Default Product Attribute',
				attributeAssurances: [AttributeAssuranceMock({ entity: EntityLevel.PRODUCT, status: 'ACTIVE', index: 1 })],
				level: EntityLevel.PRODUCT,
			},
			{
				id: 'a',
				name: 'Global Recycled Standard',
				logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/Global+Recycled+Standard.png',
				attributeAssurances: [AttributeAssuranceMock({ entity: EntityLevel.MATERIAL, status: 'EXPIRED', index: 1 })],
				level: EntityLevel.MATERIAL,
			},
			{
				id: 'a',
				name: 'Fair Wear',
				logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/Fair+Wear.png',
				attributeAssurances: [
					AttributeAssuranceMock({ entity: EntityLevel.SUPPLIER, status: 'ACTIVE', index: 1 }),
					AttributeAssuranceMock({ entity: EntityLevel.SUPPLIER, status: 'EXPIRED', index: 2 }),
					AttributeAssuranceMock({ entity: EntityLevel.SUPPLIER, status: 'NOT DOCUMENTED', index: 3 }),
				],
				level: EntityLevel.SUPPLIER,
			},
		],
	},
};

export const MyAttributesEmpty: Story = {
	args: {
		tab: 'My Attributes',
		sustainabilityAttributes: [],
	},
};

export const OtherAttributes: Story = {
	args: {
		tab: 'Other Attributes',
		sustainabilityAttributes: [
			{
				id: 'a',
				name: 'Default Product Attribute',
				attributeAssurances: [],
				level: EntityLevel.PRODUCT,
			},
			{
				id: 'a',
				name: 'Global Recycled Standard',
				logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/Global+Recycled+Standard.png',
				attributeAssurances: [],
				level: EntityLevel.MATERIAL,
			},
			{
				id: 'a',
				name: 'Fair Wear',
				logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/Fair+Wear.png',
				attributeAssurances: [],
				level: EntityLevel.SUPPLIER,
			},
		],
	},
};

export const OtherAttributesEmpty: Story = {
	args: {
		tab: 'Other Attributes',
		sustainabilityAttributes: [],
	},
};
