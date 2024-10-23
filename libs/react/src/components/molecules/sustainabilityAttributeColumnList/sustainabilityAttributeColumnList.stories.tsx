import { Meta, StoryObj } from '@storybook/react';

import { SustainabilityAttributeColumnList } from '@coldpbc/components';
import { AttributeAssuranceMock, StoryMockProvider } from '@coldpbc/mocks';
import React from 'react';
import { EntityLevel } from '@coldpbc/enums';

const meta: Meta<typeof SustainabilityAttributeColumnList> = {
	title: 'Molecules/SustainabilityAttributeListColumn',
	component: SustainabilityAttributeColumnList,
	tags: ['autodocs'],
	decorators: [],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		sustainabilityAttributes: [
			// Active Assurance
			{
				id: 'a',
				name: 'Default Product Attribute',
				attributeAssurances: [
					AttributeAssuranceMock({ entity: EntityLevel.PRODUCT, status: 'ACTIVE', index: 1 }),
					AttributeAssuranceMock({ entity: EntityLevel.MATERIAL, status: 'EXPIRING', index: 2 }),
					AttributeAssuranceMock({ entity: EntityLevel.SUPPLIER, status: 'EXPIRED', index: 3 }),
					AttributeAssuranceMock({ entity: EntityLevel.SUPPLIER, status: 'NOT DOCUMENTED', index: 4 }),
				],
				level: EntityLevel.PRODUCT,
			},
			// Expiring Assurance
			{
				id: 'a',
				name: 'Global Recycled Standard',
				logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/Global+Recycled+Standard.png',
				attributeAssurances: [AttributeAssuranceMock({ entity: EntityLevel.MATERIAL, status: 'EXPIRING', index: 1 })],
				level: EntityLevel.MATERIAL,
			},
			// Expired Assurance
			{
				id: 'a',
				name: 'Fair Wear',
				logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/Fair+Wear.png',
				attributeAssurances: [
					AttributeAssuranceMock({ entity: EntityLevel.SUPPLIER, status: 'EXPIRED', index: 1 }),
					AttributeAssuranceMock({ entity: EntityLevel.SUPPLIER, status: 'EXPIRED', index: 2 }),
					AttributeAssuranceMock({ entity: EntityLevel.SUPPLIER, status: 'NOT DOCUMENTED', index: 3 }),
				],
				level: EntityLevel.SUPPLIER,
			},
			// Not documented
			{
				id: 'a',
				name: 'Another Default Product Attribute',
				attributeAssurances: [],
				level: EntityLevel.SUPPLIER,
			},
		],
	},
};

export const FixedWidthToFit2ItemsPlusOverflow: Story = {
	args: {
		sustainabilityAttributes: [
			// Not documented
			{
				id: 'a',
				name: 'Another Default Product Attribute',
				attributeAssurances: [],
				level: EntityLevel.SUPPLIER,
			},
			// Expiring Assurance
			{
				id: 'a',
				name: 'Global Recycled Standard',
				logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/Global+Recycled+Standard.png',
				attributeAssurances: [AttributeAssuranceMock({ entity: EntityLevel.MATERIAL, status: 'EXPIRING', index: 1 })],
				level: EntityLevel.MATERIAL,
			},
			// Expired Assurance
			{
				id: 'a',
				name: 'Fair Wear',
				logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/Fair+Wear.png',
				attributeAssurances: [
					AttributeAssuranceMock({ entity: EntityLevel.SUPPLIER, status: 'EXPIRED', index: 1 }),
					AttributeAssuranceMock({ entity: EntityLevel.SUPPLIER, status: 'EXPIRED', index: 2 }),
					AttributeAssuranceMock({ entity: EntityLevel.SUPPLIER, status: 'NOT DOCUMENTED', index: 3 }),
				],
				level: EntityLevel.SUPPLIER,
			},
			// Active Assurance
			{
				id: 'a',
				name: 'Default Product Attribute',
				attributeAssurances: [
					AttributeAssuranceMock({ entity: EntityLevel.PRODUCT, status: 'ACTIVE', index: 1 }),
					AttributeAssuranceMock({ entity: EntityLevel.MATERIAL, status: 'EXPIRING', index: 2 }),
					AttributeAssuranceMock({ entity: EntityLevel.SUPPLIER, status: 'EXPIRED', index: 3 }),
					AttributeAssuranceMock({ entity: EntityLevel.SUPPLIER, status: 'NOT DOCUMENTED', index: 4 }),
				],
				level: EntityLevel.PRODUCT,
			},
		],
	},
	render: args => {
		return (
			<StoryMockProvider>
				<div className="max-w-[300px]">
					<SustainabilityAttributeColumnList {...args} />
				</div>
			</StoryMockProvider>
		);
	},
};

export const Empty: Story = {
	args: {
		sustainabilityAttributes: [],
	},
};
