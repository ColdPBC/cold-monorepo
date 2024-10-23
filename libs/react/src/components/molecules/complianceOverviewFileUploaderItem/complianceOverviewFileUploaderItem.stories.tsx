import { Meta, StoryObj } from '@storybook/react';
import { ComplianceOverviewFileUploaderItem, ComplianceOverviewFileUploaderItemProps } from '@coldpbc/components';
import { withKnobs } from '@storybook/addon-knobs';
import { StoryMockProvider } from '@coldpbc/mocks';
import { useState } from 'react';

const meta: Meta<typeof ComplianceOverviewFileUploaderItem> = {
	title: 'Molecules/ComplianceOverviewFileUploaderItem',
	component: ComplianceOverviewFileUploaderItem,
	tags: ['autodocs'],
	decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const NewFile: Story = {
	render: args => <FileUploaderStory {...args} />,
	args: {
		file: {
			uploaded: false,
			new: true,
			contents: {
				name: 'test.txt',
			},
		},
	},
};

export const OldFile: Story = {
	render: args => <FileUploaderStory {...args} />,
	args: {
		file: {
			uploaded: true,
			new: false,
			contents: {
				original_name: 'test.txt',
				updated_at: '2024-05-19T00:00:00.000Z',
			},
		},
	},
};

const FileUploaderStory = (args: ComplianceOverviewFileUploaderItemProps) => {
	const [uploaded, setUploaded] = useState(args.file.uploaded);
	const onFileUpload = () => {
		setUploaded(true);
	};
	return (
		<StoryMockProvider>
			<div className="w-[620px]">
				<ComplianceOverviewFileUploaderItem
					{...args}
					file={{
						uploaded: uploaded,
						new: args.file.new,
						contents: args.file.contents,
					}}
					onFileUpload={onFileUpload}
				/>
			</div>
		</StoryMockProvider>
	);
};
