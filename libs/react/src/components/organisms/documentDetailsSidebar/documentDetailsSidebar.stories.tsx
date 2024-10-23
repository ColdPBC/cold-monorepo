import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { getClaimsMock, getFilesWithAssurances, getFilesWithoutAssurances, getFileTypesMock, StoryMockProvider } from '@coldpbc/mocks';
import { DocumentDetailsSidebar, DocumentDetailsSidebarFileState, DocumentsAddAssuranceModal } from '@coldpbc/components';
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
	const [addAssuranceFile, setAddAssuranceFile] = React.useState<
		| {
				fileState: DocumentDetailsSidebarFileState;
				isAdding: boolean;
		  }
		| undefined
	>(undefined);

	return (
		<StoryMockProvider>
			<DocumentDetailsSidebar
				file={selectedFile}
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
				addAssurance={(fileState: DocumentDetailsSidebarFileState, isAdding: boolean) => {
					setAddAssuranceFile({ fileState, isAdding });
				}}
			/>
			{addAssuranceFile && (
				<DocumentsAddAssuranceModal
					documentToAddAssurance={addAssuranceFile}
					close={() => {
						setAddAssuranceFile(undefined);
					}}
					files={getFilesWithAssurances()}
					allSustainabilityAttributes={sustainabilityAttributes}
				/>
			)}
		</StoryMockProvider>
	);
};
