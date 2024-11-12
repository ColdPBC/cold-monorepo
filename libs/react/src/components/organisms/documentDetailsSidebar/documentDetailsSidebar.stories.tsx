import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import {
  getClaimsMock,
  getFilesWithAssurances,
  getFilesWithoutAssurances,
  getFileTypesMock, getMaterialsMock, getMaterialsMocksWithAssurances,
  StoryMockProvider,
} from '@coldpbc/mocks';
import {
  DocumentDetailsSidebar,
  DocumentDetailsSidebarFileState,
  DocumentsEditMaterialsModal,
} from '@coldpbc/components';
import { Claims, FilesWithAssurances } from '@coldpbc/interfaces';

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
    fileTypes: getFileTypesMock(),
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
    fileTypes: getFileTypesMock(),
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
    fileTypes: getFileTypesMock(),
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
    fileTypes: getFileTypesMock(),
  },
};

const SidebarStory = (props: {
	file: FilesWithAssurances | undefined;
	sustainabilityAttributes: Claims[];
  fileTypes: string[];
	refreshFiles: () => void;
	closeSidebar: () => void;
	innerRef: React.RefObject<HTMLDivElement>;
	deleteFile: (id: string) => void;
	isLoading: boolean;
	downloadFile: (url: string | undefined) => void;
	signedUrl: string | undefined;
}) => {
	const { file, fileTypes, innerRef, sustainabilityAttributes } = props;
	const [selectedFile, setSelectedFile] = React.useState<FilesWithAssurances | undefined>(file);
  const [ editDocumentFileState, setEditDocumentFileState ] = React.useState<DocumentDetailsSidebarFileState | undefined>(undefined);
  const [ editMaterialsModalIsOpen, setEditMaterialsModalIsOpen ] = React.useState(false);
  const allMaterials = getMaterialsMocksWithAssurances().map(material => {
    const tier2Supplier = material.materialSuppliers[0]?.organizationFacility;
    return { id: material.id, name: material.name, tier2SupplierName: tier2Supplier?.name, tier2SupplierId: tier2Supplier?.id };
  })

	return (
		<StoryMockProvider>
			<DocumentDetailsSidebar
				allMaterials={allMaterials}
        file={selectedFile}
        fileState={editDocumentFileState}
        setFileState={setEditDocumentFileState}
				sustainabilityAttributes={sustainabilityAttributes}
        fileTypes={fileTypes}
				refreshFiles={() => {}}
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
