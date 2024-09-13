import { FilesWithAssurances } from '@coldpbc/interfaces';
import { Card, DocumentsHeaderType } from '@coldpbc/components';
import { cloneDeep, forEach, orderBy } from 'lodash';
import { FileTypes } from '@coldpbc/enums';

export const DocumentsHeaderTypes = (props: { files: FilesWithAssurances[] }) => {
	const { files } = props;
	// seperate files into different types using FileTypes enum
	// order by amount of files, but remove OTHER type from ordering
	// then render DocumentsHeaderType for each type

	const getFileTypeTitle = (type: string) => {
		switch (type) {
			case FileTypes.CERTIFICATE:
				return 'Certificates';
			case FileTypes.TEST_RESULTS:
				return 'Test Documents';
			case FileTypes.STATEMENT:
				return 'Statements';
			default:
				return 'Other';
		}
	};

	const fileTypes: { type: FileTypes; title: string; amount: number; totalAmount: number }[] = [
		{
			type: FileTypes.CERTIFICATE,
			title: getFileTypeTitle(FileTypes.CERTIFICATE),
			amount: 0,
			totalAmount: files.length,
		},
		{
			type: FileTypes.STATEMENT,
			title: getFileTypeTitle(FileTypes.STATEMENT),
			amount: 0,
			totalAmount: files.length,
		},
		{
			type: FileTypes.TEST_RESULTS,
			title: getFileTypeTitle(FileTypes.TEST_RESULTS),
			amount: 0,
			totalAmount: files.length,
		},
		{
			type: FileTypes.OTHER,
			title: getFileTypeTitle(FileTypes.OTHER),
			amount: 0,
			totalAmount: files.length,
		},
	];

	forEach(files, file => {
		if ([FileTypes.OTHER, FileTypes.ASSESSMENT, FileTypes.POLICY].includes(file.type)) {
			fileTypes[3].amount += 1;
		} else {
			const index = fileTypes.findIndex(fileType => fileType.type === file.type);
			if (index !== -1) {
				fileTypes[index].amount += 1;
			}
		}
	});

	const otherType = cloneDeep(fileTypes[3]);
	fileTypes.splice(3, 1);

	const ordered = orderBy(fileTypes, ['amount'], ['desc']);

	return (
		<Card className="bg-bgc-elevated w-full flex flex-row" glow={false}>
			{ordered.map((type, index) => {
				return (
					<div key={index} className={'w-1/4'}>
						<DocumentsHeaderType title={type.title} amount={type.amount} totalAmount={type.totalAmount} />
					</div>
				);
			})}
			<div className={'w-1/4'}>
				<DocumentsHeaderType title={otherType.title} amount={otherType.amount} totalAmount={otherType.totalAmount} />
			</div>
		</Card>
	);
};
