import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import {
  getClaimsMock,
  getFilesWithAssurances,
  getFilesWithoutAssurances,
  getMaterialsMocksWithAssurances,
  StoryMockProvider,
} from '@coldpbc/mocks';
import {
  DocumentDetailsSidebar,
  DocumentDetailsSidebarFileState,
  DocumentsEditMaterialsModal, MaterialWithTier2Supplier,
} from '@coldpbc/components';
import { Claims, FilesWithAssurances } from '@coldpbc/interfaces';
import { KeyedMutator } from 'swr';
import { ApolloQueryResult, NetworkStatus } from '@apollo/client';

const meta = {
	title: 'Organisms/DocumentDetailsSidebar',
	component: DocumentDetailsSidebar,
	tags: ['autodocs'],
	decorators: [withKnobs],
} satisfies Meta<typeof DocumentDetailsSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NoAssurances: Story = {
	render: args => {
		return <SidebarStory {...args} />;
	},
	args: {
		file: getFilesWithoutAssurances()[0],
		innerRef: React.createRef(),
		isLoading: false,
		signedUrl: '',
		sustainabilityAttributes: getClaimsMock(),
	},
};

export const WithAssurancesSupplierClaim: Story = {
	render: args => {
		return <SidebarStory {...args} />;
	},
	args: {
		file: getFilesWithAssurances()[0],
		innerRef: React.createRef(),
		isLoading: false,
		signedUrl: '',
		sustainabilityAttributes: getClaimsMock(),
	},
};

export const WithAssurancesMaterialClaim: Story = {
	render: args => {
		return <SidebarStory {...args} />;
	},
	args: {
		file: getFilesWithAssurances()[1],
		innerRef: React.createRef(),
		isLoading: false,
		signedUrl: '',
		sustainabilityAttributes: getClaimsMock(),
	},
};

export const NonCertificateDocument: Story = {
  render: args => {
    return <SidebarStory {...args} />;
  },
  args: {
    file: getFilesWithAssurances()[1],
    innerRef: React.createRef(),
    isLoading: false,
    signedUrl: '',
    sustainabilityAttributes: getClaimsMock(),
  },
};

const SidebarStory = (props: {
	file: FilesWithAssurances | undefined;
	sustainabilityAttributes: Claims[];
	refreshFiles: () => void;
	closeSidebar: () => void;
	innerRef: React.RefObject<HTMLDivElement>;
	deleteFile: (id: string) => void;
	isLoading: boolean;
	downloadFile: (url: string | undefined) => void;
	signedUrl: string | undefined;
}) => {
	const { file, innerRef, sustainabilityAttributes } = props;
	const [selectedFile, setSelectedFile] = React.useState<FilesWithAssurances | undefined>(file);
  const [ editDocumentFileState, setEditDocumentFileState ] = React.useState<DocumentDetailsSidebarFileState | undefined>(undefined);
  const [ editMaterialsModalIsOpen, setEditMaterialsModalIsOpen ] = React.useState(false);
  const allMaterials: MaterialWithTier2Supplier[] = getMaterialsMocksWithAssurances().map(material => ({
    id: material.id,
    name: material.name,
    tier2SupplierName: material.organizationFacility?.name || '',
    tier2SupplierId: material.organizationFacility?.id || '',
  }));
  const mockMutator: KeyedMutator<ApolloQueryResult<{ organizationFiles: FilesWithAssurances[] | null }>> =
    async () => ({ data: { organizationFiles: null }, loading: false, networkStatus: NetworkStatus.ready });

	return (
		<StoryMockProvider>
			<DocumentDetailsSidebar
				allMaterials={allMaterials}
        file={selectedFile}
        fileState={editDocumentFileState}
        setFileState={setEditDocumentFileState}
				sustainabilityAttributes={sustainabilityAttributes}
				refreshFiles={mockMutator}
				closeSidebar={() => setSelectedFile(undefined)}
				innerRef={innerRef}
				deleteFile={() => {
					setSelectedFile(undefined);
				}}
				downloadFile={() => {}}
				signedUrl={''}
				isLoading={false}
        openEditMaterials={(fileState: DocumentDetailsSidebarFileState) => {
          setEditDocumentFileState(fileState);
          setEditMaterialsModalIsOpen(true);
        }}
			/>
      {editDocumentFileState && (
        <DocumentsEditMaterialsModal
          allMaterials={allMaterials}
          fileState={editDocumentFileState}
          setSelectedValueIds={(entityIds: string[]) => (
            setEditDocumentFileState({ ...editDocumentFileState, entityIds: entityIds })
          )}
          isOpen={editMaterialsModalIsOpen}
          onClose={() => setEditMaterialsModalIsOpen(false)}
        />
      )}
		</StoryMockProvider>
	);
};
