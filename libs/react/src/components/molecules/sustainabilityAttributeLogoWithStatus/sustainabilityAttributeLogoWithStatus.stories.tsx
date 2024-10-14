import { Meta, StoryObj } from "@storybook/react";

import { SustainabilityAttributeLogoWithStatus } from '@coldpbc/components';
import { AttributeAssuranceStatus } from '@coldpbc/enums';
import { addDays } from 'date-fns';

const meta: Meta<typeof SustainabilityAttributeLogoWithStatus> = {
  title: "Molecules/SustainabilityAttributeLogoWithStatus",
  component: SustainabilityAttributeLogoWithStatus,
  tags: ["autodocs"],
  decorators: [],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'Default Product Attribute',
    assuranceStatus: AttributeAssuranceStatus.ACTIVE,
    assuranceExpiration: new Date(2025, 11, 31, 17), // "Active until 12/31/2025"
  }
};

export const Expiring: Story = {
  args: {
    name: 'Global Recycled Standard',
    logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/Global+Recycled+Standard.png',
    assuranceStatus: AttributeAssuranceStatus.EXPIRING,
    assuranceExpiration: addDays(new Date(), 25), // "Expiring in 24 days"
  }
};

export const Expired: Story = {
  args: {
    name: 'Fair Wear',
    logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/Fair+Wear.png',
    assuranceStatus: AttributeAssuranceStatus.EXPIRED,
    assuranceExpiration: new Date(2024, 2, 1, 17), // "Expired on 2/1/2024"
  }
};

export const MissingDocuments: Story = {
  args: {
    name: 'REACH (Registration, Evaluation, Authorisation and Restriction of Chemical)',
    logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/No+Image.png',
    assuranceStatus: AttributeAssuranceStatus.NOT_DOCUMENTED, // "Missing documents"
  }
};
