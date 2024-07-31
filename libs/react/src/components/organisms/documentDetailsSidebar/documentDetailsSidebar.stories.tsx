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
  return <DocumentDetailsSidebar file={selectedFile} closeSidebar={() => setSelectedFile(undefined)} innerRef={React.createRef()} />;
};
