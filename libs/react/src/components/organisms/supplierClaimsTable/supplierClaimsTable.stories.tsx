import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { SupplierClaimsTable } from '@coldpbc/components';
import { getSupplierMockByName } from '@coldpbc/mocks';

const meta: Meta<typeof SupplierClaimsTable> = {
  title: 'Organisms/SupplierCertificates',
  component: SupplierClaimsTable,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => {
    return <SupplierClaimsTable {...args} />;
  },
  args: {
    supplier: getSupplierMockByName('VietWear Garments Co., Ltd.'),
    showSupplierCertificateDetails: (id: string) => console.log(id),
  },
};
