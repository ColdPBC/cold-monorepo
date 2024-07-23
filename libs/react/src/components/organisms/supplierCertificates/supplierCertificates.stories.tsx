import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { SupplierCertificates } from '@coldpbc/components';

const meta: Meta<typeof SupplierCertificates> = {
  title: 'Organisms/SupplierCertificates',
  component: SupplierCertificates,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: '1',
    showSupplierCertificateDetails: (id: string) => console.log(id),
  },
};
