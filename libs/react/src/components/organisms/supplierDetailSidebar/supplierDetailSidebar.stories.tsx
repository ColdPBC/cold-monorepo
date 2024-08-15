import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { SupplierDetailSidebar } from '@coldpbc/components';
import React from 'react';
import { addDays } from 'date-fns';

const meta: Meta<typeof SupplierDetailSidebar> = {
  title: 'Organisms/SupplierDetailSidebar',
  component: SupplierDetailSidebar,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => {
    return <SidebarStory />;
  },
};

const SidebarStory = () => {
  const [selectedClaim, setSelectedClaim] = React.useState<{
    name: string;
    label: string;
    activeDocuments: {
      name: string;
      expirationDate: string | null;
      status: string;
      type: string;
    }[];
    expiredDocuments: {
      name: string;
      expirationDate: string | null;
      status: string;
      type: string;
    }[];
  } | null>({
    name: 'bluesign',
    label: 'bluesign',
    activeDocuments: [
      {
        name: 'bluesign Certificate active',
        expirationDate: addDays(new Date(), 70).toISOString(),
        status: 'Active',
        type: 'Certificate',
      },
      {
        name: 'bluesign Certificate expiring soon',
        expirationDate: '2024-07-30T22:13:29.457Z',
        status: 'Expiring Soon',
        type: 'Certificate',
      },
    ],
    expiredDocuments: [
      {
        name: 'bluesign Certificate expired 1',
        expirationDate: '2024-07-20T22:13:29.457Z',
        status: 'Expired',
        type: 'Certificate',
      },
      {
        name: 'bluesign Certificate expired 2',
        expirationDate: '2024-07-17T22:13:29.457Z',
        status: 'Expired',
        type: 'Certificate',
      },
      {
        name: 'bluesign Certificate without date',
        expirationDate: null,
        status: 'InActive',
        type: 'Certificate',
      },
    ],
  });
  return <SupplierDetailSidebar selectedClaim={selectedClaim} closeSidebar={() => setSelectedClaim(null)} innerRef={React.createRef()} />;
};
