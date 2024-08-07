import React, { Key, LegacyRef } from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { getFilesWithCertificateClaimsMock } from '@coldpbc/mocks';
import { DocumentDetailsSidebar } from '@coldpbc/components';
import { Files } from '@coldpbc/interfaces';

const meta = {
  title: 'Organisms/DocumentDetailsSidebar',
  component: DocumentDetailsSidebar,
  tags: ['autodocs'],
  decorators: [withKnobs],
} satisfies Meta<typeof DocumentDetailsSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => {
    return <SidebarStory {...args} />;
  },
  args: {
    file: getFilesWithCertificateClaimsMock()[0],
    innerRef: React.createRef(),
    isLoading: false,
    signedUrl: '',
  },
};

export const NoDates: Story = {
  render: args => {
    return <SidebarStory {...args} />;
  },
  args: {
    file: {
      ...getFilesWithCertificateClaimsMock()[0],
      effective_end_date: null,
      effective_start_date: null,
    },
    innerRef: React.createRef(),
    isLoading: false,
    signedUrl: '',
  },
};

export const LongName: Story = {
  render: args => {
    return <SidebarStory {...args} />;
  },
  args: {
    file: {
      ...getFilesWithCertificateClaimsMock()[0],
      original_name: 'long file name without underscores and dashes with longer parts.pdf',
      effective_end_date: null,
      effective_start_date: null,
    },
    innerRef: React.createRef(),
    isLoading: false,
    signedUrl: '',
  },
};

export const LongNameNoSpaces: Story = {
  render: args => {
    return <SidebarStory {...args} />;
  },
  args: {
    file: {
      ...getFilesWithCertificateClaimsMock()[0],
      original_name: 'long_file_name_with_underscores_and_dashes_with_longer_parts.pdf',
      effective_end_date: null,
      effective_start_date: null,
    },
    innerRef: React.createRef(),
    isLoading: false,
    signedUrl: '',
  },
};

export const WithClaims: Story = {
  render: args => {
    return <SidebarStory {...args} />;
  },
  args: {
    file: {
      ...getFilesWithCertificateClaimsMock()[0],
      certification_claim: [
        {
          id: 'claim_cov42be44dd54mb6y90ef5fq',
          certification_id: 'cert_n081cl70wmqsl1uydmkgmxke',
          organization_file_id: 'ofile_cq5j3hvdxdnceh46wyw056qo',
          material: null,
          product: null,
          certification: {
            id: 'cert_n081cl70wmqsl1uydmkgmxke',
            name: 'WRAP Certified',
            level: 'Supplier',
            type: 'TEST',
          },
          facility: {
            id: 'ofac_nhfgwti6s91duov4okyf0b6z',
            name: 'KNK',
          },
        },
        {
          id: 'claim_cov42be44dd54mb6y90ef',
          certification_id: 'cert_n081cl70wmqsl1uydmkgmx',
          organization_file_id: 'ofile_cq5j3hvdxdnceh46wyw056qo',
          material: {
            id: 'mat_n081cl70wmqsl1uydmkgmxke',
            name: 'Spandex 1',
          },
          product: null,
          certification: {
            id: 'cert_n081cl70wmqsl1uydmkgmxke',
            name: 'Pfas Test',
            level: 'Supplier',
            type: 'TEST',
          },
          facility: {
            id: 'ofac_nhfgwti6s91duov4okyf0b6z',
            name: 'KNK',
          },
        },
        {
          id: 'claim_cov42be44dd54mb6y90ef',
          certification_id: 'cert_n081cl70wmqsl1uydmkgmx',
          organization_file_id: 'ofile_cq5j3hvdxdnceh46wyw056qo',
          material: {
            id: 'mat_n081cl70wmqsl1uydmkgmxke',
            name: 'Spandex 2',
          },
          product: null,
          certification: {
            id: 'cert_n081cl70wmqsl1uydmkgmxke',
            name: 'Pfas Test',
            level: 'Supplier',
            type: 'TEST',
          },
          facility: {
            id: 'ofac_nhfgwti6s91duov4okyf0b6z',
            name: 'KNK',
          },
        },
        {
          id: 'claim_cov42be44dd54mb6y90ef',
          certification_id: 'cert_n081cl70wmqsl1uydmkgmx',
          organization_file_id: 'ofile_cq5j3hvdxdnceh46wyw056qo',
          material: {
            id: 'mat_n081cl70wmqsl1uydmkgmxke',
            name: 'Spandex 2',
          },
          product: null,
          certification: {
            id: 'cert_n081cl70wmqsl1uydmkgmxke',
            name: 'bluesign',
            level: 'Supplier',
            type: 'TEST',
          },
          facility: {
            id: 'ofac_nhfgwti6s91duov4okyf0b6z',
            name: 'KNK',
          },
        },
        {
          id: 'claim_cov42be44dd54mb6y90ef',
          certification_id: 'cert_n081cl70wmqsl1uydmkgmx',
          organization_file_id: 'ofile_cq5j3hvdxdnceh46wyw056qo',
          material: {
            id: 'mat_n081cl70wmqsl1uydmkgmxke',
            name: 'Spandex 2',
          },
          product: null,
          certification: {
            id: 'cert_n081cl70wmqsl1uydmkgmxke',
            name: 'rsl',
            level: 'Supplier',
            type: 'TEST',
          },
          facility: {
            id: 'ofac_nhfgwti6s91duov4okyf0b6z',
            name: 'KNK',
          },
        },
        {
          id: 'claim_cov42be44dd54mb6y90ef',
          certification_id: 'cert_n081cl70wmqsl1uydmkgmx',
          organization_file_id: 'ofile_cq5j3hvdxdnceh46wyw056qo',
          material: {
            id: 'mat_n081cl70wmqsl1uydmkgmxke',
            name: 'Spandex 2',
          },
          product: null,
          certification: {
            id: 'cert_n081cl70wmqsl1uydmkgmxke',
            name: 'Supplier COC',
            level: 'Supplier',
            type: 'TEST',
          },
          facility: {
            id: 'ofac_nhfgwti6s91duov4okyf0b6z',
            name: 'KNK',
          },
        },
      ],
    },
    innerRef: React.createRef(),
    isLoading: false,
    signedUrl: '',
  },
};

const SidebarStory = (props: {
  file: Files | undefined;
  innerRef: React.RefObject<HTMLDivElement>;
  ref?: LegacyRef<any> | undefined;
  key?: Key | null | undefined;
  closeSidebar: () => void;
}) => {
  const { file, innerRef } = props;
  const [selectedFile, setSelectedFile] = React.useState<Files | undefined>(file);
  return (
    <DocumentDetailsSidebar
      file={selectedFile}
      updateFile={setSelectedFile}
      closeSidebar={() => setSelectedFile(undefined)}
      innerRef={innerRef}
      deleteFile={() => {
        setSelectedFile(undefined);
      }}
      downloadFile={() => {}}
      signedUrl={''}
      isLoading={false}
    />
  );
};
