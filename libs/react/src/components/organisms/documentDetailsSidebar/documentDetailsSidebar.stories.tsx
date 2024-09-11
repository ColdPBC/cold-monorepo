import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { getClaimsMock, getFilesWithAssurances, getFilesWithoutAssurances } from '@coldpbc/mocks';
import { DocumentDetailsSidebar } from '@coldpbc/components';
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
	return (
		<DocumentDetailsSidebar
			file={selectedFile}
			sustainabilityAttributes={sustainabilityAttributes}
			refreshFiles={() => {}}
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
