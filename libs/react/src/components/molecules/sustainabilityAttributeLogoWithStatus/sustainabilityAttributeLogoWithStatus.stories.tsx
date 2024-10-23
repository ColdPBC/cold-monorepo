import { Meta, StoryObj } from '@storybook/react';

import { SustainabilityAttributeLogoWithStatus } from '@coldpbc/components';
import { AttributeAssuranceStatus, EntityLevel } from '@coldpbc/enums';
import { addDays } from 'date-fns';

const meta: Meta<typeof SustainabilityAttributeLogoWithStatus> = {
	title: 'Molecules/SustainabilityAttributeLogoWithStatus',
	component: SustainabilityAttributeLogoWithStatus,
	tags: ['autodocs'],
	decorators: [],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		sustainabilityAttribute: {
			id: '123',
			name: 'Default Product Attribute',
			level: EntityLevel.MATERIAL,
			assuranceStatus: AttributeAssuranceStatus.ACTIVE,
			expirationDate: new Date(2025, 11, 31, 17), // "Active until 12/31/2025"
		},
	},
};

export const Expiring: Story = {
	args: {
		sustainabilityAttribute: {
			id: '123',
			name: 'Global Recycled Standard',
			level: EntityLevel.MATERIAL,
			logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/Global+Recycled+Standard.png',
			assuranceStatus: AttributeAssuranceStatus.EXPIRING,
			expirationDate: addDays(new Date(), 25), // "Expiring in 24 days"
		},
	},
};

export const Expired: Story = {
	args: {
		sustainabilityAttribute: {
			id: '123',
			name: 'Fair Wear',
			level: EntityLevel.MATERIAL,
			logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/Fair+Wear.png',
			assuranceStatus: AttributeAssuranceStatus.EXPIRED,
			expirationDate: new Date(2024, 2, 1, 17), // "Expired on 2/1/2024"
		},
	},
};

export const MissingDocuments: Story = {
	args: {
		sustainabilityAttribute: {
			id: '123',
			name: 'REACH (Registration, Evaluation, Authorisation and Restriction of Chemical)',
			level: EntityLevel.MATERIAL,
			logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/No+Image.png',
			assuranceStatus: AttributeAssuranceStatus.NOT_DOCUMENTED, // "Missing documents"
		},
	},
};
